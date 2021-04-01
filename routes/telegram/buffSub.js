var express = require('express');
const router = express.Router();
const linkSubModel = require('../../models/LinkSubModel');

router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = 'anonymous';
  }
  next();
});

router.get('/', async function(req, res) {
  res.render('telegram/buffsub', {
    userData: req.user,
    buffSublideBarActive: true,
    buffSubSubMenuAccountActive: true,
    //
  });
});

module.exports = router;
