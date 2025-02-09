// Importing from web3-eth-contract package
import { Contract } from 'web3-eth-contract';
const contract = new Contract(...);

// Importing from the main web3 package
import { Contract } from 'web3';
const contract = new Contract(...);

// Importing from the main web3 package from inside `web3.eth` namespace
import { Web3 } from 'web3';
const web3 = new Web3('http://127.0.0.1:8545');
const contract = new web3.eth.Contract(...);

// to set the provider for the contract instance:
contract.setProvider('http://127.0.0.1:7545');



import { Contract } from 'web3-eth-contract';

// instantiating Contract directly with provider URL from Contract package
// alternatively, you can instantiate the Contract without a provider and set it later using contract.setProvider()
const abi = [{...}];
const address = '0x...';
const contract = new Contract(abi, address { provider: 'http://127.0.0.1:8545' });

// the provider can be set like this if not provided at the constructor:
contract.setProvider('http://127.0.0.1:7545');

// using Contract from a web3 instance
const web3 = new Web3('http://localhost:8545');
const contract = new web3.eth.Contract(abi, address);
// no need to pass the provider to this contract instance.
// because it will have the same provider of the web3 instance.




const abi = [{...}]; /* obtained ABI as an array */;
const address = '0x...'; // Deployed address of the contract

const myContract = new Contract(abi, address, {
  defaultGasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
  defaultGas: 5000000, // provide the gas limit for transactions
  // ...other optional properties
});




import { Web3 } from 'web3';

// Set up a connection to a testnet or Ethereum network
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); //or new Web3('http://127.0.0.1:8545')

// Create a new contract object using the ABI and bytecode
const abi = [{...}]
const myContract = new web3.eth.Contract(abi);
console.log(myContract.config.handleRevert); // false

// This will set `handleRevert` to `true` only on `myContract` instance:
myContract.handleRevert = true; // same as: myContract.config.handleRevert
console.log(myContract.config.handleRevert); // true




myContract.options = {
  address: '0x1234567890123456789012345678901234567891',
  from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
  gasPrice: '10000000000000',
  gas: 1000000
}

// If the smart contract is not deployed yet, the property `address` will be filled automatically after deployment succeed.
// If the smart contract is already deployed, you can set the `address`:
myContract.options.address = '0x1234567890123456789012345678901234567891';
// this is the same as the second parameter in the constructor:
// new Contract(abi, `address`);

// set default from address
myContract.options.from = '0x1234567890123456789012345678901234567891';
// set default gas price in wei
myContract.options.gasPrice = '20000000000000';
// set the gas limit
myContract.options.gas = 5000000;

// you can also use this to update the ABI of the contract
myContract.options.jsonInterface = [{...}]; // ABI
// this is the same as the first parameter in the Contract constructor:
// new Contract(`abi`, address)




// note that the bellow METHOD_NAME and METHOD_PARAMETERS are
// according to the early provided ABI.
// And TypeScript intellisense will help you with.

// to call a method by sending a transaction
contract.methods.METHOD_NAME(METHOD_PARAMETERS).send();
// you need to specify the account (from) that will be used to sign and send the transaction
contract.methods.METHOD_NAME(METHOD_PARAMETERS).send({ from: '0x...' });

// to call a view or pure method that does not send a transaction
contract.methods.METHOD_NAME(METHOD_PARAMETERS).call();




// If you want to filter events, create `options`:
const options: ContractEventOptions = {
  // the following means all events where `myNumber` is `12` or `13`
  filter: myNumber: [12,13];
  // you can specify the block from where you like to start
  // listing to events
  fromBlock: 'earliest';

  // You can also manually set the topics for the event filter.
  // If given the filter property and event signature,
  // (topic[0]) will not be set automatically.
  // Each topic can also be a nested array of topics that behaves
  // as `or` operation between the given nested topics.
  topics?: ['0x617cf8a4400dd7963ed519ebe655a16e8da1282bb8fea36a21f634af912f54ab'];
}

// if you would like to not filter, don't pass `options`.
const event = await myContract.events.MyEvent(options);

event.on('data', (data) => {
  console.log(data)
});
event.on('error', (err: Error) => {
  console.log(err);
});




const event = await myContract.events.allEvents(options);




// this will give you the accounts from the connected provider
// For example, if you are using MetaMask, it will be the account available.
const providersAccounts = await web3.eth.getAccounts();
const defaultAccount = providersAccounts[0];
console.log('deployer account:', defaultAccount);

// NOTE: If you want to manually unlock an account with a private key, you can use wallet.add(privateKey).
// however, exercise caution and ensure the security of your private keys.

// this is how to obtain the deployer function,
// so you can estimate its needed gas and deploy it.
const contractDeployer = myContract.deploy({
	data: bytecode, // prefix the bytecode with '0x' if it is not already
	arguments: [1] // provide the parameters in an array; in this case, it's the number `1`.
});

// optionally, estimate the gas that will be used for development and log it
const gas = await contractDeployer.estimateGas({
	from: defaultAccount
});
console.log('estimated gas:', gas);

// Deploy the contract to the Ganache network
const tx = await contractDeployer.send({
	from: defaultAccount,
	gas,
	gasPrice: 10000000000
});
console.log('Contract deployed at address: ' + tx.options.address);
