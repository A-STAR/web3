window.addEventListener('load', function () {
  // check if web3 is available
  if (typeof window.ethereum !== 'undefined') {
    // use the browser injected Ethereum provider
    web3 = new Web3(window.ethereum);

    // request access to the user's MetaMask account
    window.ethereum.enable();

    // get the user's accounts
    web3.eth.getAccounts().then(function (accounts) {
      // show the first account
      document.getElementById('log').innerHTML =
        'Connected with MetaMask account: ' + accounts[0];
    });
  } else {
    // if window.ethereum is not available, give instructions to install MetaMask
    document.getElementById('log').innerHTML =
      'Please install MetaMask to connect with the Ethereum network';
  }
});
