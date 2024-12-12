import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const FundMeContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const FundMeContract = new ethers.Contract(contractAddress, contractABI, signer);

    return FundMeContract;
}

export const FundMeProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccoutBalance] = useState(null);

    // this function automatically tells user to connect their metamask wallet
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert ("Please install metamask");

            const accounts = await ethereum.request({method: "eth_accounts"});

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found")
            }
        } catch (error) {
            throw new Error("No ethereum object.");
        }
    }

    // this function connect metamask wallet with this app
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const getBalance = async () => {
        if (ethereum) {
            const provider = new ethers.BrowserProvider(ethereum);
            try {
                const balance = await provider.getBalance(currentAccount);
                setAccoutBalance(ethers.formatEther(balance));
            } catch (error) {
                console.log(error)
            }
        } else {
            return alert("Please install metamask");
        }
    }


    useEffect(()=>{
        checkIfWalletIsConnected(); // auto call function once on start up of app
    })
    return (
        <FundMeContext.Provider value={{
            connectWallet, // function to connect wallet on the front end
            currentAccount,
            getBalance,
            accountBalance
        }}>
            {children}
        </FundMeContext.Provider>
    )
}