import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getBalance } from './apiService';
import Header from './header';

function Popup() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [balance, setBalance] = useState("");
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

    return (
        <><Header bal={balance} addr={address} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                top: "30vh",
                position: "relative",
                color: "blueviolet",
                fontSize: "30px"
            }}><p>Verified and Transaction Successfull</p>
                <button style={{ background: "lightgray", fontSize: "20px", borderRadius: "5px solid black", marginTop: "10px" }} onClick={() => {
                    window.location.href = `https://sepolia.etherscan.io/tx/${searchParams.get("txHash")}`
                }}>View Transaction</button></div></>

    )
}

export default Popup;