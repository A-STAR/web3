import React from 'react';
import { useEffect, useState } from 'react';
import { Web3 } from 'web3';

function App() {
	const [web3, setWeb3] = useState<Web3 | null>(null);
	const [warning, setWarning] = useState<string | null>(null);
	const [provider, setProvider] = useState<string | null>(null);
	const [chainId, setChainId] = useState<string | null>(null);
	const [latestBlock, setLatestBlock] = useState<string | null>(null);
	useEffect(() => {
		// ensure that there is an injected the Ethereum provider
		if (window.ethereum) {
			// use the injected Ethereum provider to initialize Web3.js
			setWeb3(new Web3(window.ethereum));
			// check if Ethereum provider comes from MetaMask
			if (window.ethereum.isMetaMask) {
				setProvider('Connected to Ethereum with MetaMask.');
			} else {
				setProvider('Non-MetaMask Ethereum provider detected.');
			}
		} else {
			// no Ethereum provider - instruct user to install MetaMask
			setWarning('Please install MetaMask');
		}
	}, []);

	useEffect(() => {
		async function getChainId() {
			if (web3 === null) {
				return;
			}

			// get chain ID and populate placeholder
			setChainId(`Chain ID: ${await web3.eth.getChainId()}`);
		}

		async function getLatestBlock() {
			if (web3 === null) {
				return;
			}

			// get latest block and populate placeholder
			setLatestBlock(`Latest Block: ${await web3.eth.getBlockNumber()}`);

			// subscribe to new blocks and update UI when a new block is created
			const blockSubscription = await web3.eth.subscribe('newBlockHeaders');
			blockSubscription.on('data', block => {
				setLatestBlock(`Latest Block: ${block.number}`);
			});
		}

		getChainId();
		getLatestBlock();
	}, [web3]);
	return (
		<>
			<p id="warn" style={{ color: 'red' }}>
				{warning}
			</p>
			<p id="provider">{provider}</p>
			<p id="chain-id">{chainId}</p>
			<p id="latest-block">{latestBlock}</p>
		</>
	);
}

export default App;
