import { Web3 } from 'web3';
import { Web3Eth } from 'web3-eth';

const web3 = new Web3('https://mainnet.infura.io/v3/YOURID');

web3.eth.setConfig({ defaultTransactionType: '0x0' });

web3.eth
	.sendTransaction({
		from: '0x18532dF2Ab835d4E9D07a8b9B759bf5F8f890f49',
		to: '0xB2f70d8965e754cc07D343a9b5332876D3070155',
		value: 100,
		gasLimit: 21000
	})
	.then(res => console.log(res));




let web3EthObj = new Web3Eth({
  provider: 'http://127.0.0.1:7545',
  config: {
    defaultTransactionType: 0x0
  }
});

web3EthObj
  .sendTransaction({
    from: '0x18532dF2Ab835d4E9D07a8b9B759bf5F8f890f49',
    to: '0x018e221145dE7cefAD09BD53F41c11A918Bf1Cb7',
    value: 100,
    gasLimit: 21000
  })
  .then(res => console.log(res));




web3EthObj = new Web3Eth('http://127.0.0.1:7545');

web3EthObj.setConfig({ defaultTransactionType: 0x0 });

web3EthObj
  .sendTransaction({
    from: '0x18532dF2Ab835d4E9D07a8b9B759bf5F8f890f49',
    to: '0x018e221145dE7cefAD09BD53F41c11A918Bf1Cb7',
    value: 100,
    gasLimit: 21000
  })
  .then(res => console.log(res));
