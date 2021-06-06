var express = require('express');
const router = express.Router();
const lzdFBTempModel = require('../../models/LzdFbModelTemp');
const deviceModel = require('../../models/DeviceModel');
router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = 'anonymous';
  }
  next();
});

router.get('/', async function (req, res) {
  const dataReg = await lzdFBTempModel
    .find({status: 'true'})
    .exec((err, result) => {
      
      res.render('lazada/datareg', {
        userData: req.user,
        LazadaSlideBarActive: true,
        lazadaSubMenuAccountActive: true,
        listAccount: result,
      });
    });
});

module.exports = router;
