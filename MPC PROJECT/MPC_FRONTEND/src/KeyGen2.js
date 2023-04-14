import axios from 'axios';
import React, { useState } from 'react';
import KeyGen3 from './KeyGen3';

export const  KeyGen2 = async () => {
    console.log("KeyGen222");
    let response = await
    axios('http://localhost:3002/keygen2', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
        }
    })
}