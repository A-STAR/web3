import { Web3, Transaction } from 'web3';

const web3 = new Web3('https://rpc2.sepolia.org');

const wallet = web3.eth.wallet!.add('YOUR_PRIVATE_KEY');

const sender = wallet[0].address;
const recipient = '<RECEIVER ADDRESS>';

const transactionDraft: Transaction = {
	from: sender,
	to: recipient,
	value: web3.utils.ethUnitMap.ether
};

const gas: bigint = await web3.eth.estimateGas(transactionDraft);

const transaction: Transaction = {
	...transactionDraft,
	gas
};

console.log(transaction);
