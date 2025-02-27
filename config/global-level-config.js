import { Web3, Web3Context } from 'web3';

let web3 = new Web3({
	provider: 'https://mainnet.infura.io/v3/YOURID',
	config: {
		defaultTransactionType: '0x0'
	}
});

// now default transaction type will be 0x0 so using following function in eth will send type 0x0 transaction

web3.eth
	.sendTransaction({
		from: '0x18532dF2Ab835d4E9D07a8b9B759bf5F8f890f49',
		to: '0xB2f70d8965e754cc07D343a9b5332876D3070155',
		value: 100,
		gasLimit: 21000
	})
	.then(res => console.log(res));




const context = new Web3Context('http://127.0.0.1:7545');
context.setConfig({ defaultTransactionType: '0x0' });

web3 = new Web3(context);

// it will now default to 0x0 type transactions
web3.eth
  .sendTransaction({
    from: '0x18532dF2Ab835d4E9D07a8b9B759bf5F8f890f49',
    to: '0x018e221145dE7cefAD09BD53F41c11A918Bf1Cb7',
    value: 100,
    gasLimit: 21000
  })
  .then(res => console.log(res));
