import { Web3Eth } from 'web3-eth';
import type { EIP1193Provider, Web3APISpec } from 'web3-types';

const provider: EIP1193Provider<Web3APISpec> | undefined = window.ethereum;
if (provider !== undefined) {
	provider.on("chainChanged", () => window.location.reload());
}

const web3: Web3Eth = provider === undefined ? new Web3Eth() : new Web3Eth(provider);
const Web3Service = { provider, web3 };

export default Web3Service;
