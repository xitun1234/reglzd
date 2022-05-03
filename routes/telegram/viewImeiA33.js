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

    const stringA33 = "SM-A336"
    const listImeiA33 = await imeiGiftModel.find({model: {$regex: stringA33, $options: 'i'}}).exec((err, result)=>{
        
        res.render('telegram/viewImeiA33',{
            userData:req.user,
            TelegramSlideBarActive: true,
            title:"All List Imei",
            ViewImeiA33SubMenuAccountActive: true,
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

    
    const stringA33 = "SM-A336"
    const listImeiA33 = await imeiGiftModel.find({model: {$regex: stringA33, $options: 'i'}}).exec();
    console.log(listImeiA33)
    var macs = [];
    macs.push(["IMEI","Ngày Kích Hoạt", "Model",]);
    for (var i = 0; i < listImeiA33.length; i++) {
      macs.push([listImeiA33[i].imei, listImeiA33[i].ngayKichHoat,listImeiA33[i].model]);
    }
  
    var datas = xlsx.build([
      { name: "Excel", data: macs }
    ]);
  
  
    var time = moment().format('YYYYMMDDHHMMSS');
    var file_path = '/download/' +"imeiA33_" +time + '.xlsx';
    var write_path = './public' + file_path;
    var download_path = './download/' + time + '.xlsx';
    console.log(write_path);
    fs.writeFileSync(write_path, datas, {  });

    res.status(200).json({ ret_code: 0, success: true, file_path });
  });


module.exports = router;