var express = require('express');
var fs = require('fs');

const router = express.Router();

router.get('/getProjects', function (req, res) {
    fs.readFile('./assets/projects.json', 'utf8', function (err, data) {
        if (!err) {
            var projectsArr = JSON.parse(data);
            res.send({"error":false,"projects":projectsArr["projects"]});
        }
    });
});

router.post('/startBid', function (req, res) {
    var projectId = req.body.project_id;
    if(projectId.length() < 1){
        res.send({"message":"Please enter valid Project number","error":true})
    }
});

module.exports = router;