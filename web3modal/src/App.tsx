import {
  useWeb3ModalTheme,
  createWeb3Modal,
  defaultConfig
} from 'web3modal-web3js/react';

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
  }
];

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create web3 config
const web3Config = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  defaultChainId: 1, // used for the Coinbase SDK
  rpcUrl: 'https://cloudflare-eth.com' // used for the Coinbase SDK
});

// 5. Create a `Web3Modal` instance
createWeb3Modal({
  web3Config,
  chains,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
});

export default function App() {
  const { themeMode, setThemeMode } = useWeb3ModalTheme();

  return (
    <>
      <w3m-button />
      <w3m-network-button />
      <w3m-account-button />

      <button
        onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      >
        Toggle Theme Mode
      </button>
    </>
  );
}
