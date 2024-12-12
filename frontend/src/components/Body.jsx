// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export const Body = ({ contract }) => {
  const [minimumUSD, setMinimumUSD] = useState("0");
  const [numFunders, setNumFunders] = useState(0);
  const [recentFunder, setRecentFunder] = useState("");

  // Function to fetch contract details
  const fetchContractDetails = async () => {
    try {
      const minimum = ethers.utils.formatUnits(await contract.MINIMUM_USD(), 18);
      const fundersCount = (await contract.s_funders.length).toString();
      const lastFunder = fundersCount > 0 ? await contract.s_funders(fundersCount - 1) : "No funders yet";

      setMinimumUSD(minimum);
      setNumFunders(parseInt(fundersCount));
      setRecentFunder(lastFunder);
    } catch (error) {
      console.error("Error fetching contract details:", error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchContractDetails();
    }
  }, [contract]);

  // Function to fund the contract
  const fundContract = async () => {
    try {
      const tx = await contract.fund({ value: ethers.utils.parseEther(minimumUSD) });
      await tx.wait();
      alert("You have successfully funded the contract!");
      fetchContractDetails();
    } catch (error) {
      console.error("Error funding contract:", error);
      alert("Failed to fund the contract. Please try again.");
    }
  };

  return (
    <div className="body">
      <h2>FundMe Contract</h2>
      <div className="contract-details">
        <p>Minimum Funding Amount: {minimumUSD} USD</p>
        <p>Number of Funders: {numFunders}</p>
        <p>Most Recent Funder: {recentFunder}</p>
      </div>
      <button onClick={fundContract} className="fund-contract-button">
        Fund Contract
      </button>
    </div>
  );
};
