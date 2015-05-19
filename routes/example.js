var express = require('express');
var router = express.Router();

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

router.post('/', function(req, res) {

  //var name = req.body.item.message.from.mention_name;
  //res.send('Hey @' + name + ', I hope this works!');
  console.log(req.body);
  res.send(JSON.stringify(req.body));
});

module.exports = router;
