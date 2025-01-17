import { Web3, WebSocketProvider } from 'web3';

// supply a WebSocket provider as a URL `string`
let web3 = new Web3('wss://mainnet.infura.io/ws/v3/YOUR_INFURA_ID');

let block = await web3.eth.getBlockNumber();

console.log(block);

// terminate program
web3.currentProvider?.disconnect();

// supply a WebSocket provider by constructing a new `WebSocketProvider`
web3 = new Web3(new WebSocketProvider(
  'wss://mainnet.infura.io/ws/v3/YOUR_INFURA_ID',
  {
		headers: {
			// for node services that require an API key in a header
			'x-api-key': '<API key>'
		}
	},
	{
		delay: 500,
		autoReconnect: true,
		maxAttempts: 10
	}
));

block = await web3.eth.getBlockNumber();

console.log(block);

web3.currentProvider?.disconnect();
