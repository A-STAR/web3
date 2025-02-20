import type { EIP6963ProviderDetail } from 'web3';

import { useProviders } from './useProviders';

function App() {
	// get the dynamic list of providers
	const providers = useProviders();

	return (
		<>
			{providers.map((provider: EIP6963ProviderDetail) => {
				// list available providers
				return (
					<div key={provider.info.uuid}>
						{provider.info.name} [{provider.info.rdns}]
					</div>
				);
			})}
		</>
	);
}

export default App;
