import { Web3 } from 'web3';
import { IpcProvider } from 'web3-providers-ipc';

// IPC provider
const web3 = new Web3(new IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc'));
// the path above is for macOS
// on Windows the path is: '\\\\.\\pipe\\geth.ipc'
// on Linux the path is: '/users/myuser/.ethereum/geth.ipc'

// HTTP provider
web3.setProvider('http://localhost:8545');
// OR
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

// WebSocket provider
web3.setProvider('ws://localhost:8546');
// OR
web3.setProvider(new Web3.providers.WebsocketProvider('ws://localhost:8546'));

web3.currentProvider?.disconnect();
