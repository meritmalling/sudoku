var unirest = require('unirest');
var key = process.env.NUMBERS_KEY;
console.log('numberskey', key)

unirest.get("https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=20&min=10")
.header("X-Mashape-Key", key.toString())
.header("Accept", "text/plain")
.end(function (result) {
  console.log(result.body);
});