var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const deviceModel = require('../../models/DeviceModel');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    res.render('lazada/upload',{
        userData:req.user,
        UploadSlideBarActive:true,
        lazadaSubMenuUploadActive:true,
      
    });

    
});



module.exports = router;