import { Web3 } from 'web3';

const web3 = new Web3('wss://ethereum.publicnode.com');

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

// create the subscription to all the 'Transfer' events
const subscription = uniswapToken.events.Transfer();

// listen to the events
subscription.on('data', console.log);
