import { Web3 } from 'web3';

const web3 = new Web3('https://unichain-sepolia.infura.io/v3/YOUR_INFURA_ID');

const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

const ABI = [
	{
		name: 'symbol',
		outputs: [{ type: 'string' }],
		type: 'function'
	},
	{
		name: 'totalSupply',
		outputs: [{ type: 'uint256' }],
		type: 'function'
	},
	{
		name: 'transfer',
		outputs: [{ type: 'bool' }],
		type: 'function'
	}
];

const uniswapToken = new web3.eth.Contract(ABI, address);

const account = web3.eth.accounts.wallet.add(
	'0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec'
);

// address to send the token
const to = '0xcf185f2F3Fe19D82bFdcee59E3330FD7ba5f27ce';

// value to transfer (1 with 18 decimals)
const value = web3.utils.toWei('0.001', 'ether');

// send the transaction => return the Tx receipt
const txReceipt = await uniswapToken.methods.transfer(to, value).send({ from: account[0].address });

console.log('Tx hash:', txReceipt.transactionHash);
