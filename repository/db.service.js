const mongoose = require('mongoose');
const FeedSchema = require('../entities/schemas/feed.schema');
const FeedModel = require('../entities/models/feed.model');
const FeedTypeEnum = require('../entities/enums/feedType.enum');
const DB_URI = 'mongodb://localhost/test';

 class DBService {
    constructor() {
        mongoose.connect(DB_URI, { useNewUrlParser: true});
    };

    saveNewFeed(feedType, feeds) {
        switch (feedType) {
            case FeedTypeEnum.TWITTER:
                this.saveTweeterFeed(feeds);
                break;
            default:
                console.warn('not supported feed type');
        }
    }

    saveTweeterFeed(feeds) {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('connected to local DB... ');

            feeds.forEach((feed) => {
                var tweet = new FeedModel({id: feed.id, user_id: feed.user.id, created_at: feed.created_at, text: feed.text, place: feed.place,
                    geo: feed.geo, likes: feed.favorite_count, comments: feed.retweet_count});

                tweet.save(function (err) {
                    if (err) console.error('error occur while trying to save tweet: \n' + err);
                    else console.info('tweet: ' + tweet.id + 'saved successfully');
                });
            });
        });
    }

    getSavedTweets() {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            FeedModel.find().exec(function (err, feeds) {
                feeds.forEach((feed) => console.info(feed));
            })
        });
    }
}

module.exports = DBService;