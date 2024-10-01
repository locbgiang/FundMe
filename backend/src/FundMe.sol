// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error NotOwner();

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title FundMe
 * @author Loc Giang
 * @notice A contract that collect funds from multiple accounts and the onwer can withdraw that fund.
 */
contract FundMe {
    // State variables
    address public immutable i_owner;
    mapping(address => uint256) public s_addressToAmmountFunded;
    address[] public s_funders;
    AggregatorV3Interface public priceFeed; // Chainlink price feed interface

    // minimum USD amount to fund (e.g., $5)
    uint256 public constant MINIMUM_USD = 5 * 1e18;

    constructor(address ETH_USD_PRICE_FEED) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(ETH_USD_PRICE_FEED);
    }

    function Fund() public payable {
        // require user send atleast 5 dollars
        s_addressToAmmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NotOwner();
        _;
    }

    function withdraw() public onlyOwner {
        // withdraw funds to owner
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmmountFunded[funder] = 0;
        }
        s_funders = new address[](0);

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    // chainlink pricefeed function

    function getPrice() public view returns (int256) {
        //get the price of eth in USD
        (, int256 price, , , ) = priceFeed.latestRoundData();
        // eth/usd price is returned with 8 decimals, so wwe convert it to 18 decimals
        return price;
    }

    function getConversionRate() public {}
}
