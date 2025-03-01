import { Web3, FMT_NUMBER, FMT_BYTES } from 'web3';

const web3 = new Web3('http://127.0.0.1:7545');

web3.defaultReturnFormat = {
	// number: FMT_NUMBER.NUMBER,
	// number: FMT_NUMBER.HEX,
	// number: FMT_NUMBER.STR,
	number: FMT_NUMBER.BIGINT,
	bytes: FMT_BYTES.HEX
	// bytes: FMT_BYTES.UINT8ARRAY
};
