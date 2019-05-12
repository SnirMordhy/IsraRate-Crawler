const _ = require('lodash');
var express = require('express');
var router = express.Router();
var TweeterService = require('../services/twitter-service');
var tweeterService = new TweeterService();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/lookup/:user_id', (req, res, next) => {
  // res.send(tweeterService.user_lookup(req.params.user_id));
  let randomUsers = ["avi", "bibi", "clara", "dani", "eitan"];

  res.send(randomUsers[_.random(0, randomUsers.length - 1)]);
});

module.exports = router;
