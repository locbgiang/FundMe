// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {FundMe} from "../../src/FundMe.sol";

contract FundMeTest is Test {
    FundMe fundMe;

    address constant OWNER_ADDRESS = address(0x123);

    function setUp() public {
        // Prank set the msg.sender for the next call to be the OWNER_ADDRESS
        vm.prank(OWNER_ADDRESS);
        fundMe = new FundMe();
    }

    function testOwnerIsSetCorrectly() public {
        assertEq(fundMe.i_owner(), OWNER_ADDRESS);
    }
}
