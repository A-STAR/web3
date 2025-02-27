import { Web3 } from 'web3';
import { Web3Eth } from 'web3';

let web3 = new Web3('http://127.0.0.1:7545');

console.log(web3.getContextObject().config);




web3 = new Web3Eth('http://127.0.0.1:7545');

console.log(web3.getContextObject().config);
