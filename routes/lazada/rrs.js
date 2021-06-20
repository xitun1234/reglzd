var express = require('express');
const router = express.Router();
const rrsModel = require('../../models/RrsModel');
const khoDuLieuModel = require("../../models/KhoDuLieuModel");
const xlsx = require('node-xlsx');
const fs = require("fs");
const moment = require('moment');

router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    const filter ={
        ...req.query
    };
    const devicesName = await rrsModel.distinct('deviceName');

    if (filter.deviceID == "all")
    {
        rrsData = await rrsModel.find();
    }
    else{
        rrsData = await rrsModel.find({deviceName: filter.deviceID});
    }

    res.render('lazada/rrs',{
        active:{
            CreateRRS: true
        },
        LazadaSlideBarActive:true,
        userData: req.user,
        listDevice: devicesName
    });
    
});

router.get('/view', async (req,res) =>{
    rrsData = await khoDuLieuModel.find({owner: req.owner});

    
    
    res.render('lazada/viewrrs',{
        userData: req.user,
        active:{
            ViewRRS:true
        },
        LazadaSlideBarActive:true,
        listRRS: rrsData,
      
    });

});

router.post('/export', async (req, res, next) => {
    const d = new Date();
    const today = d.getDate();
    const currentMonth = d.getMonth() + 1; 

  
    const dataReg = await khoDuLieuModel.find({owner: req.owner}).exec();
    var macs = [];
    macs.push(["Username","Password", "Is Get", "Trạng Thái","Người Tạo", "Thời Gian Tạo"]);
    for (var i = 0; i < dataReg.length; i++) {
      macs.push([dataReg[i].username, dataReg[i].password,dataReg[i].isGet,dataReg[i].status,dataReg[i].owner,dataReg[i].created]);
    }
  
    var datas = xlsx.build([
      { name: "Excel", data: macs }
    ]);
  
  
    var time = moment().format('YYYYMMDDHHMMSS');
      var file_path = '/download/' +"khoDuLieu_" +time + '.xlsx';
      var write_path = './public' + file_path;
      
      console.log(write_path);
      fs.writeFileSync(write_path, datas, {  });
  
      res.status(200).json({ ret_code: 0, success: true, file_path });
  });

router.post('/addData', async(req,res) =>{
    let newRrs = new rrsModel();
    
    newRrs.username = req.body.username;
    newRrs.password = req.body.password;
    newRrs.addressName = req.body.addressName;
    newRrs.deviceName = req.body.deviceName;
    newRrs.fullname = req.body.fullname;
    newRrs.linkProduct = req.body.linkProduct;
    newRrs.phoneNumber = req.body.phoneNumber;
    newRrs.isRestore = req.body.isRestore;
    newRrs.isBackUp = req.body.isBackUp;
    newRrs.rrsName = req.body.rrsName;
    newRrs.ipAddr = "";

    newRrs.save().then(result =>{
        res.status(200).json({
            success: true,
            data: result,
            msg: 'Thêm dữ liệu acc ' +newRrs.username + ' vào ' + newRrs.deviceName + ' thành công'
        });
    });
    
});

router.post('/deleteData', async(req,res)=>{
    const result = await khoDuLieuModel.deleteMany({owner: req.owner});
    console.log(result);

    res.status(200).json({
        success:true,
        msg:'Da xoa toan bo du lieu',
        data:result
    });
});

router.post('/deleteDataByDevice', async(req,res) =>{
  
    const deviceName = req.body.deviceName;
    const result = await rrsModel.deleteMany({deviceName:deviceName});

    res.status(200).json({
        success:true,
        msg:'Đã xóa toàn bộ dữ liệu của ' +deviceName,
        data:result
    });

});

router.post('/statusRestore', async(req,res) =>{
    const deviceName = req.body.deviceName;

    if (deviceName == "all")
    {
      resultTest = await rrsModel.updateMany({isRestore: false});
    }
    else{
      resultTest = await rrsModel.updateMany({deviceName:deviceName},{isRestore: false});
    }
    res.status(200).json({
      success:true,
      data:resultTest,
      msg:'Cập nhật trạng thái cho ' +deviceName+' thành công'
    });
});

router.post('/updateLink', async(req,res) =>{
    const deviceName = req.body.deviceName;
    const linkProduct = req.body.linkProduct;

    if (deviceName == "all")
    {
      resultTest = await rrsModel.updateMany({linkProduct: linkProduct});
    }
    else{
      resultTest = await rrsModel.updateMany({deviceName:deviceName},{linkProduct: linkProduct});
    }
    res.status(200).json({
      success:true,
      data:resultTest,
      msg:'Cập nhật link sản phẩm cho ' +deviceName+' thành công'
    });
});

module.exports = router;