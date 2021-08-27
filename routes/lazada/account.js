var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const deviceModel = require('../../models/DeviceModel');
const xlsx = require('node-xlsx');
const fs = require("fs");
const moment = require('moment');
router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    const accounts = await accountModel.find({owner: req.owner}).exec((err,result)=>{
        
        res.render('lazada/account',{
            userData:req.user,
            title:"Tài Khoản LZD - Gmail",
            LazadaSlideBarActive:true,
            lazadaSubMenuAccountActive:true,
            listAccount : result
        });
    });

    
});

router.post('/export', async (req, res, next) => {
    const d = new Date();
    const today = d.getDate();
    const currentMonth = d.getMonth() + 1; 
    const formartDate = today.toString() + currentMonth.toString() + d.getSeconds();

  
    const dataReg = await accountModel.find({status: 'true',owner: req.owner}).exec();
    var macs = [];
    macs.push(["Username","Password LZD", "Password Gmail", "Password FB","Số Điện Thoại", "Thiết Bị Tạo", "Người Tạo", "Trạng Thái", "Thời Gian Tạo"]);
    for (var i = 0; i < dataReg.length; i++) {
      macs.push([dataReg[i].username, dataReg[i].passwordLZD,dataReg[i].passwordGmail,dataReg[i].phoneNumber,dataReg[i].deviceName,dataReg[i].owner,dataReg[i].status,dataReg[i].created]);
    }
  
    var datas = xlsx.build([
      { name: "Excel", data: macs }
    ]);
  
  
    var time = moment().format('YYYYMMDDHHMMSS');
      var file_path = '/download/' +"lzdGmail_" +time + '.xlsx';
      var write_path = './public' + file_path;
      var download_path = './download/' + time + '.xlsx';
      console.log(write_path);
      fs.writeFileSync(write_path, datas, {  });
  
      res.status(200).json({ ret_code: 0, success: true, file_path });
  });
  



module.exports = router;