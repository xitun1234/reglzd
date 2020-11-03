var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const deviceModel = require('../../models/DeviceModel');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    console.log(req.user);
    const accounts = await accountModel.find({owner:req.user.id}).populate({path:'owner'}).populate('device','deviceName').exec((err,result)=>{
        console.log(result);

        res.render('lazada/account',{
            userData:req.user,
            LazadaSlideBarActive:true,
            lazadaSubMenuAccountActive:true,
            listAccount : result
        });
    });
    
});



module.exports = router;