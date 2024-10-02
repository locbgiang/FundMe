// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error NotOwner();

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {PriceConverter} from "./PriceConverter.sol";

/**
 * @title FundMe
 * @author Loc Giang
 * @notice A contract that collect funds from multiple accounts and the onwer can withdraw that fund.
 */
contract FundMe {
    using PriceConverter for uint256;

    // State variables
    address public immutable i_owner;
    mapping(address => uint256) public s_addressToAmmountFunded;
    address[] public s_funders;
    AggregatorV3Interface public s_priceFeed; // Chainlink price feed interface

    // minimum USD amount to fund (e.g., $5)
    uint256 public constant MINIMUM_USD = 5 * 1e18;

    constructor(address ETH_USD_PRICE_FEED) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(ETH_USD_PRICE_FEED);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        // require user send atleast 5 dollars
        s_addressToAmmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
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

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

    function getAddressToAmmountFunded(
        address fundingAddress
    ) external view returns (uint256) {
        return s_addressToAmmountFunded[fundingAddress];
    }

    function getFunders(uint256 index) external view returns (address) {
        return s_funders[index];
    }

    function getOwner() external view returns (address) {
        return i_owner;
    }
}
