import { Web3 } from 'web3';

const web3 = new Web3('http://localhost:8545');

async function test() {
	const privateKey = 'YOUR PRIVATE KEY HERE';
	// add private key to wallet to have auto-signing transactions feature
	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(account);

	// create transaction object
	const tx = {
		from: account.address,
		to: '0x27aa427c1d668ddefd7bc93f8857e7599ffd16ab',
		value: '0x1',
		gasLimit: BigInt(21000),
		type: BigInt(2), // <- specify type
		// maxFeePerGas - you can specify this property directly or `web3.js` will fill this field automatically
		// maxPriorityFeePerGas - you can specify this property directly or `web3.js` will fill this field automatically
	};

	// send transaction
	const receipt = await web3.eth.sendTransaction(tx);

	console.log('Receipt:', receipt);
}
(async () => {
	await test();
})();
