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
	}
];

const uniswapToken = new web3.eth.Contract(ABI, address);

// make the call to the contract
const symbol = await uniswapToken.methods.symbol().call();

console.log('Uniswap symbol:', symbol);

// make the call to the contract
const totalSupply = await uniswapToken.methods.totalSupply().call();

console.log('Uniswap Total supply:', totalSupply);
