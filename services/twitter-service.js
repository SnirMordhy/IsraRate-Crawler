const Twitter = require('twitter');
const DBService = require('../repository/db.service');
const FeedEnum = require('../entities/enums/feedType.enum');
const Request = require('request');

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

    saveNewTweets(next) {
        let url = "https://api.twitter.com/1.1/search/tweets.json?q=israel&count=100";

        if (next)
        {
            url = url += next
        }

        this.client.get(url, function (error, tweets, response) {
            if (error) throw error;
            const selectedTweets = tweets.statuses;

            // save the tweets
            Request.post("http://localhost/api/feed/add", {
                json: selectedTweets
            }, (err, res, body) => {
                if(!res)
                {
                    console.error("No Response!");
                }
                else
                {
                    if (res.statusCode === 500) {
                        console.error(res.statusMessage);
                    }
                    else if (res.statusCode === 200) {
                        selectedTweets.forEach(tweet => console.info("tweet: " + tweet.id + " successfully saved"));
                    }
                    else
                    {
                        console.error("Error!");
                    }
                }
            });
        });
    }
}

module.exports = TweeterService;
