var unirest = require('unirest');

unirest.get("https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=20&min=10")
.header("X-Mashape-Key", NUMBERS_KEY)
.header("Accept", "text/plain")
.end(function (result) {
  console.log(result.body);
});