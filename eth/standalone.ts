import { Web3Eth } from 'web3-eth';

// const eth = new Web3Eth('http://localhost:7545');
const eth = new Web3Eth('http://127.0.0.1:8545'); // anvil

async function test() {
	const accounts = await eth.getAccounts();
	const currentBalance = await eth.getBalance(accounts[0]);
	console.log('Current balance:', currentBalance);

	
	console.log('`defaultTransactionType` before', eth.config.defaultTransactionType);

	eth.setConfig({ defaultTransactionType: '0x1' });

	console.log('`eth.config.defaultTransactionType` after', eth.config.defaultTransactionType);
}

(async () => {
	await test();
})();
