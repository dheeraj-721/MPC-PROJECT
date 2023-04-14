import axios from "axios"

export const createWallet = async (pubKey) => {
    let res = await  axios('http://localhost:4000/users/createWallet', {
        method: 'POST',
        data: {pubKey:pubKey},
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
        }
    });
    return res;
}