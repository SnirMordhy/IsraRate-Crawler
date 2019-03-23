const mongoose = require('mongoose');
const FeedSchema = require('../schemas/feed.schema');

const FeedModel = mongoose.model('Feed', FeedSchema);

module.exports = FeedModel;