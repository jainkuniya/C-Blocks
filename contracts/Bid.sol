pragma solidity ^0.4.0;

contract Bid {
    mapping (address => uint) public userBids;
  
    function Bid() {
        userBids[msg.sender] = 0;
    }

    function setBid(address to, uint bidAmount) {
        userBids[msg.sender] = bidAmount;
    }
}
