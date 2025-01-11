import { Web3 } from 'web3';

const web3 = new Web3('https://sepolia.infura.io/v3/YOUR_INFURA_ID');

// add an account to a wallet
const account = web3.eth.accounts.wallet.add(
	'0x50d349f5cf627d44858d6fcb6fbf15d27457d35c58ba2d5cfeaf455f25db5bec'
);

// create transaction object to send 1 eth to '0xa32...c94' address from the account[0]
const tx = {
	from: account[0].address,
	to: '0xa3286628134bad128faeef82f44e99aa64085c94',
	value: web3.utils.toWei('0.001', 'ether')
};
// the "from" address must match the one previously added with wallet.add

// send the transaction
const txReceipt = await web3.eth.sendTransaction(tx);

console.log('Tx hash:', txReceipt.transactionHash);
