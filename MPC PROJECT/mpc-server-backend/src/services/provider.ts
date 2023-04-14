import * as ethers from 'ethers';
export const providers = () =>{
    const HttpProvider =
    'https://sepolia.infura.io/v3/94066470fd0e423d8a408938594ca382';
  let provider = new ethers.providers.JsonRpcProvider(HttpProvider);
  let privateKey =
    'addd74c3d818f60f7ff450f8a2904d46ef7e6ad0344a8ae3ef98adaf426b9e54';
  let wallet = new ethers.Wallet(privateKey, provider);
  let gasPrice = provider.getFeeData();
  let signer = wallet.connect(provider);
  console.log('wallet:::::', wallet, 'Signer:::::', signer);
  return signer;
}