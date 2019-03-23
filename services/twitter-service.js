const Twitter = require('twitter');
const DBService = require('../repository/db.service');
const FeedEnum = require('../entities/enums/feedType.enum');

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
            const selectedTweets = tweets.statuses;

            selectedTweets.forEach((tweet) => console.info(tweet));
        });
    }

    saveNewTweets() {
        this.client.get('https://api.twitter.com/1.1/search/tweets.json?q=israel', function (error, tweets, response) {
            if (error) throw error;
            const selectedTweets = tweets.statuses;

            const dbService = new DBService();
            dbService.saveNewFeed(FeedEnum.TWITTER, selectedTweets);
        });
    }
}

module.exports = TweeterService;