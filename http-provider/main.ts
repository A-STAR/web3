import { Web3, HttpProvider } from 'web3';

let web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

let block = await web3.eth.getBlockNumber();

console.log(block);

const httpOptions = {
	providerOptions: {
		body: undefined,
		cache: 'force-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		integrity: undefined,
		keepalive: true,
		method: 'GET',
		mode: 'same-origin',
		redirect: 'error',
		referrer: undefined,
		referrerPolicy: 'same-origin',
		signal: undefined,
		window: undefined
	} as RequestInit
};

web3 = new Web3(new HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_ID', httpOptions));

block = await web3.eth.getBlockNumber();

console.log(block);
