import React, { useContext } from "react";
import { FundMeContext } from "../context/FundMeContext";

const Body = () => {
  const {getBalance, accountBalance} = useContext(FundMeContext);
  const handleGetBalance = async () => {
    await getBalance(); // Fetch the balance from the blockchain
  };
  return (
    <div>
      <h2>Account Balance</h2>
      <div>
        {accountBalance !== null ? (
          <p>
            <strong>Balance:</strong> {accountBalance} ETH
          </p>
        ): (
          <p>No balance fetched yet. Click on the button bellow to fetch it</p>
        )}
        <button
          onClick={handleGetBalance}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Get Balance
        </button>
      </div>
    </div>
  )
}

export default Body;