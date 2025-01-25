import { Web3 } from 'web3';

const web3 = new Web3('https://eth.llamarpc.com');

// create a wallet with 2 new random accounts
let wallet = web3.eth.accounts.wallet.create(2);

console.log(wallet);

// use the second account in the wallet to sign a message
const signature = wallet[1].sign('Hello, Web3.js!');
// wallet accounts can also be accessed with the "at" and "get" methods
// wallet.at(1).sign("Hello, Web3.js!")
// wallet.get(1).sign("Hello, Web3.js!")
console.log(signature);

// create a wallet with a single existing account
wallet = web3.eth.accounts.wallet.add('0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec');

console.log(wallet);

// create a wallet with a single random accounts
wallet = web3.eth.accounts.wallet.create(1);

console.log(wallet);

// create a new account and add it to the wallet
const newAccount = web3.eth.accounts.create();
wallet.add(newAccount);

console.log(wallet);
