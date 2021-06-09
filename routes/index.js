var express = require('express');
var router = express.Router();
var connectEnsureLogin = require('connect-ensure-login')
const deviceModel = require('../models/DeviceModel');

/* GET home page. */
router.get('/', function(req, res, next) {
    
  res.render('index', { title: 'Express',userData: req.user,dashboardSlideBarActive:true });
});

module.exports = router;
