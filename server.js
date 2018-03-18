var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require("body-parser");

var contractorRouter = require('./routes/contractor');
var governmentRouter = require('./routes/government');

app.get('/', function (req, res) {
  res.send('Welcome to C-Blocks');
});

app.use(express.static(path.join(__dirname,'assets')));

app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/assets/makeBid.html');
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use("/contractor",contractorRouter);
app.use("/government",governmentRouter);

app.listen(3000, function () {
  console.log('Server is up and running on port 3000');
});

module.exports = app;