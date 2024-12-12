// Import necessary dependencies
import React, { useState } from "react";


export const Navbar = () => {
  const [account, setAccount] = useState(null);

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Save the connected account
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-title">FundMe</h2>
      <div className="navbar-buttons">
        {!account ? (
          <button onClick={connectWallet} className="connect-wallet-button">
            Connect Wallet
          </button>
        ) : (
          <p className="connected-account">Connected: {account}</p>
        )}
      </div>
    </nav>
  );
};
