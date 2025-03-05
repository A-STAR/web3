import { Web3, ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT, HexString } from 'web3';

async function estimate() {
	// ABI of our contract
	const abi = [
		{
			inputs: [{ internalType: 'uint256', name: '_myNumber', type: 'uint256' }],
			stateMutability: 'nonpayable',
			type: 'constructor'
		},
		{
			inputs: [],
			name: 'myNumber',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function'
		},
		{
			inputs: [{ internalType: 'uint256', name: '_myNumber', type: 'uint256' }],
			name: 'setMyNumber',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function'
		}
	];

	// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // anvil

	// get the available accounts
	const accounts = await web3.eth.getAccounts();
	let account = accounts[0];

	let contract = new web3.eth.Contract(abi);

	const deployment = contract.deploy({
		data: '0x608060405234801561001057600080fd5b506040516101d93803806101d983398181016040528101906100329190610054565b806000819055505061009e565b60008151905061004e81610087565b92915050565b60006020828403121561006657600080fd5b60006100748482850161003f565b91505092915050565b6000819050919050565b6100908161007d565b811461009b57600080fd5b50565b61012c806100ad6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806323fd0e401460375780636ffd773c146051575b600080fd5b603d6069565b6040516048919060bf565b60405180910390f35b6067600480360381019060639190608c565b606f565b005b60005481565b8060008190555050565b60008135905060868160e2565b92915050565b600060208284031215609d57600080fd5b600060a9848285016079565b91505092915050565b60b98160d8565b82525050565b600060208201905060d2600083018460b2565b92915050565b6000819050919050565b60e98160d8565b811460f357600080fd5b5056fea2646970667358221220d28cf161457f7936995800eb9896635a02a559a0561bff6a09a40bfb81cd056564736f6c63430008000033',
		arguments: [1]
	});

	let estimatedGas: bigint | HexString = await deployment.estimateGas({ from: account }, DEFAULT_RETURN_FORMAT);
	// the returned data will be formatted as a `bigint`

	console.log('Default format:', estimatedGas);

	estimatedGas = await deployment.estimateGas({ from: account }, ETH_DATA_FORMAT);
	// the returned data will be formatted as a `hexstring`

	console.log('Eth format:', estimatedGas);
}

(async () => {
	await estimate();
})();
