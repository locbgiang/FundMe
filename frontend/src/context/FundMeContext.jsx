import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const FundMeContext = React.createContext();

const { ethereum } = window;

export const FundMeProvider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState("");

    // this function connect metamask wallet with this app
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    return (
        <FundMeContext.Provider value={{
            connectWallet, // function to connect wallet on the front end
            currentAccount
        }}>
            {children}
        </FundMeContext.Provider>
    )
}