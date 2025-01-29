import { Web3 } from 'web3';

const web3 = new Web3('https://rpc2.sepolia.org'); // RPC node url

async function txLegacy() {
	const wallet = web3.eth.wallet!.add('YOUR_PRIVATE_KEY'); // make sure you have funds

	const sender = wallet[0].address;
	const recipient = '0x807BFe4940016B5a7FdA19482042917B02e68359';
	const value = 1; // wei
	const nonce = await web3.eth.getTransactionCount(sender);
	const gas = 21000;
	const gasPrice = await web3.eth.getGasPrice();

	const tx = {
		from: sender,
		to: recipient,
		value,
		nonce,
		gas,
		gasPrice,
		type: 0
	};

	const txReceipt = await web3.eth.sendTransaction(tx);
	console.log('Tx hash', txReceipt.transactionHash);
}

txLegacy();
