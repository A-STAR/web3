import './style.css';
import { Web3 } from 'web3';
import ABI from './counterABI.json';
import BYTECODE from './counterBytecode.json';

// initialize mumbai provider
const provider = new Web3('https://rpc.ankr.com/polygon_mumbai');

async function deploy() {
  // initialize a wallet (with funds)
  const wallet = provider.eth.wallet.add('YOUR_PRIVATE_KEY');

  // initialize contract
  const myContract = new provider.eth.Contract(ABI);

  // create contract deployer
  const deployer = myContract.deploy({
    data: '0x' + BYTECODE, // bytecode must start with 0x
    arguments: [7] // starting number for the constructor in the contract
  });

  // send transaction to the network
  const txReceipt = await deployer.send({ from: wallet[0].address });

  // print deployed contract address
  console.log(txReceipt.options.address);
}

// deploy();

async function getNumber() {
  // initialize contract
  const address = '0xB9433C87349134892f6C9a9E342Ed6adce39F8dF';
  const myContract = new provider.eth.Contract(ABI, address);

  // make call
  const result = await myContract.methods.getNumber().call();

  // print result of current counter
  document.querySelector('#app').innerHTML = `
  Current counter is: ${result} <br>`;
}

getNumber();

async function increase() {
  // initialize a wallet(with funds)
  const wallet = provider.eth.wallet.add('YOUR_PRIVATE_KEY');

  // initialize contract
  const address = '0xB9433C87349134892f6C9a9E342Ed6adce39F8dF';
  const myContract = new provider.eth.Contract(ABI, address);

  // send transaction to the network
  const txReceipt = await myContract.methods
    .increase() // name of the function you are calling in the contract
    .send({ from: wallet[0].address });

  // show tx hash
  console.log(txReceipt.transactionHash);
}

// increase();
