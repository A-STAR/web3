import { Web3 } from 'web3';

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// get the balance of an address
const balance = await web3.eth.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');

console.log(balance);

// get last block number
const block = await web3.eth.getBlockNumber();

console.log(block);

// get the chain id of the current provider
const chainID = await web3.eth.getChainId();

console.log(chainID);

// get the nonce of an address
const nonce = await web3.eth.getTransactionCount('0x37826D8B5F4B175517A0f42c886f8Fca38C55Fe7');

console.log(nonce);

// get the current gas price
const gasPrice = await web3.eth.getGasPrice();

console.log(gasPrice)
