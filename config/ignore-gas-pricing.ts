import { Web3, TransactionWithToLocalWalletIndex, Contract } from 'web3';

const web3 = new Web3('http://127.0.0.1:7545');
web3.config.ignoreGasPricing = true; // when setting configurations for the web3 object, this will also apply to newly created contracts from the web3 object
const transaction: TransactionWithToLocalWalletIndex = {
	from: '0x000000000000000000000000000000000000001',
	to: '0x0000000000000000000000000000000000000000',
	value: BigInt(1),
	data: '0x64edfbf0e2c706ba4a09595315c45355a341a576cc17f3a19f43ac1c02f814ee'
};
const receipt = await web3.eth.sendTransaction(transaction); // web3.js will not estimate gas now.




// const contractDeployed: Contract<typeof BasicAbi>;
// instantiate contract...
// contractDeployed.config.ignoreGasPricing = true;
// receipt = await contractDeployed.methods.setValues(1, 'string value', true).send(sendOptions);
