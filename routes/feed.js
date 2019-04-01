const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const FeedModel = require('../entities/models/feed.model');
const DB_URI = 'mongodb://localhost/test';

const router = express.Router();


router.get('/ScoreRange', function (req, res, next) {
    let fromDate = req.query.fromDate;
    let toDate   = req.query.toDate;
    
    if (fromDate) {
        fromDate = Date.parse(fromDate);
        if (toDate) {
            toDate = Date.parse(toDate);
        } else {
            toDate = Date.now();
            console.log(toDate);
        }
    }

    if (isNaN(fromDate) || isNaN(toDate)) {
        res.sendStatus(400);
    } else {
        mongoose.connect(DB_URI, { useNewUrlParser: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            FeedModel.find({created_at: {$gte: fromDate, $lte: toDate}}).exec(function (err, docs) {
                if (err) console.error('error occur while trying to find feed: \n' + err);
                let feeds = docs.map(feed => feed._doc);
                let daysScore = [];
                feeds.forEach(feed => {
                    //TODO: change to real score field when created
                    daysScore.push({date: getStringFullYear(feed.created_at), score: 1});
                });

                // create scores array of dates with their scored data
                var scoredDateArray = _(daysScore).groupBy('date')
                    .map((objs, key) => ({'date': key, 'score': _.sumBy(objs, 'score') }))
                    .value();

                res.json(scoredDateArray);
            });
        });
    }
});

function getStringFullYear(date) {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

module.exports = router;