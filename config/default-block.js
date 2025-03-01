web3.defaultBlock = 20167235; // A block number
web3.defaultBlock = 'earliest'; // The genesis block
web3.defaultBlock = 'latest'; // The latest block (current head of the blockchain)
web3.defaultBlock = 'pending'; // The block pending to be mined (including pending transactions)
web3.defaultBlock = 'finalized'; // (For POS networks) The finalized block is one which has been accepted as canonical by greater than 2/3 of validators
web3.defaultBlock = 'safe'; // (For POS networks) The safe head block is one which under normal network conditions, is expected to be included in the canonical chain. Under normal network conditions the safe head and the actual tip of the chain will be equivalent (with safe head trailing only by a few seconds). Safe heads will be less likely to be reorged than the proof of work network`s latest blocks.
