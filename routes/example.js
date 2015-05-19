var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

  console.log(req.body);
  var fullMessage = req.body.item.message.message;
  var user = req.body.item.message.from.mention_name;
  var components = fullMessage.split(' ');

  if ((components.length < 1) || (components[0] != '/example')) {
    console.log('invalid command');
    res.send();
    return;
  }

  var command = (components.length >= 2) ? components[1] : '';
  if (command == 'cat') {
    handleCatPic(fullMessage, user, res);
  } else if (command == 'test') {
    handleTest(fullMessage, user, res);
  } else {
    handleUnrecognized(fullMessage, user, res);
  }
});

function handleCatPic(message, user, res) {
  sendMessage('http://lorempixel.com/400/300/cats/');
}

function handleTest(message, user, res) {
  sendMessage('Alright, @' + user + '. This is a test...');
}

function handleUnrecognized(message, user, res) {
  sendMessage('Sorry. I don\'t understand your command.');
}

function sendMessage(msg, res) {
  res.send({
    message: msg,
    notify: false,
    message_format: 'text'
  });
}

module.exports = router;
