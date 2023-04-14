import React, { useState, useEffect } from "react";
import Sign1 from "./Sign1";
import { Link, useNavigate } from "react-router-dom";
import { KeyGen2 } from "./KeyGen2";
import { KeyGen3 } from "./KeyGen3";
// import {deployWallet} from "./wallet_transaction";
// const deploy = require("./wallet_transaction.js")
import Loader from "./loader";
import axios from "axios";
import { createWallet } from "./createWallet";


function KeyGen1({ res }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem('jwtToken')
  // console.log("Token:::::::::::::::::::", token);


  const handleButtonClick = async () => {
    console.log("Loading::::");
    try {

      setLoading(true);
      console.log("ewryj", loading);
      let response = axios("http://localhost:3001/keygen1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("TCL ~ handleButtonClick ~ response:", response);
      setTimeout(() => {
        let response2 = KeyGen2();

      }, 2000)
      setTimeout(async () => {
        let response3 = await KeyGen3();
        console.log("Key3:::::", response3);
        const pubKey = response3?.data?.publicKey;
        console.log(JSON.stringify(pubKey));
        if (response3) {
          const res = await createWallet(JSON.stringify(pubKey));
          const newVal = res?.data?.address;
          console.log("walletResponse:::",res, "::::::",res?.data,"::::::", res?.data?.address);
          localStorage.setItem("walletAddress", newVal);
          navigate("/Signing");
        }
      }, 4000);
    } catch (error) {
      console.log("TCL ~ handleButtonClick ~ error:", error);
      // setLoading(false)
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Loader /> : null}
      {console.log(loading)}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "30vh",
          position: "relative",
        }}
      >
        <div style={{ marginTop: "5px" }}>
          <h1>Welcome to MPC Wallet</h1>
        </div>
        {/* <Link to={"/Signing"}> */}
        <button
          style={{
            fontSize: "25px",
            borderRadius: "10px",
            color: "white",
            background: "blue",
          }}
          onClick={() => handleButtonClick()}
        >
          Create Wallet
        </button>
      </div>
    </div>
  );
}

export default KeyGen1;