import { Web3 } from 'web3';

const web3 = new Web3('https://rpc2.sepolia.org');

async function txEIP2930() {
	const wallet = web3.eth.wallet!.add('YOUR_PRIVATE_KEY');

	const sender = wallet[0].address;
	const contractAddress = '0x...';
	const gas = 500000; // could be higher
	const gasPrice = await web3.eth.getGasPrice();
	const data = '0x9a67c8b100000000000000000000000000000000000000000000000000000000000004d0';

	// create access list using `web3.eth`
	const accessListData = await web3.eth.createAccessList({
		from: sender,
		to: contractAddress,
		data
	});

	console.log(accessListData);

	const tx = {
		from: sender,
		to: contractAddress, // the contract we are calling
		data,
		gas,
		gasPrice,
		type: 1,
		accessList: accessListData.accessList // access the object `accessList`
	};

	const txReceipt = await web3.eth.sendTransaction(tx);

	console.log('Tx hash', txReceipt.transactionHash);
}

txEIP2930();
