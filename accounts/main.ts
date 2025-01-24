import { Web3 } from 'web3';

const web3 = new Web3('https://eth.llamarpc.com');

// generate a new random account
let account = web3.eth.accounts.create();

console.log(account);

// use the account to sign a message
let signature = account.sign('Hello, Web3.js!');

console.log(signature);

// load an existing account from its private key
account = web3.eth.accounts.privateKeyToAccount(account.privateKey);

console.log(account);

// use the account to sign a message
signature = account.sign('Hello, Web3.js!');

console.log(signature);
