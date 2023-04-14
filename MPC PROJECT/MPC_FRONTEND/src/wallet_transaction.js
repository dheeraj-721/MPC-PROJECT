// const { ethers, toUtf8Bytes } = require("ethers");
// const deployWallet = async () => {
//   const HttpProvider =
//   "https://sepolia.infura.io/v3/94066470fd0e423d8a408938594ca382";
//   let provider = new ethers.JsonRpcProvider(HttpProvider);
//   let privateKey = "addd74c3d818f60f7ff450f8a2904d46ef7e6ad0344a8ae3ef98adaf426b9e54";
//   let wallet = new ethers.Wallet(privateKey, provider);
//   let gasPrice = provider.getFeeData();
//   let signer = wallet.connect(provider)
//   console.log("wallet:::::", wallet, "Signer:::::", signer);
  
//   const entrypointAddress = '0x8896BE42420BfaE6f55a66b177c8191FbD6a1d6B';
//   const entrypointABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "_entrypoint",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "_owner",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "_salt",
//           "type": "uint256"
//         }
//       ],
//       "name": "createWallet",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "addr",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "salt",
//           "type": "uint256"
//         }
//       ],
//       "name": "Deployed",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "contract Wallet",
//           "name": "wallet_",
//           "type": "address"
//         },
//         {
//           "internalType": "address payable",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "executeOp",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address payable",
//           "name": "_addr",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "fundWallet",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "caller",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "message",
//           "type": "string"
//         }
//       ],
//       "name": "Received",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "receiver",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "value",
//           "type": "uint256"
//         }
//       ],
//       "name": "log",
//       "type": "event"
//     },
//     {
//       "stateMutability": "payable",
//       "type": "receive"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "acc",
//           "type": "address"
//         }
//       ],
//       "name": "getBalanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];
//   const entrypointContract = new ethers.Contract(entrypointAddress, entrypointABI, signer);

//   let address;
//   const tx = await entrypointContract.createWallet("0x8896BE42420BfaE6f55a66b177c8191FbD6a1d6B","0x9be6694b400e03AD16f047F356Eb81fb39811Ae8", "13");
//   console.log("Executed Wallet and send ether::::::", tx.hash);
//   entrypointContract.on('Deployed', (arg1, arg2) => {
//     address = arg1;
//     console.log('Deployed wallet was emitted with args:', arg1, arg2);
//     entrypointContract.off('Deployed');
//   });
//   return address;
// }
// deployWallet()


// export const sendTransaction = async (walletAddress, to, amount) =>{
//   const value = amount * 10^18;
//   const tx = await entrypointContract.executeOp(walletAddress, to, value);
//   console.log("Executed Wallet and send ether::::::", tx.hash);
//   return tx.hash;
// }
