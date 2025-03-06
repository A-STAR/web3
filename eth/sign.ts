import { Web3 } from 'web3';

// const web3 = new Web3('http://localhost:7545');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // anvil

// make sure to copy the private key from Ganache
const privateKey = '0x0fed6f64e01bc9fac9587b6e7245fd9d056c3c004ad546a17d3d029977f0930a';
const value = web3.utils.toWei('1', 'ether');

async function sendSigned() {
	const accounts = await web3.eth.getAccounts();
	const fromAddress = accounts[0];
	const toAddress = accounts[1];

	// Create a new transaction object
	const tx = {
		from: fromAddress,
		to: toAddress,
		value: value,
		gas: 21000,
		gasPrice: web3.utils.toWei('10', 'gwei'),
		nonce: await web3.eth.getTransactionCount(fromAddress)
	};

	// Sign the transaction with the private key
	const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

	// Send the signed transaction to the network
	const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

	console.log('Transaction receipt:', receipt);
}
(async () => {
	await sendSigned();
})();
