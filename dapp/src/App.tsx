import { useEffect, useState } from 'react';
import { type EIP6963ProviderDetail, Web3 } from 'web3';

import TransferForm from './TransferForm';
import { useProviders } from './useProviders';

function App() {
	// get the dynamic list of providers
	const providers = useProviders();

	// application state
	const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
	const [accounts, setAccounts] = useState<string[]>([]);
	const [balances, setBalances] = useState<Map<string, number>>(new Map());

	// click-handler for provider buttons
	function setProvider(provider: EIP6963ProviderDetail) {
		const web3: Web3 = new Web3(provider.provider);
		setWeb3(web3);
		web3.eth.requestAccounts().then(setAccounts);
		provider.provider.on('accountsChanged', setAccounts);
		provider.provider.on('chainChanged', () => window.location.reload());
	}

	// update account balances
	useEffect(() => {
		async function updateBalances(web3: Web3) {
			const balances = new Map<string, number>();
			for (const account of accounts) {
				const balance = await web3.eth.getBalance(account);
				balances.set(account, parseFloat(web3.utils.fromWei(balance, 'ether')));
			}

			setBalances(balances);
		}

		if (web3 === undefined) {
			return;
		}

		// set balances for list of accounts
		updateBalances(web3);

		// update balances when a new block is created
		const subscription = web3.eth.subscribe('newBlockHeaders').then(subscription => {
			subscription.on('data', () => updateBalances(web3));
			return subscription;
		});

		return () => {
			subscription.then(subscription => subscription.unsubscribe());
		};
	}, [accounts, web3]);

	return (
		<>
			{web3 === undefined
				? // no provider set, display list of available providers
				  providers.map((provider: EIP6963ProviderDetail) => {
						// for each provider, display a button to connect to that provider
						return (
							<div key={provider.info.uuid}>
								<button
									onClick={() => setProvider(provider)}
									style={{ display: 'inline-flex', alignItems: 'center' }}
								>
									<img
										src={provider.info.icon}
										alt={provider.info.name}
										width="35"
									/>
									<span>{provider.info.name}</span>
								</button>
							</div>
						);
				  })
				: accounts.map((address: string, ndx: number) => {
						// provider set, list accounts and balances
						return (
							<div key={address}>
								<div>Account: {address}</div>
								<div>Balance: {`${balances.get(address)}`}</div>
								<TransferForm address={address} web3={web3}></TransferForm>
								{ndx !== accounts.length - 1 ? <br /> : null}
							</div>
						);
				  })}
		</>
	);
}

export default App;