import axios from 'axios';
import React, { useState } from 'react';

export const KeyGen3 =async ()=> {
    try {
        
        let response=  await
        axios('http://localhost:3003/keygen3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
            }
        })
        return response;
    } catch (error) {
        
    }
    // return (
    //     <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
    //         <button >Generate Key</button>
    //         <div style={{ display: "flex", flexDirection: "row" }}>
    //             <label>Key Share3</label>
    //             <div style={{ overflow: "scroll", width: "300px", height: "100px" }}>
    //                 {}
    //             </div></div>
    //     </div>
    // );
}
