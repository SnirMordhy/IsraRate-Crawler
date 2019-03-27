var express = require('express');
var router = express.Router();


/* 
    GetRawData
    Params    
    - Count: how much data to get (1000)

    Response
    - JSON with data
    */
router.get('/GetRawData/:count', function (req, res, next) {
    twitterService = new twitterService();
    
});

module.exports = router;
