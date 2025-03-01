import { Web3, Hardfork } from 'web3';

const web3 = new Web3('http://127.0.0.1:7545');

web3.defaultHardfork = 'berlin';
web3.defaultChain = 'goerli';

web3.defaultCommon = {
	baseChain: 'goerli',
	hardfork: 'berlin' as Hardfork,
	customChain: {
		networkId: 1,
		chainId: 1
	}
};

console.log(web3.getContextObject().config);
