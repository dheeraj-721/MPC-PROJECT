import React, { useEffect, useState } from 'react';
import Loader from "./loader";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header from './header';
import { getBalance } from './apiService';

function Verify() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const address = localStorage.getItem("walletAddress");


    const resBalance = async () => await getBalance(address).then((response) => response)
        .then((data) => {
            setBalance(data?.data?.balance);
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
    useEffect(() => {
        resBalance();
    }, [])

    let toValue = JSON.parse(searchParams.get('message')).to;
    console.log("toValue::::", toValue);
    let amountValue = JSON.parse(searchParams.get('message')).amount;
    console.log("amountValue::::", amountValue);
    let apiValue = JSON.stringify({ from: address, to: toValue, amount: Number(amountValue) });
    let sign = window.localStorage.getItem("Signature")
    // console.log("After Parse::::::::::::::", sign);
    let r = JSON.parse(sign)[1];
    let s = JSON.parse(sign)[3];
    let v = JSON.parse(sign)[5];

    const handleButtonClick = async () => {
        setLoading(true);
        let res = await
            axios('http://localhost:4000/users/sendTransaction', {
                method: 'POST',
                data: { txObj: apiValue, signature: sign },
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                }
            })
        if (res?.data?.status === true) {
            console.log("verify::::::", res);
            navigate(`/popup?txHash=${res?.data?.transactionHash}`);
        }
    };

    return (
        <><Header bal={balance} addr={address} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", top: "20vh", position: "relative" }}>{loading ? <Loader /> : null}
                <div style={{
                    width: "1000px",
                    border: "2px solid green",
                    padding: "20px",
                    margin: "20px",
                    background: "lightblue"
                }}><label>Signature:</label><div style={{ border: "1px solid black", padding: "5px", marginTop: "5px" }}>r_scalar : {JSON.stringify(r)}<br></br><br></br>
                        s_scalar : {JSON.stringify(s)}</div>
                    {/* <div style={{marginTop:"10px"}}>Public Key: {JSON.stringify(pub_key)}</div> */}
                </div>
                <div>
                    <button style={{ marginTop: "50px", fontSize: "20px", borderRadius: "10px", color: 'white', background: "green" }} onClick={handleButtonClick}>Verify Signature and Transaction</button>

                </div></div></>
    );
}

export default Verify;