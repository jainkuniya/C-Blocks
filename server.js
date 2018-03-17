var express = require('express');
var app = express();

var contractorRouter = require('./routes/contractor');
app.get('/', function (req, res) {
  res.send('Welcome to C-Blocks');
});
app.use("/contractor",contractorRouter);

app.listen(3000, function () {
  console.log('Server is up and running on port 3000');
});

module.exports = app;
