// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

error NotOwner();

/**
 * @title FundMe
 * @author Loc Giang
 * @notice A contract that collect funds from multiple accounts and the onwer can withdraw that fund.
 */
contract FundMe {
    // fund contract
    // withdraw fund to owner

    address public immutable i_owner;
    mapping(address => uint256) public s_addressToAmmountFunded;
    address[] public s_funders;

    constructor() {
        i_owner = msg.sender;
    }

    function Fund() public payable {
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
    }
}
