import { Web3 } from 'web3';

const web3 = new Web3('http://127.0.0.1:7545');

web3.transactionPollingInterval = 1000; // 1000 ms = 1 s

console.log(web3.getContextObject().config);
