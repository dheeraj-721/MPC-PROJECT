import React, { useEffect, useState } from "react";
import { Sign2 } from "./Sign2";
import Loader from "./loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { getBalance, getHash } from "./apiService";


function Sign1() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [toData, setToData] = useState("");
  const [amountData, setAmountData] = useState("");
  const address = localStorage.getItem("walletAddress");


  const resBalance = async () => await getBalance(address).then((response) => response)
    .then((data) => {
      setBalance(data?.data?.balance);
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
    useEffect(()=>{
      resBalance();
    }, [])

  const handleButtonClick = async () => {
    setLoading(true);
    console.log(toData, "ToData", amountData)
    let queryVal = JSON.stringify({ to: toData, amount: amountData })
    let apiValue = JSON.stringify({ from: address, to: toData, amount: Number(amountData) })
    console.log("logData:::", typeof apiValue, apiValue);
    let hashedData = await getHash(apiValue);
    console.log("HashedData:::", hashedData);

    fetch("http://localhost:3001/Sign1", {
      method: "POST",
      body: JSON.stringify({ message: hashedData.data.slice(2) }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Do something with the response data
        // setdat(data)
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the API request
        console.error(error);
      });

    setTimeout(async () => {
      let res = await Sign2(hashedData.data.slice(2));
      console.log("SIGN2::::",res?.data?.signature);
      if (res) {
        let signature = res?.data?.signature;
        console.log("LOOK HERE :::::::::::::::::::::",signature);
        // console.log("LOOK HERE :::::::::::::::::::::",keys[1]);
        window.localStorage.setItem("Signature", signature);
        navigate(`/verification?message=${queryVal}`);
      }
    }, 2000);
  };
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setToData(event.target.value);
    console.log(toData, "ToData", amountData)
  };
  const handleInputChange1 = (event) => {

    setAmountData(event.target.value);
    console.log(toData, "ToData", amountData)
  };

  return (
    <><Header bal={balance} addr={address} /><div>
      {loading ? <Loader /> : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "20vh",
          position: "relative",
          gap: "10px"
        }}
      >
        {/* <label> */}
        <h2>Send Amount</h2>
        {/* <input style={{}} type="text" onChange={handleInputChange} value={inputValue} size="30" height="50" /> */}
        {/* </label><br></br> */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              minWidth: "50px",
              display: "flex",
              gap: "60px",
            }}
          >
            <span>To: </span>
            <input type="text" value={toData} onChange={handleInputChange}></input>
          </div>
          <div
            style={{
              minWidth: "50px",
              display: "flex",
              gap: "19px",
            }}
          >
            <span>Amount: </span>
            <input type="text" value={amountData} onChange={handleInputChange1}></input>
          </div>
        </div>
        {/* <textarea style={{ width: "278px", height: "84px" }} type="text" onChange={handleInputChange} value={inputValue}></textarea> */}
        <button
          style={{
            marginTop: "30px",
            fontSize: "20px",
            borderRadius: "10px",
            color: "white",
            background: "green",
          }}
          onClick={handleButtonClick}
        >
          Sign Message
        </button>
      </div>
    </div></>
  );
}

export default Sign1;
