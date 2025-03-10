import { ENS } from 'web3-eth-ens';

const ens = new ENS(undefined, 'https://127.0.0.1:8545');

const address = await ens.getAddress('ethereum.eth');
console.log(address);

const hash = await ens.getContenthash('ethereum.eth');
console.log(hash);

const owner = await ens.getOwner('ethereum.eth');
console.log(owner);

const key = await ens.getPubkey('xyz.eth');
console.log(key);

const resolver = await ens.getResolver('xyz.eth');
console.log(resolver.options.address);

const ttl = await ens.getTTL('xyz.eth');
console.log(ttl);

const result = await ens.recordExists('ethereum.eth');
console.log(result);
