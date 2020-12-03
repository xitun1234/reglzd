var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.controller');
const checkJWT = require('../middlewares/check-jwt');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const userModel = require('../models/UserModel');
const rrsModel = require('../models/RrsModel');
const gmailModel = require('../models/GmailModel');
const utilsHelper = require('../utils/UtilsHelper');
const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addAccount', async (req, res) => {



  let newAccount = new accountModel();
  newAccount.username = req.body.username;
  newAccount.password = req.body.password;
  newAccount.phone = req.body.phone;
  newAccount.deviceName = req.body.deviceName;
  newAccount.gmail = req.body.gmail;
  newAccount.fullname = req.body.fullname;
  newAccount.first_name = req.body.first_name;
  newAccount.last_name_group = req.body.last_name_group;
  newAccount.status = req.body.status;
  newAccount.ipAddr = req.body.ipAddr;

  newAccount.save();

  res.json({
    success: true,
    data: newAccount
  });
});

router.post('/addUser', async (req, res) => {
  let newUser = new userModel();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.fullname = req.body.fullname;

  newUser.save();

  res.json({
    success: true,
    data: newUser
  });
});

router.get('/test', async (req, res) => {
  const filter = {
    ...req.body
  }
  const pathExcel = `download/acc_gmail_${Date.now()}.xlsx`;
  const dataExcel = [];

  const accountGmail = await gmailModel.find().limit(5).exec((err, result) => {
    result.forEach((rowExcel) => {
      
      const dataExtract = {
        'Gmail': rowExcel.gmail+"@gmail.com",
        'Mật khẩu': rowExcel.password,
        'SĐT': rowExcel.phone,
        'Thiết bị tạo': rowExcel.deviceName,
        'Họ Tên': rowExcel.full_name,
        'IP': rowExcel.ipAddr,
        'Restore': rowExcel.isRestore,
        'Backup': rowExcel.isBackUp,
        'Trạng thái': rowExcel.status
      }

      
      if (dataExcel.length == 0) { dataExcel.push(Object.keys(dataExtract)); }
      dataExcel.push(Object.values(dataExtract));
     
      utilsHelper.renderExcel(pathExcel,dataExcel);
      
    })
  });
  
  
  res.json({
    success:true,
    pathExcel,
  })
});
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

router.get('/getfullname', async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  res.status(200).json({
    status: 'success',
    fullname: dataJson[randomIndex].full_name,
  });
});
router.get('/create', userController.createAccount);
router.post('/Login', userController.LoginUser);

router.get('/getRRS&deviceName=:deviceName', async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isBackUp: false,
    ipAddr: '',
  });

  if (rrsData) {
    res.json({
      status: 'success',
      data: rrsData
    })
  }
  else {
    res.json({
      status: 'fail',
      data: null
    })
  }

})

router.post('/updateRRS', async (req, res) => {

  const filter = {
    username: req.body.username
  };

  const update = {
    isBackUp: req.body.isBackUp,
    isRestore: req.body.isRestore,
    ipAddr: req.body.ipAddr
  };

  let resultUpdate = await rrsModel.findOneAndUpdate(filter, update);

  // let resultTest = await rrsModel.updateMany({deviceName:'May 2'},{isBackUp: false});


  res.status(200).json({
    success: true,
    data: resultUpdate
  });
});

router.get('/restoreRRS&deviceName=:deviceName', async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isBackUp: true,
    isRestore: false,
    ipAddr: { $ne: 'Dang nhap that bai' },
  });

  if (rrsData) {
    res.json({
      status: 'success',
      data: rrsData
    })
  }
  else {
    res.json({
      status: 'fail',
      data: null
    });
  }

});

function getRandomString(length) {
  var randomChars = 'abcdefghijklmnopqrstuvwxyz';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function getRandomNumber(length) {
  var randomChars = '0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/datagmail', async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);



  let randomIndex = Math.floor(Math.random() * dataJson.length);

  var password = removeVietnameseTones(dataJson[randomIndex].last_name_group) + removeVietnameseTones(dataJson[randomIndex].first_name).toLowerCase() + getRandomNumber(getRndInteger(4, 6));


  var gmail = removeVietnameseTones(dataJson[randomIndex].last_name_group) + removeVietnameseTones(dataJson[randomIndex].first_name).toLowerCase() + getRandomNumber(getRndInteger(2, 4)) + getRandomString(getRndInteger(2, 4));

  res.status(200).json({
    status: 'success',
    fullname: dataJson[randomIndex].full_name,
    gmail: gmail,
    password: password,
    first_name: dataJson[randomIndex].first_name,
    last_name_group: dataJson[randomIndex].last_name_group
  });
});

router.post('/addAccountLZD', async (req, res) => {

  let newAccount = new accountModel();
  newAccount.username = req.body.username;
  newAccount.password = req.body.password;
  newAccount.phone = req.body.phoneLZD;
  newAccount.deviceName = req.body.deviceName;
  newAccount.ipAddr = req.body.ipAddr;
  newAccount.status = req.body.status;
  newAccount.isRestore = req.body.isRestore;
  newAccount.isBackUp = req.body.isBackUp;
  newAccount.isVeryPhone = req.body.isVeryPhone;


  newAccount.save();

  res.json({
    success: true,
    data: newAccount
  });
});

router.post('/addAccountGmail', async (req, res) => {



  let newAccountGmail = new gmailModel();
  newAccountGmail.gmail = req.body.gmail;
  newAccountGmail.password = req.body.password;
  newAccountGmail.phone = req.body.phone;
  newAccountGmail.deviceName = req.body.deviceName;
  newAccountGmail.gmail = req.body.gmail;
  newAccountGmail.fullname = req.body.fullname;
  newAccountGmail.first_name = req.body.first_name;
  newAccountGmail.last_name_group = req.body.last_name_group;
  newAccountGmail.ipAddr = req.body.ipAddr;
  newAccountGmail.dateOfBirth = req.body.dateOfBirth;
  newAccountGmail.monthOfBirth = req.body.monthOfBirth;
  newAccountGmail.yearOfBirth = req.body.yearOfBirth;
  newAccountGmail.status = req.body.status;
  newAccountGmail.isRestore = true;
  newAccountGmail.isBackUp = false;

  newAccountGmail.save();

  res.json({
    success: true,
    data: newAccountGmail
  });
});


module.exports = router;