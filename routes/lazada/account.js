var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const deviceModel = require('../../models/DeviceModel');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    const accounts = await accountModel.find().exec((err,result)=>{
        
        res.render('lazada/account',{
            userData:req.user,
            LazadaSlideBarActive:true,
            lazadaSubMenuAccountActive:true,
            listAccount : result
        });
    });

    
});



module.exports = router;