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
		if (command == 'start') {
			self.handleCreate(fullMessage, user, res);
		} else if (command == 'add') {
			self.handleAdd(fullMessage, user, res);
		} else if (command == 'vote') {
			self.handleVote(fullMessage, user, res);
		} else if (command == 'status') {
			self.handleStatus(fullMessage, user, res);
		} else {
	  	self.handleUnrecognized(fullMessage, user, res);
	  }

	},

	// Helpers

	handleCreate: function(fullMessage, user, res) {

		self.deleteLunches(function(err) {
			if (err) {
				res.serverError();
			} else {
				var msg = "The polls are now open!\n";
				msg += "\n\noptions:";
				msg += "\n/lunch add <location> - nominate a location";
				msg += "\n/lunch vote <location> - vote on a location";
				msg += "\n/lunch status - view the current poles";

				self.sendMessage(msg, res);
			}
		});

	},

	handleAdd: function(fullMessage, user, res) {

		// /lunch add <location>
		var components = fullMessage.split(' ');
		if (components.length < 3) {
			self.sendMessage("request must look like this: /lunch add <location>", res);
		} else {
			var subComponents = components.slice(2);
			var location = subComponents.join(' ');
			Lunch.create({
				location: location,
				creator: user
			})
			.exec(function(err, lunch) {
				if (err) {
					res.serverError();
				} else {
					self.sendMessage("Added \"" + lunch.location + "!\"", res);
				}
			});
		}

	},

	handleVote: function(fullMessage, user, res) {

		// /lunch vote <location>
		var components = fullMessage.split(' ');
		if (components.length < 3) {
			self.sendMessage("request must look like this: /lunch vote <location>", res);
		} else {
			var subComponents = components.slice(2);
			var location = subComponents.join(' ');
			Lunch.findOne({
				location: location
			})
			.exec(function(err, lunch) {
				if (err) {
					res.serverError();
				} else if (lunch) {

					var newVotes = lunch.votes + 1;
					Lunch.update({
						id: lunch.id
					}, {
						votes: newVotes
					})
					.exec(function(err, lunches) {
						if (err) {
							res.serverError();
						} else {
							self.sendMessage("Success!\n" + location + ": " + newVotes + " vote(s)", res);
						}
					});

				} else {
					self.sendMessage("Could not find a location with name: \"" + location + ".\" Do you need to add it?", res);
				}
			});
		}

	},

	handleStatus: function(fullMessage, user, res) {

		Lunch.find()
		.sort('votes desc')
		.exec(function(err, lunches) {
			if (err) {
				res.serverError();
			} else if (lunches.length <= 0) {
				self.sendMessage("There are no lunches being voted on. You should add one.", res);
			} else {
				var msg = "Current status:\n\n";
				var idx = 1;
				for (var key in lunches) {
					var lunch = lunches[key];
					var info = idx + ".) " + lunch.location + ": " + lunch.votes + " vote(s)\n";
					msg += info;
					idx++;
				}
				self.sendMessage(msg, res);
			}
		});

	},

	deleteLunches: function(done) {
		Lunch.destroy({}, function(err) {
			return done(err);
    });
	}

};
