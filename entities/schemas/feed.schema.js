const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Feed = new Schema({
    id: String,
    user_id: Number,
    created_at: Date,
    text: String,
    place: String,
    geo: String,
    likes: Number,
    comments: Number
});

module.exports = Feed;