var express = require('express');
const router = express.Router();
const imeiGiftModel = require('../../models/ImeiGiftModel');

router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = 'anonymous';
  }
  next();
});

router.get('/', async function(req, res) {
  res.render('telegram/checkImei', {
    userData: req.user,
    TelegramSlideBarActive: true,
    title:"Check Imei",
    CheckImeiSubMenuAccountActive: true,
    //
  });
});

module.exports = router;
