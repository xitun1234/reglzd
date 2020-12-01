var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const gmailModel = require('../../models/GmailModel');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    const accounts = await gmailModel.find().exec((err,result)=>{
        
        res.render('gmail/account',{
            userData:req.user,
            GmailSlideBarActive:true,
            gmailSubMenuAccountActive:true,
            listAccount : result
        });
    });

    
});



module.exports = router;