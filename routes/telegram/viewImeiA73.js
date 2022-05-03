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

    const stringA73 = "SM-A736"
    const listImeiA73 = await imeiGiftModel.find({model: {$regex: stringA73, $options: 'i'}}).exec((err, result)=>{
        
        res.render('telegram/viewImeiA73',{
            userData:req.user,
            TelegramSlideBarActive: true,
            title:"All List Imei",
            ViewImeiA73SubMenuAccountActive: true,
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

    
    const stringA73 = "SM-A736"
    const listImeiA73 = await imeiGiftModel.find({model: {$regex: stringA73, $options: 'i'}}).exec();
    console.log(listImeiA73)
    var macs = [];
    macs.push(["IMEI","Ngày Kích Hoạt", "Model",]);
    for (var i = 0; i < listImeiA73.length; i++) {
      macs.push([listImeiA73[i].imei, listImeiA73[i].ngayKichHoat,listImeiA73[i].model]);
    }
  
    var datas = xlsx.build([
      { name: "Excel", data: macs }
    ]);
  
  
    var time = moment().format('YYYYMMDDHHMMSS');
    var file_path = '/download/' +"imeiA73_" +time + '.xlsx';
    var write_path = './public' + file_path;
    var download_path = './download/' + time + '.xlsx';
    console.log(write_path);
    fs.writeFileSync(write_path, datas, {  });

    res.status(200).json({ ret_code: 0, success: true, file_path });
  });


module.exports = router;