import { Web3, Transaction, AccessListResult, FeeData, TransactionReceipt } from 'web3';
import { NonPayableMethodObject } from 'web3-eth-contract';
import { NonPayableCallOptions } from 'web3-types';

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

const wallet = web3.eth.wallet!.add('YOUR_PRIVATE_KEY');

const sender = wallet[0].address;
const receiver = '<RECEIVER ADDRESS>';

// initialize WETH contract in Sepolia
const erc20 = new web3.eth.Contract(ABI, ADDRESS_WETH_SEPOLIA);

const transfer: NonPayableMethodObject = erc20.methods.transfer(receiver, 1);

const transferOpts: NonPayableCallOptions = { from: sender };
const accessListResult: AccessListResult = await transfer.createAccessList(transferOpts);
const transactionDraft: Transaction = transfer.populateTransaction(transferOpts);

const feeData: FeeData = await web3.eth.calculateFeeData();

const transferTxn: Transaction = {
	...transactionDraft,
	maxFeePerGas: feeData.maxFeePerGas,
	maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
	accessList: accessListResult.accessList,
	gas: accessListResult.gasUsed
};

const receipt: TransactionReceipt = await web3.eth.sendTransaction(transferTxn);

console.log(receipt);
