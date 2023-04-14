use std::path::PathBuf;

use anyhow::{anyhow, Context, Result};
use curv::elliptic::curves::{Secp256k1, Scalar};
use futures::{SinkExt, StreamExt, TryStreamExt};
use multi_party_ecdsa::protocols::multi_party_ecdsa::gg_2020::state_machine::keygen::LocalKey;
use structopt::StructOpt;

use curv::arithmetic::Converter;
use curv::BigInt;

use multi_party_ecdsa::protocols::multi_party_ecdsa::gg_2020::state_machine::sign::{
    OfflineStage, SignManual,
};
use round_based::async_runtime::AsyncProtocol;
use round_based::Msg;
mod common;

mod gg20_sm_client;
use gg20_sm_client::join_computation;

#[derive(Debug, StructOpt)]
struct Cli {
    #[structopt(short, long, default_value = "https://6549-2405-201-1f-10b3-baaf-18b6-ea58-f3a3.ngrok-free.app/")]
    address: surf::Url,
    #[structopt(short, long, default_value = "default-signing")]
    room: String,
    #[structopt(short, long)]
    local_share: PathBuf,

    #[structopt(short, long, use_delimiter(true))]
    parties: Vec<u16>,
    #[structopt(short, long)]
    data_to_sign: String,

    #[structopt(short, long)]
    verify: bool,

    #[structopt(short, long, default_value = "")]
    r: String,

    #[structopt(short, long, default_value = "")]
    s: String,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args: Cli = Cli::from_args();
    
    let local_share = tokio::fs::read(args.local_share)
    .await
    .context("cannot read local share")?;
    let keys = &local_share;
    if args.verify == true {
        let r:[u8; 32] = serde_json::from_str(&args.r).unwrap();
        let s:[u8; 32] = serde_json::from_str(&args.s).unwrap();
        let r_scalar = Scalar::<Secp256k1>::from_bytes(&r).unwrap();
        let s_scalar = Scalar::<Secp256k1>::from_bytes(&s).unwrap();
        let key_shares:LocalKey<Secp256k1> = serde_json::from_slice(&keys).context("parse local share")?;
        let msg = BigInt::from_bytes(args.data_to_sign.as_bytes());
        common::check_sig(&r_scalar, &s_scalar, &msg, &key_shares.y_sum_s);
        println!(":::::Signature Verified:::::");
    } else{
    let key_shares = &local_share;
    let local_share = serde_json::from_slice(&local_share).context("parse local share")?;
    let number_of_parties = args.parties.len();
    
    let (i, incoming, outgoing) =
        join_computation(args.address.clone(), &format!("{}-offline", args.room))
            .await
            .context("join offline computation")?;

    let incoming = incoming.fuse();
    tokio::pin!(incoming);
    tokio::pin!(outgoing);


    let signing = OfflineStage::new(i, args.parties, local_share)?;
    let completed_offline_stage = AsyncProtocol::new(signing, incoming, outgoing)
        .run()
        .await
        .map_err(|e| anyhow!("protocol execution terminated with error: {}", e))?;

    let (i, incoming, outgoing) = join_computation(args.address, &format!("{}-online", args.room))
        .await
        .context("join online computation")?;

    tokio::pin!(incoming);
    tokio::pin!(outgoing);
    

    let (signing, partial_signature) = SignManual::new(
        BigInt::from_bytes(args.data_to_sign.as_bytes()),
        completed_offline_stage,
    )?;

    outgoing
        .send(Msg {
            sender: i,
            receiver: None,
            body: partial_signature,
        })
        .await?;
    
    let partial_signatures: Vec<_> = incoming
    .take(number_of_parties - 1)
    .map_ok(|msg| msg.body)
    .try_collect()
    .await?;
    let signature = signing
    .complete(&partial_signatures)
    .context("online stage failed")?;
    let signature = serde_json::to_string(&signature).context("serialize signature")?;

    let keys:LocalKey<Secp256k1> = serde_json::from_slice(&key_shares).context("parse local share")?;
    let pub_key = serde_json::to_string(&keys.y_sum_s).context("serialize signature")?;
    println!("[{},{}]", signature, pub_key);
    // println!("{}",pk);
}
Ok(())
}


    