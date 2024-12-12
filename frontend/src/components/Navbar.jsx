import React, {useContext} from 'react';
import { FundMeContext } from '../context/FundMeContext';

const Navbar = () => {
  const {currentAccount, connectWallet} = useContext(FundMeContext);

  return (
    <div>
      {currentAccount ? (
        <p>Connected Account: {currentAccount}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )} 
    </div>
  )
}

export default Navbar;