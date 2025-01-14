import { Web3 } from 'web3';

const web3 = new Web3('https://unichain-sepolia.infura.io/v3/YOUR_INFURA_ID');

const address = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984';

const ABI = [
	{
    name: 'Transfer',
    inputs: [
      { type: 'address', name: '_from', indexed: true },
      { type: 'address', name: '_to', indexed: true },
      { type: 'uint256', name: '_value', indexed: false }
    ],
    anonymous: false,
    type: 'event'
  }
];

const uniswapToken = new web3.eth.Contract(ABI, address);

// get past `Transfer` events from block 18850576
const eventTransfer = await uniswapToken.getPastEvents('Transfer', { fromBlock: 18850576 });

console.log(eventTransfer);
