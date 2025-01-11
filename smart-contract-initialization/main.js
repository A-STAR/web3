import { Web3 } from 'web3';

const web3 = new Web3('https://eth.llamarpc.com');

// Uniswap token smart contract address (Mainnet)
const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

// you can find the complete ABI on etherscan.io
// https://etherscan.io/address/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984#code
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

// instantiate the smart contract
const uniswapToken = new web3.eth.Contract(ABI, address);

console.log(uniswapToken);
