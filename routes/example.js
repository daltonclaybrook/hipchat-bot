var express = require('express');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var router = express.Router();

router.post('/', jsonParser, function(req, res) {

  //var name = req.body.item.message.from.mention_name;
  //res.send('Hey @' + name + ', I hope this works!');
  res.send(JSON.stringify(req.body));
});

module.exports = router;
