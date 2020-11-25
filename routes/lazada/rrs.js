var express = require('express');
const router = express.Router();
const rrsModel = require('../../models/RrsModel');

router.use((req, res, next) => {
    if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
    next();
  });

router.get('/', async function(req, res) {
    res.render('lazada/rrs',{
        active:{
            CreateRRS: true
        },
        LazadaSlideBarActive:true,
        userData: req.user,
    });
    
});

router.get('/view', async (req,res) =>{
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
    
    res.render('lazada/viewrrs',{
        userData: req.user,
        active:{
            ViewRRS:true
        },
        LazadaSlideBarActive:true,
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

module.exports = router;