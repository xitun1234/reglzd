var express = require('express');
const router = express.Router();
const telegramModel = require('../../models/TelegramModel');
const utilsHelper = require('../../utils/UtilsHelper');
const imeiGiftModel = require('../../models/ImeiGiftModel');
const xlsx = require('node-xlsx');
const moment = require('moment');
const fs = require("fs");
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req,res){
    const filter = {
        ...req.query
    }

    const stringA53 = "SM-A536"
    const listImeiA53 = await imeiGiftModel.find({model: {$regex: stringA53, $options: 'i'}}).exec((err, result)=>{
        
    res.render('telegram/viewImeiA53',{
            userData:req.user,
            TelegramSlideBarActive: true,
            title:"All List Imei",
            ViewImeiA53SubMenuAccountActive: true,
            listAccount: result,
            form:{
                limit: req.query.limit || 100
            }
        });
    });
});



router.post('/export', async (req, res, next) => {
    const d = new Date();
    const today = d.getDate();
    const currentMonth = d.getMonth() + 1; 
    const formartDate = today.toString() + currentMonth.toString() + d.getSeconds();

    
    const stringA53 = "SM-A536"
    const listImeiA53 = await imeiGiftModel.find({model: {$regex: stringA53, $options: 'i'}}).exec();
    console.log(listImeiA53)
    var macs = [];
    macs.push(["IMEI","Ngày Kích Hoạt", "Model",]);
    for (var i = 0; i < listImeiA53.length; i++) {
      macs.push([listImeiA53[i].imei, listImeiA53[i].ngayKichHoat,listImeiA53[i].model]);
    }
  
    var datas = xlsx.build([
      { name: "Excel", data: macs }
    ]);
  
  
    var time = moment().format('YYYYMMDDHHMMSS');
    var file_path = '/download/' +"imeiA53_" +time + '.xlsx';
    var write_path = './public' + file_path;
    var download_path = './download/' + time + '.xlsx';
    console.log(write_path);
    fs.writeFileSync(write_path, datas, {  });

    res.status(200).json({ ret_code: 0, success: true, file_path });
  });


module.exports = router;