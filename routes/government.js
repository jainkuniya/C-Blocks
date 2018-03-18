var express = require('express');
var fs = require('fs');
var Web3 = require('web3');

const router = express.Router();

const counterHeadAddress = '0xbde9d20990af6c30d4627d673dd28e4a44d0e371';
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


router.get('/results',function (req, res) {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var smartContract = web3.eth.contract(abi).at(counterHeadAddress);
    smartContract.getWinner(function (err,result) {
        if(!err){
            var projectId = result[1]+"";
            var amount = result[2]+"";
            var userId = result[3]+"";
            fs.readFile('./assets/projects.json', 'utf8', function (err, data) {
                if (!err) {
                    var projectsArr = JSON.parse(data)["projects"];
                    var project = projectsArr.find(function (p) {
                        var tempId =  p.project_id + "";
                        return tempId === projectId;
                    });
                    fs.readFile('./assets/users.json', 'utf8', function (err, data) {
                        if (!err) {
                            var usersArr = JSON.parse(data)["users"];
                            var user = usersArr.find(function (u) {
                                var tempId =  u.user_id + "";
                                return tempId === userId;
                            });
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
                                '    <p style="font-size: 22px; color: #cacaca;">Bidding is completed successfully for 🗃</p>\n' +
                                '    <b id="head" style="font-size: 32px; color: #000;">'+project.project_title+'</b>\n' +
                                '    <br><br>\n' +
                                '    <p style="font-size: 22px; color: #cacaca;">Allotted to 🏆</p>\n' +
                                '    <b id="hash" style="font-size: 32px; color: #000;">'+user.user_name+'</b>\n' +
                                '    <br><br>\n' +
                                '    <p style="font-size: 22px; color: #cacaca;">With amount 💵</p>\n' +
                                '    <b id="time" style="font-size: 32px; color: #000;">₹ '+ amount +'</b>\n' +
                                '    <br><br>\n' +
                                '    <p style="font-size: 22px; color: #cacaca;">On 🕰</p>\n' +
                                '    <b id="amount" style="font-size: 32px; color: #000;">'+new Date().toUTCString()+'</b>\n' +
                                '</div>\n' +
                                '\n' +
                                '</body>\n' +
                                '</html>\n');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;