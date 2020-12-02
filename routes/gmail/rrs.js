var express = require('express');
const router = express.Router();
const rrsModel = require('../../models/RrsModel');
const gmailModel = require('../../models/GmailModel');

router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    const filter ={
        ...req.query
    };
    const devicesName = await gmailModel.distinct('deviceName');

    if (filter.deviceID == "all")
    {
        gmailData = await gmailModel.find();
    }
    else{
        gmailData = await gmailModel.find({deviceName: filter.deviceID});
    }

    res.render('gmail/rrs',{
        active:{
            CreateRRS: true
        },
        GmailSlideBarActive:true,
        userData: req.user,
        listDevice: devicesName
    });
    
});

router.get('/view', async (req,res) =>{
    const filter ={
        ...req.query
    };
    const devicesName = await gmailModel.distinct('deviceName');

    if (filter.deviceID == "all")
    {
        gmailData = await gmailModel.find();
    }
    else{
        gmailData = await gmailModel.find({deviceName: filter.deviceID});
    }
    
    res.render('gmail/viewrrs',{
        userData: req.user,
        active:{
            ViewRRS:true
        },
        GmailSlideBarActive:true,
        listRRS: rrsData,
        listDevice: devicesName
    });

});

router.post('/addData', async(req,res) =>{
    let newRrs = new rrsModel();
    
    newRrs.username = req.body.username;
    newRrs.password = req.body.password;
    newRrs.addressName = req.body.addressName;
    newRrs.deviceName = req.body.deviceName;
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
    const result = await rrsModel.deleteMany();
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