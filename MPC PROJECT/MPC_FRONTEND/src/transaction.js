
// const Web3 = require("web3");


// export const sendTransaction = async (to, amount) =>{
//     let web3;

//     if(window.ethereum){
//         web3 = new Web3(window.ethereum);
//         try {
//             await window.ethereum.enable();
//         } catch (error) {
//             console.log("Error", error);
//         }
//     }

//     const accounts = await web3.eth.getAccounts();
//     const account = accounts[0];
//     console.log("account:::::",account);
    
//     // Create the transaction object
//     const txObj = {
//         from: account,
//         to: to,
//         value: web3.utils.toWei(amount, 'ether'),
//         gas: 21000, // Gas limit
//         gasPrice: web3.utils.toWei('10', 'gwei') // Gas price in Gwei
//     };
    
//     // Send the transaction
//     try {
//         const txHash = await web3.eth.sendTransaction(txObj);
//         console.log('Transaction hash:', txHash);
//         return txHash;
//     } catch (error) {
//         console.error('Error sending transaction:', error);
//     }

// }