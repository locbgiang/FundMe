import { useState } from 'react';
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]); // set the first account from metamask
        console.log('Connect account: ', accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet: ', error);
      }
    } else {
      alert('Metamask is not installed, Please install Metamask. ')
    }
  }

  return (
    <div>
      <button onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect Wallet'}
      </button>
    </div>
  );
}

export default App
