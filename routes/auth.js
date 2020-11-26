var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.controller');
const checkJWT = require('../middlewares/check-jwt');
const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const passport = require('passport');

/* GET users listing. */

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  function(req, res) {
    
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});
module.exports = router;
