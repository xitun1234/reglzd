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

    res.render('telegram/viewImei',{
        userData:req.user,
        TelegramSlideBarActive: true,
        title:"All List Imei",
        ViewImeiSubMenuAccountActive: true,

    });
});

router.post('/test', async (req, res, next) => {
    console.log('asd')
    const stringA53 = "SM-A536"
    const listImeiA53 = await imeiGiftModel.find({model: {$regex: stringA53, $options: 'i'}}).exec((err, result)=>{
    
    res.render('telegram/viewImei',{
            userData:req.user,
            TelegramSlideBarActive: true,
            title:"All List Imei",
            ViewImeiSubMenuAccountActive: true,
            listAccount: result,
            form:{
                limit: req.query.limit || 100
            }
        });
    });
});


module.exports = router;