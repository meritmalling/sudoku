/**
* FactController
*
* @description :: Server-side logic for managing facts
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

var unirest = require('unirest');
var key = process.env.NUMBERS_KEY;

module.exports = {

        getfacts: function(req, res){

                unirest.get("https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=20&min=10")
                .header("X-Mashape-Key", key.toString())
                .header("Accept", "text/plain")
                .end(function (result) {
                        res.send(result.body);
                });
        }

};

