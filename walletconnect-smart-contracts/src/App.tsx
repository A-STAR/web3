import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  createWeb3Modal,
  defaultConfig
} from 'web3modal-web3js/react';
import { useState } from 'react';
import { ERC20ABI } from './contracts/ERC20';
import Web3 from 'web3';

const USDCAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '76804fd6127cc3b85f7d749c4e53700f';

// 2. Set chains
const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  {
    chainId: 8453,
    name: 'Base',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://base-rpc.publicnode.com'
  },
  {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://eth-sepolia-public.unifra.io'
  }
];

const web3Config = defaultConfig({
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 1,
  rpcUrl: 'https://cloudflare-eth.com'
});

// 3. Create modal
createWeb3Modal({
  web3Config,
  chains,
  projectId,
  enableAnalytics: true,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
});

export default function App() {
  // 4. Use modal hook
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [USDTBalance, setUSDTBalance] = useState(0); // `useState` to handle `USDTBalance`
  const [smartContractName, setSmartContractName] = useState(''); // `useState` to handle `smartContractName`

  async function getBalance() {
    if (!isConnected) throw Error('not connected');
    const web3 = new Web3({
      provider: walletProvider,
      config: { defaultNetworkId: chainId }
    });
    const contract = new web3.eth.Contract(ERC20ABI, USDCAddress);
    const balance = await contract.methods.balanceOf(address).call();
    const name = (await contract.methods.name().call()) as string;
    setUSDTBalance(Number(balance));
    setSmartContractName(name);
  }

  return (
    <>
      <w3m-button />
      <w3m-network-button />
      <button onClick={getBalance}>Get User Balance</button>
      <p> Getting the contract name: {smartContractName} </p>
      <p> USDT balance: {USDTBalance}</p>{' '}
    </>
  );
}
