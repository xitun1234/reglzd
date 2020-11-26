var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.controller');
const checkJWT = require('../middlewares/check-jwt');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const userModel = require('../models/UserModel');
const rrsModel = require('../models/RrsModel');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addAccount', async (req,res) =>{

  const idOwner = await userModel.findOne({username: req.body.owner});

  let newAccount = new accountModel();
  newAccount.account = req.body.account;
  newAccount.password = req.body.password;
  newAccount.phone = req.body.phone;
  newAccount.deviceName = req.body.deviceName;
  newAccount.owner = idOwner._id;
  newAccount.ipAddr = req.body.ipAddr;

  newAccount.save();

  res.json({
      success:true,
      data:newAccount
  });
});

router.post('/addUser', async(req,res) =>{
  let newUser = new userModel();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.fullname= req.body.fullname;

  newUser.save();

  res.json({
    success:true,
    data:newUser
  });
});

router.get('/test', async(req,res)=>{
  const user = await userModel.find();
  res.status(200).json({
    success:true,
    data:user
  });
});
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

router.get('/getfullname',async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  res.status(200).json({
    status: 'success',
    fullname: dataJson[randomIndex].full_name,
  });
});
router.get('/create',userController.createAccount);
router.post('/Login',userController.LoginUser);

router.get('/getRRS&deviceName=:deviceName', async(req,res) =>{
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isBackUp: false
  })

  if (rrsData){
    res.json({
      status:'success',
      data: rrsData
    })
  }
  else{
    res.json({
      status:'fail',
      data:null
    })
  }

})

router.post('/updateRRS', async(req,res)=>{

  const filter = {
    username: req.body.username
  };

  const update = {
    isBackUp: req.body.isBackUp,
    isRestore: req.body.isRestore,
    ipAddr: req.body.ipAddr
  };

  let resultUpdate = await rrsModel.findOneAndUpdate(filter,update);
  
  // let resultTest = await rrsModel.updateMany({deviceName:'May 2'},{isBackUp: false});


  res.status(200).json({
    success: true,
    data: resultUpdate
  });
});

module.exports = router;