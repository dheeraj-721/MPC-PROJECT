import axios from "axios"
import { useState } from "react";

export const getBalance = async (account) => {
    try {
        const res = await axios("http://localhost:4000/users/checkBalance", {
            method: "GET",
            params: { account: account },
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            }
        })
        return res;
    } catch (error) {
    }}

export const verifySignature = async (txObj, r, s) => {
    const res = await axios("http://localhost:4000/users/verifySignature", {
        method: "POST",
        data: { txObj: txObj, r: r, s: s },
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
        }
    })
    return res;
}

export const getHash = async (data) => {
    const res = await axios("http://localhost:4000/users/getHashData", {
        method: "GET",
        params: { data: data},
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
        }
    })
    return res;
};


