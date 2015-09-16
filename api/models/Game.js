/**
* Game.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
        name:{
            type: 'string',
            required: true
        },

        solution:{
                type: 'array',
                required: true
        },

        starter:{
                type: 'array',
                required: true
        },

        playersboard:{
                type: 'array',
                required: true
        },

        //Association
        players: {
                collection: 'User',
                via: 'games'
        }

  }
};

