const enumValue = (name) => Object.freeze({toString: () => name});

const FeedType = Object.freeze({
    TWITTER: enumValue("Twitter"),
    FACEBOOK: enumValue("Facebook"),
    REDDIT: enumValue("Reddit")
});

module.exports = FeedType;