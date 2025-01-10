import { Web3 } from 'web3';

const web3 = new Web3('https://eth.llamarpc.com');

// create random wallet with 1 account
const wallet = web3.eth.accounts.wallet.create(1);

console.log(wallet)

// the private key must start with the "0x" prefix
const account = web3.eth.accounts.wallet.add(
	'0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec'
);

console.log(account[1].address);
console.log(account[1].privateKey);
