import { Web3 } from 'web3';
import { IpcProvider } from 'web3-providers-ipc';

let web3 = new Web3(new IpcProvider('/users/myuser/.ethereum/geth.ipc'));

let block = await web3.eth.getBlockNumber();

console.log(block);

// include both optional parameters
const provider = new IpcProvider(
	'/Users/myuser/Library/Ethereum/geth.ipc',
	{
		writable: false
	},
	{
		delay: 500,
		autoReconnect: true,
		maxAttempts: 10
	}
);

web3 = new Web3(provider);

block = await web3.eth.getBlockNumber();

console.log(block);
