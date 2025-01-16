import { Block, FMT_BYTES, FMT_NUMBER, Numbers, Web3 } from 'web3';

const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_ID');

// use the default return format
web3.eth.getBlock().then((block: Block) => {
	console.log(`Block #${block.number} Hash: ${block.hash}`);
});

// specify the return format for a single function invocation
web3.eth
	.getBlockNumber({
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.HEX
	})
	.then((blockNumber: Numbers) => {
		console.log(`Block #${blockNumber}`);
	});

// configure default return format for the web3-eth package
web3.eth.defaultReturnFormat = {
	bytes: FMT_BYTES.UINT8ARRAY,
	number: FMT_NUMBER.HEX
};

web3.eth.getBlock().then((block: Block) => {
	console.log(`Block #${block.number} Hash: [${block.hash}]`);
});

// Bytes
web3.eth
	.getBlock(undefined, undefined, {
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.BIGINT
	})
	.then((block: Block) => {
		console.log(`Block hexadecimal \`string\` hash: ${block.hash}`);
	});

web3.eth
	.getBlock(undefined, undefined, {
		bytes: FMT_BYTES.UINT8ARRAY,
		number: FMT_NUMBER.BIGINT
	})
	.then((block: Block) => {
		console.log(`Block \`Uint8Array\` hash: [${block.hash}]`);
	});

// Numbers
web3.eth
	.getBlockNumber({
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.BIGINT
	})
	.then((blockNumber: Numbers) => {
		console.log(`Block \`BigInt\` #${blockNumber}`);
	});

web3.eth
	.getBlockNumber({
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.HEX
	})
	.then((blockNumber: Numbers) => {
		console.log(`Block hexadecimal \`string\` #${blockNumber}`);
	});

web3.eth
	.getBlockNumber({
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.NUMBER
	})
	.then((blockNumber: Numbers) => {
		console.log(`Block \`Number\` #${blockNumber}`);
	});

web3.eth
	.getBlockNumber({
		bytes: FMT_BYTES.HEX,
		number: FMT_NUMBER.STR
	})
	.then((blockNumber: Numbers) => {
		console.log(`Block \`string\` #${blockNumber}`);
	});
