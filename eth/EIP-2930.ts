import { Web3 } from 'web3';

import { GreeterAbi, GreeterBytecode } from './contracts/Greeter';

const web3 = new Web3('http://localhost:8545');

async function test() {
	const privateKey = 'YOUR PRIVATE KEY HERE';
	// add private key to wallet to have auto-signing transactions feature
	const account = web3.eth.accounts.privateKeyToAccount(privateKey);
	web3.eth.accounts.wallet.add(account);

	// deploy contract
	const contract = new web3.eth.Contract(GreeterAbi);
	const deployedContract = await contract
		.deploy({
			data: GreeterBytecode,
			arguments: ['My Greeting']
		})
		.send({ from: account.address });
	deployedContract.defaultAccount = account.address;

	const transaction = {
		from: account.address,
		to: deployedContract.options.address,
		data: '0xcfae3217' // greet function call data encoded
	};
	const { accessList } = await web3.eth.createAccessList(transaction, 'latest');

	console.log('AccessList:', accessList);

	// create transaction object with `accessList`
	const tx = {
		from: account.address,
		to: deployedContract.options.address,
		gasLimit: BigInt(46000),
		type: BigInt(1), // <- specify type
		accessList,
		data: '0xcfae3217',
		// gasPrice - you can specify this property directly or `web3.js` will fill this field automatically
	};

	// send transaction
	const receipt = await web3.eth.sendTransaction(tx);

	console.log('Receipt:', receipt);
}
(async () => {
	await test();
})();
