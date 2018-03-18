var express = require('express');
var fs = require('fs');
var Web3 = require('web3');
var index = 0;

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
    index++;
    index = index % 5;
    fs.readFile('./assets/projects.json', 'utf8', function (err, projectData) {
        if (!err) {
            fs.readFile('./assets/users.json', 'utf8', function (err, userData) {
                if (!err) {
                    var usersArr = JSON.parse(userData);
                    var projectsArr = JSON.parse(projectData);
                    console.log(usersArr["users"][index]);
                    res.send({
                        "error": false, "project": projectsArr["projects"][0], "user":usersArr["users"][index]
                    });
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
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var smartContract = web3.eth.contract(abi).at(counterHeadAddress);
    var txHash = smartContract.addBid(Date.now(),projectId,bid,userId,counterHeadAddress);
    res.send('\n' +
        '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
        '    <title>C-Blocks</title>\n' +
        '\n' +
        '    <link rel="stylesheet" type="text/css" href="../css/main.css">\n' +
        '\n' +
        '    <script src="jquery/sc1.js"></script>\n' +
        '    <script src="jquery/sc2.js"></script>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div class="container">\n' +
        '\n' +
        '    <b id="head" style="font-size: 32px; color: #000;">Bid placed successfully 👍</b>\n' +
        '    <br><br>\n' +
        '    <p style="font-size: 22px; color: #cacaca;">Hash Id</p>\n' +
        '    <b id="hash" style="font-size: 32px; color: #000;">'+txHash+'</b>\n' +
        '    <br><br>\n' +
        '    <p style="font-size: 22px; color: #cacaca;">Time</p>\n' +
        '    <b id="time" style="font-size: 32px; color: #000;">'+new Date().toUTCString()+'</b>\n' +
        '    <br><br>\n' +
        '    <p style="font-size: 22px; color: #cacaca;">Bid Amount</p>\n' +
        '    <b id="amount" style="font-size: 32px; color: #000;">₹ '+bid+'</b><br><br><br><br><br><br>\n' +
        '    <p style="font-size: 22px; color: #cacaca; width: 100%; text-align: center">We\'ll notify you once the bidding is complete</p>\n' +
        '</div>\n' +
        '\n' +
        '</body>\n' +
        '</html>\n');

    fs.readFile('./assets/projects.json', 'utf8', function (err, data) {
        if (!err) {
            var projectsArr = JSON.parse(data)["projects"];
            var project = projectsArr.find(function (p) {
                return p.project_id === projectId;
            });

        }
    });
});

module.exports = router;