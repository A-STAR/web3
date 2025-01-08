import { Web3 } from 'web3';
import './style.css';

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

const blockNumber = await web3.eth.getBlockNumber();
const chainId = await web3.eth.getChainId();

document.querySelector('#app')
  .innerHTML = `Block Number is ${blockNumber} <br> Chain Id: ${chainId}`;
