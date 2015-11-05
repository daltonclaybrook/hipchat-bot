/**
* Lunch.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    location: {
      type: 'string',
      required: true
    },
    creator: {
      type: 'string',
      required: true
    },
    votes: {
      type: 'integer',
      defaultsTo: 0
    }

  }
};
