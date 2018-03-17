pragma solidity ^0.4.0;

contract Bid {
    mapping (address => uint) public userBids;
  
    function Bid() {
        userBids[msg.sender] = 0;
    }

    function setBid(address to, uint amount) {
        balances[msg.sender] = amount;
    }
}
