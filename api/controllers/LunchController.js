/**
 * LunchController
 *
 * @description :: Server-side logic for managing lunches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var self = module.exports = {

	// POST /lunch
	create: function(req, res) {

		sails.log.verbose(req.body);
	  var fullMessage = req.body.item.message.message;
	  var user = req.body.item.message.from.mention_name;
	  var components = fullMessage.split(' ');

	  if ((components.length < 1) || (components[0] != '/lunch')) {
	    sails.log.verbose('invalid command');
	    res.badRequest();
	    return;
	  }

	  var command = (components.length >= 2) ? components[1] : '';
	  if (command == 'cat') {
	    self.handleCatPic(fullMessage, user, res);
	  } else if (command == 'test') {
	    self.handleTest(fullMessage, user, res);
	  } else {
	    self.handleUnrecognized(fullMessage, user, res);
	  }

	},

	// Helpers

	handleCatPic: function(message, user, res) {
	  res.ok({
	    message: '<img src="http://lorempixel.com/400/300/cats/">',
	    notify: false,
	    message_format: 'html'
	  });
	},

	handleTest: function(message, user, res) {
	  self.sendMessage('Alright, @' + user + '. This is a test...', res);
	},

	handleUnrecognized: function(message, user, res) {
	  self.sendMessage('Sorry. I don\'t understand your command.', res);
	},

	sendMessage: function(msg, res) {
		res.ok({
	    message: msg,
	    notify: false,
	    message_format: 'text'
	  });
	}

};
