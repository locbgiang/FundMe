// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title FundMe
 * @author Loc Giang
 * @notice A contract that collect funds from multiple accounts and the onwer can withdraw that fund.
 */
contract FundMe {
    // fund contract
    // withdraw fund to owner

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function Fund() public payable {}
}
