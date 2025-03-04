import { Web3 } from 'web3';

// Set up a connection to the Ganache network
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // anvil
/* NOTE:
instead of using ganache, you can also interact with a testnet/mainnet using another provider
https://app.infura.io/
https://dashboard.alchemy.com/
or use a public provider https://chainlist.org/
*/

// Log the current block number to the console
const block = await web3.eth.getBlockNumber();

console.log('Last block:', block);
