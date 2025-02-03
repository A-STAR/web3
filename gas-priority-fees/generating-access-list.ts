import { Web3, Transaction, TransactionForAccessList, AccessListResult } from 'web3';

const web3 = new Web3('https://rpc2.sepolia.org');

const wallet = web3.eth.wallet!.add('YOUR_PRIVATE_KEY');

const sender = wallet[0].address;
const recipient = '<RECEIVER ADDRESS>';

const transactionDraft: TransactionForAccessList = {
	from: sender,
	to: recipient,
	value: web3.utils.ethUnitMap.ether
};

const accessListResult: AccessListResult = await web3.eth.createAccessList(transactionDraft);

const transaction: Transaction = {
	...transactionDraft,
	accessList: accessListResult.accessList,
	gas: accessListResult.gasUsed
};

console.log(transaction);
