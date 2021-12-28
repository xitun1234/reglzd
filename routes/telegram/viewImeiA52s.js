var express = require('express');
const router = express.Router();
const telegramModel = require('../../models/TelegramModel');
const utilsHelper = require('../../utils/UtilsHelper');
const imeiGiftModel = require('../../models/ImeiGiftModel');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req,res){
    const filter = {
        ...req.query
    }

    const stringA52s = "SM-A52"
    const listImeiA52s = await imeiGiftModel.find({model: {$regex: stringA52s, $options: 'i'}}).exec((err, result)=>{
        console.log(result)
        res.render('telegram/viewImeiA52s',{
            userData:req.user,
            TelegramSlideBarActive: true,
            title:"All List Imei",
            ViewImeiA52sSubMenuAccountActive: true,
            listAccount: result,
            form:{
                limit: req.query.limit || 100
            }
        });
    });
});


module.exports = router;