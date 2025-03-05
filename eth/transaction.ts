import { Web3 } from 'web3';

// Set up a connection to the Ethereum network
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // anvil
web3.eth.config.handleRevert = true;

async function interact() {
	// fetch all the available accounts
	const accounts = await web3.eth.getAccounts();
	console.log(accounts);

	let balance1: bigint, balance2: bigint;
	// The initial balances of the accounts should be 100 Eth (10^18 wei)
	balance1 = await web3.eth.getBalance(accounts[0]);
	balance2 = await web3.eth.getBalance(accounts[1]);

	console.log(balance1, balance2, web3.utils.fromWei(balance2, 'ether'));


	// create a transaction sending 1 Ether from account 0 to account 1
	const transaction = {
		from: accounts[0],
		to: accounts[1],
		// value should be passed in wei. For easier use and to avoid mistakes,
		// we utilize the auxiliary `toWei` function:
		value: web3.utils.toWei('1', 'ether')
	};

	// send the actual transaction
	const transactionHash = await web3.eth.sendTransaction(transaction);
	console.log('transactionHash', transactionHash);

	balance1 = await web3.eth.getBalance(accounts[0]);
	balance2 = await web3.eth.getBalance(accounts[1]);

	// see the updated balances
	console.log(balance1, balance2);

	// irrelevant with the actual transaction, just to know the `gasPrice`
	const gasPrice = await web3.eth.getGasPrice();
	console.log('gasPrice', gasPrice);
}

(async () => {
	await interact();
})();
