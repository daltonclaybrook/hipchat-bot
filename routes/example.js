var express = require('express');
var router = express.Router();

//var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

router.post('/', function(req, res) {

  var name = req.body.item.message.from.mention_name;
  var msg = 'Hey @' + name + ', I hope this works!';

  console.log(req.body);
  res.send({
    message: msg,
    notify: false,
    message_format: 'text'
  });
});

module.exports = router;
