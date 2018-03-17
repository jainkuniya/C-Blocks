var express = require('express');
var fs = require('fs');

const router = express.Router();

router.get('/projects', function(req, res){
    fs.readFile('./assets/projects.json','utf8', function (err, jsonArray) {
        if(!err){
            console.log(jsonArray);
        }
    });
    res.sendFile('/Users/zomadmin/Desktop/C-Blocks/assets/projects.html');
});

module.exports = router;