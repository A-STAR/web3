// Assuming multiple providers are installed in browser.

import { Web3 } from 'web3';

// Following will subscribe to event that will be triggered when providers map is updated.

Web3.onNewProviderDiscovered(provider => {
	console.log(provider.detail); // This will log the populated providers map object, provider.detail has Map of all providers yet discovered
	// add logic here for updating UI of your DApp
});

// Call the function and wait for the promise to resolve
let providers = await Web3.requestEIP6963Providers();
for (const [key, value] of providers) {
	console.log(value);

	/* Based on your DApp's logic show use list of providers and get selected provider's UUID from user for injecting its EIP6963ProviderDetail.provider EIP1193 object into web3 object */

	if (value.info.name === 'MetaMask') {
		const web3 = new Web3(value.provider);

		// now you can use web3 object with injected provider
		console.log(
			await web3.eth.getTransaction(
				'0x82512812c11f56aa2474a16d5cc8916b73cd6ed96bf9b8defb3499ec2d9070cb'
			)
		);
	}
}
