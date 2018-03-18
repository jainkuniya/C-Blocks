var express = require('express');
var fs = require('fs');
var Web3 = require('web3');

const router = express.Router();
const counterHeadAddress = '0x6e15842be020cdffedb547976821654db2697349';
const abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getWinner",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getBidsCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint8"
            }
        ],
        "name": "getBid",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "bids",
        "outputs": [
            {
                "name": "timestamp",
                "type": "uint8"
            },
            {
                "name": "projectId",
                "type": "uint8"
            },
            {
                "name": "amount",
                "type": "uint8"
            },
            {
                "name": "userId",
                "type": "uint8"
            },
            {
                "name": "bidAddress",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_timestamp",
                "type": "uint8"
            },
            {
                "name": "_projectId",
                "type": "uint8"
            },
            {
                "name": "_amount",
                "type": "uint8"
            },
            {
                "name": "_userId",
                "type": "uint8"
            },
            {
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "addBid",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_threshold",
                "type": "uint8"
            }
        ],
        "name": "setThreshold",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

router.get('/config', function (req, res) {
    fs.readFile('./assets/projects.json', 'utf8', function (err, data) {
        if (!err) {
            var projectsArr = JSON.parse(data);
            res.send({
                "error": false, "project": projectsArr["projects"][0], "user": {
                    "user_id": 1, "user_name": "Aditya"
                }
            });
        }
    });
});

router.get('/projects', function (req, res) {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var smartContract = web3.eth.contract(abi).at(counterHeadAddress);
    smartContract.getBidsCount(function (error, response) {
        console.log(error, response);
    });
});

router.post('/submitBid', function (req, res) {
    var projectId = parseInt(req.body.project_id);
    var userId = parseInt(req.body.user_id);
    var bid = parseInt(req.body.bid);
    console.log(bid);
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var smartContract = web3.eth.contract(abi).at(counterHeadAddress);
    smartContract.addBid(Date.now(),projectId,bid,userId,counterHeadAddress);
    res.send({"error": false});
});

module.exports = router;