pragma solidity ^0.4.0;
contract Counter {
    uint threshold = 17;
    struct Bid {
        uint256 timestamp;
        uint projectId;
        uint amount;
        uint userId;
        address bidAddress;
    }

    Bid[] public bids;

    function addBid(uint _timestamp, uint _projectId,uint  _amount,uint _userId, address _userAddress) public returns(uint) {
        bids.length++;
        bids[bids.length-1].timestamp = _timestamp;
        bids[bids.length-1].projectId = _projectId;
        bids[bids.length-1].amount = _amount;
        bids[bids.length-1].userId = _userId;
        bids[bids.length-1].bidAddress = _userAddress;
        return bids.length;
    }

    function getBidsCount() public constant returns(uint) {
        return bids.length;
    }

    function getBid(uint index) public constant returns(uint256,uint,uint,uint, address) {
        return (bids[index].timestamp,bids[index].projectId,bids[index].amount,bids[index].userId, bids[index].bidAddress);
    }

    function setThreshold(uint _threshold) public returns(uint) {
        threshold=_threshold;
        return threshold;
    }

    function getWinner() public returns(uint256,uint,uint,uint,address){
        uint minBidIndex = 9999;
        uint minBid = 9999;
        for (uint i=0; i<bids.length; i++) {
          if(bids[i].amount <= threshold){
              minBidIndex = i;
              minBid = bids[i].amount;
          }
        }
        if(minBidIndex != 9999){
            return (bids[minBidIndex].timestamp,bids[minBidIndex].projectId,
            bids[minBidIndex].amount,bids[minBidIndex].userId,bids[minBidIndex].bidAddress);
        }
        return (0,0,0,0,0);
    }

}