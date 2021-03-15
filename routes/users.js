var express = require('express');
var router = express.Router();
const userController = require('../controllers/User.controller');
const checkJWT = require('../middlewares/check-jwt');
const deviceModel = require('../models/DeviceModel');
const accountModel = require('../models/LazadaAccountModel');
const dataAccountModel = require('../models/DataAccountModel');
const userModel = require('../models/UserModel');
const rrsModel = require('../models/RrsModel');
const gmailModel = require('../models/GmailModel');
const telegramModel = require('../models/TelegramModel');
const napTienModel = require('../models/NapTienModel');
const utilsHelper = require('../utils/UtilsHelper');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
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
    data: newAccount,
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
    data: newUser,
  });
});

router.get('/test', async (req, res) => {
  const filter = {
    ...req.body,
  };
  const pathExcel = `download/acc_gmail_${Date.now()}.xlsx`;
  const dataExcel = [];

  const accountGmail = await gmailModel
    .find()
    .limit(5)
    .exec((err, result) => {
      result.forEach(rowExcel => {
        const dataExtract = {
          Gmail: rowExcel.gmail + '@gmail.com',
          'Mật khẩu': rowExcel.password,
          SĐT: rowExcel.phone,
          'Thiết bị tạo': rowExcel.deviceName,
          'Họ Tên': rowExcel.full_name,
          IP: rowExcel.ipAddr,
          Restore: rowExcel.isRestore,
          Backup: rowExcel.isBackUp,
          'Trạng thái': rowExcel.status,
        };

        if (dataExcel.length == 0) {
          dataExcel.push(Object.keys(dataExtract));
        }
        dataExcel.push(Object.values(dataExtract));

        utilsHelper.renderExcel(pathExcel, dataExcel);
      });
    });

  res.json({
    success: true,
    pathExcel,
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

router.get('/getfullname', async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);

  res.status(200).json({
    status: 'success',
    fullname: dataJson[randomIndex].full_name,
  });
});

router.get('/nametelegram', async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);

  res.status(200).json({
    status: 'success',
    firstName: dataJson[randomIndex].first_name,
    lastName: dataJson[randomIndex].last_name,
  });
});

router.get('/create', userController.createAccount);
router.post('/Login', userController.LoginUser);

router.get('/getRRS&deviceName=:deviceName', async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isRestore: false,
    ipAddr: '',
  });

  if (rrsData) {
    res.json({
      status: 'success',
      data: rrsData,
    });
  } else {
    res.json({
      status: 'fail',
      data: null,
    });
  }
});

router.post('/updateRRS', async (req, res) => {
  const filter = {
    username: req.body.username,
  };

  const update = {
    isBackUp: req.body.isBackUp,
    isRestore: req.body.isRestore,
    ipAddr: req.body.ipAddr,
  };

  let resultUpdate = await rrsModel.findOneAndUpdate(filter, update);

  res.status(200).json({
    success: true,
    data: resultUpdate,
  });
});

router.post('/updateVeryphone', async (req, res) => {
  const filter = {
    username: req.body.username,
  };

  const update = {
    isVeryPhone: req.body.isVeryPhone,
    phone: req.body.phoneLZD,
    ipAddr: req.body.ipAddr,
  };

  let resultUpdate = await accountModel.findOneAndUpdate(filter, update);

  res.status(200).json({
    success: true,
    data: resultUpdate,
  });
});

router.get('/restoreRRS&deviceName=:deviceName', async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isBackUp: true,
    isRestore: false,
    ipAddr: {$ne: 'Dang nhap that bai'},
  });

  if (rrsData) {
    res.json({
      status: 'success',
      data: rrsData,
    });
  } else {
    res.json({
      status: 'fail',
      data: null,
    });
  }
});

function getRandomString(length) {
  var randomChars = 'abcdefghijklmnopqrstuvwxyz';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function getRandomNumber(length) {
  var randomChars = '0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/datagmail', async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  var password =
    removeVietnameseTones(dataJson[randomIndex].last_name_group) +
    removeVietnameseTones(dataJson[randomIndex].first_name).toLowerCase() +
    getRandomNumber(getRndInteger(4, 6));

  var gmail =
    removeVietnameseTones(dataJson[randomIndex].last_name_group) +
    removeVietnameseTones(dataJson[randomIndex].first_name).toLowerCase() +
    getRandomNumber(getRndInteger(2, 4)) +
    getRandomString(getRndInteger(2, 4));
  var arrayPhone = [
    '0564975233',
    '0564975451',
    '0564975392',
    '0564975472',
    '0564975389',
    '0564975390',
    '0564975422',
    '0564975304',
    '0564975309',
    '0564975308',
    '0564975377',
    '0564975303',
    '0564975287',
    '0564975286',
    '0564975307',
    '0564975442',
    '0564975443',
    '0564975447',
    '0564975448',
    '0564975452',
    '0564975614',
    '0564975615',
    '0564975624',
    '0564975365',
    '0564975364',
    '0564975363',
    '0564975330',
    '0564975368',
    '0564975367',
    '0564975366',
    '0564975358',
    '0564975357',
    '0564975356',
    '0564975355',
    '0564975369',
    '0564975439',
    '0564975438',
    '0564975437',
    '0564975457',
    '0564975626',
    '0564975627',
    '0564975628',
    '0564975619',
    '0564975620',
    '0564975621',
    '0564975618',
    '0564975316',
    '0564975616',
    '0564975459',
    '0564975636',
    '0564975206',
    '0564975205',
    '0564975204',
    '0564975203',
    '0564975406',
    '0564975405',
    '0564975462',
    '0564975089',
    '0564975466',
    '0564975468',
    '0564975408',
    '0564975467',
    '0564975084',
    '0564975078',
    '0564975194',
    '0564975081',
    '0564975082',
    '0564975083',
    '0564975080',
    '0564975579',
    '0564975578',
    '0564975331',
    '0564975328',
    '0564975337',
    '0564975327',
    '0564975581',
    '0564975580',
    '0564975608',
    '0564975305',
    '0564975329',
    '0927075854',
    '0564975075',
    '0564975077',
    '0564975076',
    '0564975421',
    '0564975103',
    '0564975542',
    '0564975092',
    '0564975091',
    '0564975094',
    '0564975526',
    '0564975541',
    '0564975540',
    '0564975411',
    '0564975425',
    '0564975453',
  ];

  var addressName = ['Tô Hiến Thành', 'Hòa Hưng'];

  let randomIndexPhone = Math.floor(Math.random() * arrayPhone.length);
  let randomIndexAddress = Math.floor(Math.random() * addressName.length);

  res.status(200).json({
    status: 'success',
    fullname: dataJson[randomIndex].full_name,
    gmail: gmail,
    password: password,
    first_name: dataJson[randomIndex].first_name,
    last_name_group: dataJson[randomIndex].last_name_group,
    phoneNumber: arrayPhone[randomIndexPhone],
    addressName:
      getRandomNumber(3) +
      '/' +
      getRandomNumber(2) +
      ' ' +
      addressName[randomIndexAddress],
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
    data: newAccount,
  });
});

router.post('/addAccountGmail', async (req, res) => {
  let newAccountGmail = new gmailModel();
  newAccountGmail.gmail = req.body.gmail;
  newAccountGmail.password = req.body.password;
  newAccountGmail.phone = req.body.phone;
  newAccountGmail.deviceName = req.body.deviceName;
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
    data: newAccountGmail,
  });
});

router.get('/nghia', async (req, res) => {
  var arrayPhone = [
    '0564975233',
    '0564975451',
    '0564975392',
    '0564975472',
    '0564975389',
    '0564975390',
    '0564975422',
    '0564975304',
    '0564975309',
    '0564975308',
    '0564975377',
    '0564975303',
    '0564975287',
    '0564975286',
    '0564975307',
    '0564975442',
    '0564975443',
    '0564975447',
    '0564975448',
    '0564975452',
    '0564975614',
    '0564975615',
    '0564975624',
    '0564975365',
    '0564975364',
    '0564975363',
    '0564975330',
    '0564975368',
    '0564975367',
    '0564975366',
    '0564975358',
    '0564975357',
    '0564975356',
    '0564975355',
    '0564975369',
    '0564975439',
    '0564975438',
    '0564975437',
    '0564975457',
    '0564975626',
    '0564975627',
    '0564975628',
    '0564975619',
    '0564975620',
    '0564975621',
    '0564975618',
    '0564975316',
    '0564975616',
    '0564975459',
    '0564975636',
    '0564975206',
    '0564975205',
    '0564975204',
    '0564975203',
    '0564975406',
    '0564975405',
    '0564975462',
    '0564975089',
    '0564975466',
    '0564975468',
    '0564975408',
    '0564975467',
    '0564975084',
    '0564975078',
    '0564975194',
    '0564975081',
    '0564975082',
    '0564975083',
    '0564975080',
    '0564975579',
    '0564975578',
    '0564975331',
    '0564975328',
    '0564975337',
    '0564975327',
    '0564975581',
    '0564975580',
    '0564975608',
    '0564975305',
    '0564975329',
    '0927075854',
    '0564975075',
    '0564975077',
    '0564975076',
    '0564975421',
    '0564975103',
    '0564975542',
    '0564975092',
    '0564975091',
    '0564975094',
    '0564975526',
    '0564975541',
    '0564975540',
    '0564975411',
    '0564975425',
    '0564975453',
  ];

  let randomIndexPhone = Math.floor(Math.random() * arrayPhone.length);
  console.log(arrayPhone[randomIndexPhone]);
  res.json({
    success: true,
    data: arrayPhone[randomIndexPhone],
  });
});

router.post('/addAccountTelegram', async (req, res) => {
  let newAccountTelegram = new telegramModel();
  newAccountTelegram.firstName = req.body.firstName;
  newAccountTelegram.lastName = req.body.lastName;
  newAccountTelegram.phoneNumber = req.body.phoneNumber;
  newAccountTelegram.ipAddr = req.body.ipAddr;
  newAccountTelegram.rrsName = req.body.rrsName;
  newAccountTelegram.status = req.body.status;
  console.log(newAccountTelegram);
  newAccountTelegram.save();

  res.json({
    success: true,
    data: newAccountTelegram,
  });
});

async function randomFullname() {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);
  const fullName =
    dataJson[randomIndex].last_name_group +
    ' ' +
    dataJson[randomIndex].first_name;
  return fullName;
}

function randomAddress() {
  const firstAddr = getRndInteger(10, 300) + '/' + getRndInteger(1, 30);
  const arrStreet = ['To Hien Thanh', 'Hoa Hung'];
  const finalAddr = firstAddr + ' ' + arrStreet[getRndInteger(0, 1)];
  return finalAddr;
}

router.post('/setinfo', async (req, res) => {
  let newdataAccountModel = new dataAccountModel();

  //init
  const fullName = await randomFullname();
  const phoneNumber = req.body.phoneNumber;
  const address = randomAddress();
  const deviceName = req.body.deviceName;
  const username = req.body.username;
  const password = req.body.password;

  //set
  newdataAccountModel.fullName = fullName;
  newdataAccountModel.phoneNumber = phoneNumber;
  newdataAccountModel.address = address;
  newdataAccountModel.deviceName = deviceName;
  newdataAccountModel.username = username;
  newdataAccountModel.password = password;


  //save
  newdataAccountModel.save();

  res.json({
    success: true,
    data: newdataAccountModel,
  });
});

router.get('/getInfo&deviceName=:deviceName', async (req, res) => {
  const infoData = await dataAccountModel.findOne(
    {
      deviceName: req.params.deviceName,
    },
    {},
    {sort: {_id: -1}}
  );

  if (infoData) {
    res.json({
      status: 'success',
      data: infoData,
    });
  } else {
    res.json({
      status: 'fail',
      data: null,
    });
  }
});


router.post('/setnaptien', async (req, res) => {
  let newDataNapTien = new napTienModel();

  //init
  const deviceName = req.body.deviceName;
  const phoneNumber = req.body.phoneNumber;
  const noiDung = "So " + phoneNumber + " cua may " + deviceName + " can nap tien";


  //set
  newDataNapTien.deviceName = deviceName;
  newDataNapTien.phoneNumber = phoneNumber;
  newDataNapTien.noiDung = noiDung;


  //save
  newDataNapTien.save();

  res.json({
    success: true,
    data: newDataNapTien,
  });
});


router.get('/getNapTien', async (req, res) => {
  const infoDataNapTien = await napTienModel.find().sort({_id: -1});

  if (infoDataNapTien) {
    res.json(
      infoDataNapTien
    );
  } else {
    res.json({
      status: 'fail',
      data: null,
    });
  }
});

module.exports = router;
