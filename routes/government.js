var express = require('express');
var fs = require('fs');
var Web3 = require('web3');

const router = express.Router();

const counterHeadAddress = '0x88ef17f5ba4d5681cf8a394f034e1539006d21a0';
const abi = [
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
        "constant": false,
        "inputs": [
            {
                "name": "_threshold",
                "type": "uint8"
            }
        ],
        "name": "setThreshold",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getThreshold",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

router.get('/getProjects', function (req, res) {
    fs.readFile('./assets/projects.json', 'utf8', function (err, data) {
        if (!err) {
            var projectsArr = JSON.parse(data);
            res.send({"error":false,"projects":projectsArr["projects"]});
        }
    });
});


router.post('/startBid', function (req, res) {
    var projectId = parseInt(req.body.project_id);
    var maxBid = parseInt(req.body.maxBid);
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var smartContract = web3.eth.contract(abi).at(counterHeadAddress);
    smartContract.setThreshold(maxBid);
    res.send('<!DOCTYPE html>\n' +
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
        '    <br><br><b id="head" style="font-size: 32px; color: #000;">Thanks Aditya, Bidding process has started successfully 👍</b>\n' +
        '    <br><br><br><br><br><br>\n' +
        '    <p style="font-size: 96px; color: #cacaca; width: 100%; text-align: center">⏳</p>\n' +
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