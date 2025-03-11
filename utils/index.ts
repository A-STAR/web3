import { Web3, utils } from 'web3';
import { toWei, toHex, format } from 'web3-utils';
import { FMT_BYTES, FMT_NUMBER } from 'web3-types';

// usage
toWei('1', 'ether');
toHex('');


// no need to initialize a provider
let value = Web3.utils.toHex('web3');
console.log('hex value without provider', value);

// initializing a provider
const web3 = new Web3('https:// eth.llamarpc.com');

// access the utils package
value = web3.utils.toHex('web3');
console.log('hex value with provider', value);

// access the utils package
value = utils.toWei('1', 'ether');
console.log('ether in wei', value);

value = toWei('1', 'ether');
console.log('ether in wei using `toWei` function', value);
value = toHex('');
console.log('hex empty string using `toHex` function', value);


// Random bytes in hex string and array format
console.log('random bytes hex format', web3.utils.randomHex(32));
console.log('random bytes array', web3.utils.randomBytes(32));


// conversion to ether, wei
console.log('convert wei to ether', web3.utils.fromWei('1', 'ether'));
console.log('convert ether to wei', web3.utils.toWei('1', 'ether'));


// conversion to hex values
console.log('`10` to hex', web3.utils.toHex(10));
console.log('`true` to hex', web3.utils.toHex(true));
console.log('`number` to hex', web3.utils.numberToHex(10));
console.log('`10` from decimal', web3.utils.fromDecimal(10));

const arr = new Uint8Array([1, 2, 3, 4]);

console.log('convert array to hex', web3.utils.toHex(arr));
console.log('convert bytes to hex', web3.utils.bytesToHex(arr));


// conversion UTF and ASCII
console.log('convert UTF \'😊\' to hex', web3.utils.utf8ToHex('😊'));
console.log('convert \'😊\' from UTF', web3.utils.fromUtf8('😊'));
console.log('convert ASCII \'😊\' to hex', web3.utils.asciiToHex('😊'));
console.log('convert to UTF', web3.utils.toUtf8('0xf09f988a'));
console.log('convert hex to UTF', web3.utils.hexToUtf8('0xf09f988a'));
console.log('convert hex to string', web3.utils.hexToString('0xf09f988a'));


// emojis are not ASCII character, that's why it won't work
console.log('convert emoji to ASCII', web3.utils.toAscii('0x4869'));
console.log('convert hex emoji to ASCII', web3.utils.hexToAscii('0x4869'));


// convert numbers and `BigInt`
console.log('convert to number', web3.utils.toNumber('0xa'));
console.log('convert hex to number', web3.utils.hexToNumber('0xa'));
console.log('convert to decimal', web3.utils.toDecimal('0xa'));
console.log('convert hex to number string', web3.utils.hexToNumberString('0xa'));
console.log('convert to `BigInt`', web3.utils.toBigInt('0xa'));


// hashing functions
console.log('hash string with SHA3', web3.utils.sha3('hello web3'));
console.log('hash solidity object with SHA3', web3.utils.soliditySha3({ type: 'string', value: 'hello web3' }));


// passing an address with all characters lowercase
console.log(web3.utils.toChecksumAddress('0xa3286628134bad128faeef82f44e99aa64085c94'));
// passing a wrong address
// console.log(web3.utils.toChecksumAddress('0xa3286628134bad128faeef82f44e99aa64085c9'));
// InvalidAddressError: Invalid value given "0xa286628134bad128faeef82f44e99aa64085c94". Error: invalid ethereum address.


// same as abi.encodePacked() in solidity (must be strings)
// converts everything to hex and packs everything without padding
console.log(web3.utils.encodePacked('1', '1', '1'));
// 0x313131


// it will convert the number `10` to `hex('a')` and add 0s until it's 32 characters long
// the third argument will be the one that will fill/pad the whole hex string, in this case is '0'
console.log('pad right', web3.utils.padRight(10, 32, '0'));
console.log('right pad', web3.utils.rightPad(10, 32, '0'));
console.log('pad left', web3.utils.padLeft(10, 32, '0'));
console.log('left pad', web3.utils.leftPad(10, 32, '0'));


// compare block numbers
console.log(web3.utils.compareBlockNumbers('pending', 'latest'));
console.log(web3.utils.compareBlockNumbers('latest', 'pending'));
console.log(web3.utils.compareBlockNumbers('latest', 'latest'));
console.log(web3.utils.compareBlockNumbers(2, 2));


// format a primitive number as a hexidecimal string
console.log(format({ format: 'uint' }, 221, {
  number: FMT_NUMBER.HEX,
  bytes: FMT_BYTES.HEX
}));

// format a primitive number as a `BigInt`
console.log(format({ format: 'uint' }, 221, {
  number: FMT_NUMBER.BIGINT,
  bytes: FMT_BYTES.HEX
}));

// format a stringified number as a hexidecimal string
console.log(format({ format: 'uint' }, '221', {
  number: FMT_NUMBER.HEX,
  bytes: FMT_BYTES.HEX
}));

// format a `Uint8Array` of bytes as a hexidecimal string
console.log(
	format({ format: 'bytes' }, new Uint8Array([2, 33]), {
    number: FMT_NUMBER.HEX,
		bytes: FMT_BYTES.HEX
	})
);

// format an array of values
console.log(
	format({ type: 'array', items: { format: 'uint' } }, ['221', 1983], {
		number: FMT_NUMBER.HEX,
    bytes: FMT_BYTES.HEX
	})
);

// format an object with multiple properties
console.log(
	format(
		{
			type: 'object',
			properties: {
				aNumber: { format: 'uint' },
				someBytes: { format: 'bytes' }
			},
		},
		{ aNumber: '221', someBytes: new Uint8Array([2, 33]) },
		{ bytes: FMT_BYTES.UINT8ARRAY, number: FMT_NUMBER.HEX }
	)
);
