var unirest = require('unirest');

console.log('numberskey',process.env.NUMBERS_KEY)
// unirest.get("https://numbersapi.p.mashape.com/random/trivia?fragment=true&json=true&max=20&min=10")
// .header("X-Mashape-Key", process.env.NUMBERS_KEY.toString())
// .header("Accept", "text/plain")
// .end(function (result) {
//   console.log(result.body);
// });