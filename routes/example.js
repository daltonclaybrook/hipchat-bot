var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

  //var name = req.body.item.message.from.mention_name;
  //res.send('Hey @' + name + ', I hope this works!');
  res.send(JSON.stringify(req.body));
});

module.exports = router;