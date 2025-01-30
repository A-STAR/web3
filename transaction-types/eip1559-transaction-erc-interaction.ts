import { Web3 } from 'web3';

const web3 = new Web3('https://rpc2.sepolia.org');

// WETH token in Sepolia https://sepolia.etherscan.io/address/0xfff9976782d46cc05630d1f6ebab18b2324d6b14#code
const ADDRESS_WETH_SEPOLIA = '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';
const ABI = [
	{
		constant: false,
		inputs: [
			{
				name: 'dst',
				type: 'address'
			},
			{
				name: 'wad',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

async function transfer() {
	// initialize wallet
	const wallet = web3.eth.accounts.wallet.add('YOUR_PRIVATE_KEY'); // make sure you have WETH tokens in the Sepolia network
	// you can swap Sepolia tokens for WETH here https://app.uniswap.org/swap?chain=sepolia

	// initialize WETH contract in Sepolia
	const myERC20 = new web3.eth.Contract(ABI, ADDRESS_WETH_SEPOLIA);

	const TO = '0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F'; // address to send the tokens to
	const VALUE = 1; // wei value, don't forget to multiply by decimals

	// send transfer and specify the type
	const txReceipt = await myERC20.methods.transfer(TO, VALUE).send({
		from: wallet[0].address,
		type: 2
	});

	console.log(txReceipt.transactionHash);
}

transfer();