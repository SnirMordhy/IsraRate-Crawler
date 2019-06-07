const Twitter = require('twitter');
const DBService = require('../repository/db.service');
const FeedEnum = require('../entities/enums/feedType.enum');
const Request  = require('request');

const twitterRequest = {
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    params: ['q=israel', 'count=100', 'result_type=recent', 'geo-tagged']
};

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
        this.client.get(this.getQuery(), function (error, tweets, response) {
            if (error) throw error;
            const selectedTweets = tweets.statuses;

            selectedTweets.forEach((tweet) => console.info(tweet));
        });
    }

    saveNewTweets() {
        this.client.get(this.getQuery(), function (error, tweets, response) {
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

    getQuery() {
        let query = twitterRequest.url + '?';
        twitterRequest.params.forEach(param => query+= param + '&');
        return query.slice(0, -1);
    }
}

module.exports = TweeterService;
