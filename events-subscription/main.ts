import './style.css';
import { abi } from './contractData';

import { Web3, WebSocketProvider } from 'web3';

document.getElementById('result')!.innerText = `Subscribing...`;

(async () => {
  const web3 = new Web3(
    new WebSocketProvider('wss://ethereum-rpc.publicnode.com')
  );

  async function subscribe() {
    // // create a new contract object, providing the ABI and address
    const address = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // USDC contract
    const contract = new web3.eth.Contract(abi, address);

    // subscribe to the smart contract Transfer event
    const subscription = contract.events.Transfer();
    // const subscription = await web3.eth.subscribe('logs');
    // const subscription = await web3.eth.subscribe('pendingTransactions'); //or ("newPendingTransactions")
    // const subscription = await web3.eth.subscribe('newBlockHeaders'); //or ("newHeads")
    // const subscription = await web3.eth.subscribe('syncing');

    // new value every time the event is emitted
    subscription.on('data', (data) => {
    // subscription.on('changed', (changed) => {
    // subscription.on('error', (error) => {
    // subscription.on('connected', (connected) => {
      document
        .getElementById('result')!
        .prepend(
          `\nAmount: ${data.returnValues.tokens?.toString()}\nFrom: ${
            data.returnValues.from
          }\nTo: ${data.returnValues.to}\n`
        );
    });
    document.getElementById('result')!.innerText = `Subscribed`;

    return subscription;
  }

  // function to unsubscribe from a subscription
  async function unsubscribe(subscription) {
    await subscription.unsubscribe();
  }

  const subscription = subscribe();
  // unsubscribe(subscription);
})();
