import { Web3 } from 'web3';

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/YOUR_INFURA_ID');

web3.provider.on('message', () => {
	// ...
});

web3.provider.on('connect', () => {
	console.log('Connected…');
});

web3.provider.on('disconnect', () => {
	console.log('Disconnected…');
});

web3.provider.on('accountsChanged', () => {
	// ...
});

web3.provider.on('chainChanged', () => {
	// ...
});

// it is possible to catch errors that could happen in the underlying connection Socket with the `error` event
// and it is also used to catch the error when max reconnection attempts is exceeded
//  as in section: /docs/guides/web3_providers_guide/#error-message
web3.provider.on('error', () => {
	// ...
});

// for every event above `once` can be used to register to the event only once
web3.provider.once('SUPPORTED_EVENT_NAME', () => {
	// ...
});

// And to unregister a listener `removeListener` could be called
web3.provider.removeListener('SUPPORTED_EVENT_NAME', () => {
	// ...
});

const block = await web3.eth.getBlockNumber();

console.log(block);

web3.currentProvider?.disconnect();
