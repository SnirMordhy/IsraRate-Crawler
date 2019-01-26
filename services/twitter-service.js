var Twitter = require('twitter');

class TweeterService {
    constructor() {
        this.initConnection();
    };

    initConnection() {
        this.client = new Twitter({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token_key: process.env.ACCESS_TOKEN_KEY,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET
        });
    }

    getTweets() {
        this.client.get('https://api.twitter.com/1.1/search/tweets.json?q=israel', function (error, tweets, response) {
            if (error) throw error;
            var tweets = tweets.statuses;

            console.info(tweets);
        });
    }
}

module.exports = TweeterService;