// const { ethers } = require("ethers");
import * as ethers from 'ethers';
import { entrypointABI } from './entrypointABI';
import { providers } from './provider';
import {UserOp} from "./types";
import { walletABI } from './walletABI';

export const deployWallet = async (owner: string, salt: string) => {
  const signer = providers();

  const entrypointAddress = '0xc9B2DFE2318Ad7Ce7F290EA0D1aAD0354A874467';

  const entrypointContract = new ethers.Contract(
    entrypointAddress,
    entrypointABI,
    signer,
  );
  console.log("OwnerMPC::::::::::::", owner);
  const tx = await entrypointContract.createWallet(
    entrypointAddress,
    owner,
    salt,
  );
  console.log('Executed Wallet and send ether::::::', tx);
  // entrypointContract.on('Deployed', async (arg1, arg2) => {
  //   address = arg1;
  //   console.log('Deployed wallet was emitted with args:', arg1, arg2);
  //   return address;
  // });
  const value = await getValueFromContractEvent(entrypointContract, "Deployed");
  console.log(value);
  return { address:value };
};

function getValueFromContractEvent(contract, eventName) {
  return new Promise((resolve, reject) => {
    contract.on(eventName, (value) => {
      resolve(value);
    });
  });
}

export const getAddress = (pubKey: string) => {
  console.log(pubKey);
  const buffer = JSON.parse(pubKey);
  const hash = Buffer.from(buffer).toString('hex');
  const addr = ethers.utils.computeAddress(`0x${hash}`);
  return addr;
};

export const getBalance = async (account: string) => {
  const signer = providers();
  const entrypointAddress = '0xc9B2DFE2318Ad7Ce7F290EA0D1aAD0354A874467';
  const entrypointContract = new ethers.Contract(
    entrypointAddress,
    entrypointABI,
    signer,
  );
  const bal = await entrypointContract.getBalanceOf(account);
  console.log('Funded Wallet ::::::', bal);
  return bal;
};

export const fundWallet = async (addr: string) => {
  const signer = providers();
  const entrypointAddress = '0xc9B2DFE2318Ad7Ce7F290EA0D1aAD0354A874467';
  const entrypointContract = new ethers.Contract(
    entrypointAddress,
    entrypointABI,
    signer,
  );
  const tx = await entrypointContract.fundWallet(addr);
  console.log('Funded Wallet ::::::', tx.hash);
  return tx.hash;
};

export const executeUserOperation = async (userOp:UserOp
) => {
  const signer = providers();
  const entrypointAddress = '0xc9B2DFE2318Ad7Ce7F290EA0D1aAD0354A874467';
  const entrypointContract = new ethers.Contract(
    entrypointAddress,
    entrypointABI,
    signer,
  );
  userOp.amount = ethers.utils.parseEther(`${userOp.amount}`);
  const tx = await entrypointContract.handleOps(userOp);
  console.log('Executed Wallet and sent ether::::::', tx.hash);
  return tx.hash;
};

export const getHash = (str: string) => {
  console.log("Data:::",typeof str, str);
  const data = Buffer.from(str).toString('hex')
  console.log(data);
  const hashed = ethers.utils.keccak256(`0x${data}`);
  return hashed;
};

export const getCallData = (to:string, value:number)=> {
  const walletInterface = new ethers.utils.Interface(walletABI);
  const args = [to, value];
  return walletInterface.encodeFunctionData("executeOp", args);
}

export const getOwner = async ()=>{
  const signer = providers();
  const walletAddress = '0x15109d05056da17CE4aF9b94f4D43676A2E7944A';

  const walletContract = new ethers.Contract(
    walletAddress,
    walletABI,
    signer,
  );
  const tx = await walletContract.getOwner();
  console.log('Executed Wallet and send ether::::::', tx);

}
