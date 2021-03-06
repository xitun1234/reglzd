var express = require("express");
var router = express.Router();
const userController = require("../controllers/User.controller");
const checkJWT = require("../middlewares/check-jwt");
const deviceModel = require("../models/DeviceModel");
const accountModel = require("../models/LazadaAccountModel");
const dataAccountModel = require("../models/DataAccountModel");
const userModel = require("../models/UserModel");
const rrsModel = require("../models/RrsModel");
const gmailModel = require("../models/GmailModel");
const telegramModel = require("../models/TelegramModel");
const napTienModel = require("../models/NapTienModel");
const scriptModel = require("../models/ScriptModel");
const linkSubModel = require("../models/LinkSubModel");
const utilsHelper = require("../utils/UtilsHelper");
const lzdFBModel = require("../models/LzdFbModel");
const lzdFBTempModel = require("../models/LzdFbModelTemp");
const khoDuLieuModel = require("../models/KhoDuLieuModel");
const linkModel = require("../models/LinkModel");
const khoDuLieuDatHangModel = require("../models/KhoDatHangModel");
const imeiGiftModel = require("../models/ImeiGiftModel");
const cauHinhFakeModel = require("../models/CauHinhFakeModel");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const { info } = require("console");
const KhoDuLieu = require("../models/KhoDuLieuModel");
const LZDFBTemp = require("../models/LzdFbModelTemp");
const Schema = mongoose.Schema;

const _ = require("underscore");
const imaps = require("imap-simple");
const simpleParser = require("mailparser").simpleParser;
const { ImapFlow } = require("imapflow");
const axios = require("axios");
const userAgent = require("user-agents");
const { result, random } = require("underscore");
const KhoDuLieuDatHang = require("../models/KhoDatHangModel");

var Imap = require("imap"),
  inspect = require("util").inspect;


/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/addAccount", async (req, res) => {
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

router.post("/addUser", async (req, res) => {
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

router.get("/test", async (req, res) => {
  const filter = {
    ...req.body,
  };
  const pathExcel = `download/acc_gmail_${Date.now()}.xlsx`;
  const dataExcel = [];

  const accountGmail = await gmailModel
    .find()
    .limit(5)
    .exec((err, result) => {
      result.forEach((rowExcel) => {
        const dataExtract = {
          Gmail: rowExcel.gmail + "@gmail.com",
          "M???t kh???u": rowExcel.password,
          S??T: rowExcel.phone,
          "Thi???t b??? t???o": rowExcel.deviceName,
          "H??? T??n": rowExcel.full_name,
          IP: rowExcel.ipAddr,
          Restore: rowExcel.isRestore,
          Backup: rowExcel.isBackUp,
          "Tr???ng th??i": rowExcel.status,
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
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

router.get("/getfullname", async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);

  res.status(200).json({
    status: "success",
    fullname: dataJson[randomIndex].full_name,
  });
});

router.get("/fullname", async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);

  res.status(200).json(dataJson[randomIndex].full_name);
});

router.get("/nametelegram", async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);
  console.log(dataJson[randomIndex]);

  res.status(200).json({
    status: "success",
    firstName: dataJson[randomIndex].first_name,
    lastName: dataJson[randomIndex].last_name,
  });
});

router.get("/create", userController.createAccount);
router.post("/Login", userController.LoginUser);

router.get("/getRRS&deviceName=:deviceName", async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isRestore: false,
    ipAddr: "",
  });

  if (rrsData) {
    res.json({
      status: "success",
      data: rrsData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.post("/updateRRS", async (req, res) => {
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

router.post("/updateVeryphone", async (req, res) => {
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

router.get("/restoreRRS&deviceName=:deviceName", async (req, res) => {
  const rrsData = await rrsModel.findOne({
    deviceName: req.params.deviceName,
    isBackUp: true,
    isRestore: false,
    ipAddr: { $ne: "Dang nhap that bai" },
  });

  if (rrsData) {
    res.json({
      status: "success",
      data: rrsData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

function getRandomString(length) {
  var randomChars = "abcdefghijklmnopqrstuvwxyz";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function getRandomNumber(length) {
  var randomChars = "0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}

function removeVietnameseTones(str) {
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
  str = str.replace(/??|??|???|???|??/g, "i");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
  str = str.replace(/???|??|???|???|???/g, "y");
  str = str.replace(/??/g, "d");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
  str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
  str = str.replace(/??|??|???|???|??/g, "I");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
  str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
  str = str.replace(/???|??|???|???|???/g, "Y");
  str = str.replace(/??/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
  // Remove extra spaces
  // B??? c??c kho???ng tr???ng li???n nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // B??? d???u c??u, k?? t??? ?????c bi???t
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeDuplicateCharacters(string) {
  return string
    .split('')
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .join('');
}

router.get("/datagmail", async (req, res) => {
  const listMatKhau = fs
      .readFileSync("./config/dataMatKhau.txt", "utf-8")
      .toString()
      .split("\n");
    const matKhauRandom =
    listMatKhau[[getRndInteger(0, listMatKhau.length)]].trim();

    


  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  var arrayKiTu = ["!", "@", "#", "%", "&"];
  var arrayKiTu1 = ["%", "&"];
  let randomKiTu1 = Math.floor(Math.random() * arrayKiTu.length);
  let randomKiTu2 = Math.floor(Math.random() * arrayKiTu1.length);

  
  var password = removeVietnameseTones(dataJson[randomIndex].last_name_group) +
  removeVietnameseTones(dataJson[randomIndex].first_name) +
    (getRndInteger(1000, 9999).toString()) +
    arrayKiTu[randomKiTu1] + arrayKiTu1[randomKiTu2];

  var passwordChuanHoa = removeDuplicateCharacters(password)

  console.log("Pass: " + password)
  console.log("Pass chuan hoa: " + passwordChuanHoa)

  var gmail =
    removeVietnameseTones(dataJson[randomIndex].last_name_group) +
    removeVietnameseTones(dataJson[randomIndex].first_name).toLowerCase() +
    getRandomString(getRndInteger(2, 4)) +
    getRandomNumber(getRndInteger(2, 4));
  var arrayPhone = [
    "0564975233",
    "0564975451",
    
  ];

  var addressName = ["T?? Hi???n Th??nh", "H??a H??ng"];

  let randomIndexPhone = Math.floor(Math.random() * arrayPhone.length);
  let randomIndexAddress = Math.floor(Math.random() * addressName.length);
  var last_name_group = dataJson[randomIndex].last_name_group;
  var full_name = dataJson[randomIndex].full_name;
  var first_name = dataJson[randomIndex].first_name;

  res.status(200).json({
    status: "success",
    fullname: dataJson[randomIndex].full_name,
    gmail: gmail,
    password: matKhauRandom,
    first_name: first_name,
    last_name_group: dataJson[randomIndex].last_name_group,
    phoneNumber: arrayPhone[randomIndexPhone],
    addressName:
      getRandomNumber(3) +
      "/" +
      getRandomNumber(2) +
      " " +
      addressName[randomIndexAddress],
  });
});

router.post("/addAccountLZD", async (req, res) => {
  let newAccount = new accountModel();
  newAccount.username = req.body.mail;
  newAccount.passwordLZD = req.body.passwordLZD;
  newAccount.passwordGmail = req.body.passMail;
  newAccount.phoneNumber = req.body.phoneNumber;
  newAccount.deviceName = req.body.deviceName;
  newAccount.status = req.body.status;
  newAccount.isLoginFB = req.body.isLoginFB;
  newAccount.isRegLZD = req.body.isRegLZD;
  newAccount.owner = req.body.owner;

  newAccount.save();

  res.json({
    success: true,
    data: newAccount,
  });
});

router.post("/addAccountGmail", async (req, res) => {
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
  newAccountGmail.owner = req.body.owner;

  newAccountGmail.save();

  res.json({
    success: true,
    data: newAccountGmail,
  });
});

router.get("/nghia", async (req, res) => {
  var arrayPhone = [
    "0564975233",
    "0564975451",
    "0564975392",
    "0564975472",
    "0564975389",
    "0564975390",
    "0564975422",
    "0564975304",
    "0564975309",
    "0564975308",
    "0564975377",
    "0564975303",
    "0564975287",
    "0564975286",
    "0564975307",
    "0564975442",
    "0564975443",
    "0564975447",
    "0564975448",
    "0564975452",
    "0564975614",
    "0564975615",
    "0564975624",
    "0564975365",
    "0564975364",
    "0564975363",
    "0564975330",
    "0564975368",
    "0564975367",
    "0564975366",
    "0564975358",
    "0564975357",
    "0564975356",
    "0564975355",
    "0564975369",
    "0564975439",
    "0564975438",
    "0564975437",
    "0564975457",
    "0564975626",
    "0564975627",
    "0564975628",
    "0564975619",
    "0564975620",
    "0564975621",
    "0564975618",
    "0564975316",
    "0564975616",
    "0564975459",
    "0564975636",
    "0564975206",
    "0564975205",
    "0564975204",
    "0564975203",
    "0564975406",
    "0564975405",
    "0564975462",
    "0564975089",
    "0564975466",
    "0564975468",
    "0564975408",
    "0564975467",
    "0564975084",
    "0564975078",
    "0564975194",
    "0564975081",
    "0564975082",
    "0564975083",
    "0564975080",
    "0564975579",
    "0564975578",
    "0564975331",
    "0564975328",
    "0564975337",
    "0564975327",
    "0564975581",
    "0564975580",
    "0564975608",
    "0564975305",
    "0564975329",
    "0927075854",
    "0564975075",
    "0564975077",
    "0564975076",
    "0564975421",
    "0564975103",
    "0564975542",
    "0564975092",
    "0564975091",
    "0564975094",
    "0564975526",
    "0564975541",
    "0564975540",
    "0564975411",
    "0564975425",
    "0564975453",
  ];

  let randomIndexPhone = Math.floor(Math.random() * arrayPhone.length);
  console.log(arrayPhone[randomIndexPhone]);
  res.json({
    success: true,
    data: arrayPhone[randomIndexPhone],
  });
});

router.post("/addAccountTelegram", async (req, res) => {


  const hoVietNam = await randomHo();
  const tenVietNam = await randomTen();

  let newAccountTelegram = new telegramModel();
  newAccountTelegram.firstName = hoVietNam;
  newAccountTelegram.lastName = tenVietNam;
  newAccountTelegram.phoneNumber = req.body.phoneNumber;
  newAccountTelegram.otp = req.body.otp;
  newAccountTelegram.deviceName = req.body.deviceName;
  console.log(newAccountTelegram);
  newAccountTelegram.save();

  res.json({
    success: true,
    data: newAccountTelegram,
  });
});

router.get("/getTelegram&deviceName=:deviceName", async (req, res) => {
  const infoData = await telegramModel.findOne(
    {
      deviceName: req.params.deviceName,
    },
    {},
    { sort: { _id: -1 } }
  );

  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

async function randomFullname() {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  let randomChoice = getRndInteger(0, 1);
  if (randomChoice == 0) {
    const fullName =
      dataJson[randomIndex].last_name_group +
      " " +
      dataJson[randomIndex].first_name;
    return fullName;
  } else if (randomChoice == 1) {
    const fullName = dataJson[randomIndex].full_name;
    return fullName;
  }
}

async function randomHo() {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  const hoVietNam = dataJson[randomIndex].last_name_group;
  return hoVietNam;
}

async function randomTen() {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  const tenVietNam = dataJson[randomIndex].first_name;
  return tenVietNam;
}

function randomAddress() {
  const firstAddr = getRndInteger(10, 300) + "/" + getRndInteger(1, 30);
  const arrStreet = ["To Hien Thanh", "Hoa Hung"];
  const finalAddr = firstAddr + " " + arrStreet[getRndInteger(0, 1)];
  return finalAddr;
}

router.post("/setinfo", async (req, res) => {
  let newdataAccountModel = new dataAccountModel();

  //init
  const fullName = await randomFullname();
  var phoneNumber = req.body.phoneNumber;
  var address = req.body.address;
  const deviceName = req.body.deviceName;
  const username = req.body.username;
  const password = req.body.password;
  const twoFA = req.body.twoFA;
  const owner = req.body.owner;
  const mail = req.body.mail;
  const passMail = req.body.passMail;
  const link = req.body.link;

  if (address == "") {
    var dauSo = [
      "090",
      "093",
      "070",
      "076",
      "077",
      "078",
      "079",
      "091",
      "094",
      "081",
      "082",
      "084",
      "085",
      "088",
      "096",
      "097",
      "098",
      "086",
      "032",
      "034",
      "035",
      "036",
      "037",
      "038",
      "039",
    ];
    let randomDauSo = Math.floor(Math.random() * dauSo.length);
    var soDienThoai =
      dauSo[randomDauSo] +
      getRandomNumber(3).toString() +
      getRandomNumber(4).toString();
    phoneNumber = soDienThoai;

    console.log("So dien thoai: " + soDienThoai);

    const dataDinhDangDiaChi = fs
      .readFileSync("./config/dinhDangDiaChi.txt", "utf-8")
      .toString()
      .split("\n");
    let indexDinhDangDiaChi = Math.floor(
      Math.random() * dataDinhDangDiaChi.length
    );

    const diaChiTemp = dataDinhDangDiaChi[indexDinhDangDiaChi];

    const listTenDuong = fs
      .readFileSync("./config/tenDuongVN.txt", "utf-8")
      .toString()
      .split("\n");
    const tenDuongRandom =
      listTenDuong[[getRndInteger(0, listTenDuong.length)]].trim();

    const soNhaRandom = getRndInteger(1, 100).toString();

    const diaChiTemp1 = diaChiTemp.replace("ABC", tenDuongRandom);
    const diaChiTemp2 = diaChiTemp1.replace("ABC", tenDuongRandom);
    const diaChiTemp3 = diaChiTemp2.replace("123", soNhaRandom).trim();

    console.log(diaChiTemp3);

    address = diaChiTemp3;
  }

  var gmail =
    removeVietnameseTones(fullName).toLowerCase() +
    getRandomNumber(getRndInteger(2, 4)) +
    getRandomString(getRndInteger(2, 4));

  //set
  newdataAccountModel.fullName = fullName;
  newdataAccountModel.phoneNumber = phoneNumber;
  newdataAccountModel.address = address;
  newdataAccountModel.deviceName = deviceName;
  newdataAccountModel.username = username;
  newdataAccountModel.password = password;
  newdataAccountModel.twoFA = twoFA;
  newdataAccountModel.gmail = gmail.replace(/\s/g, "") + "@gmail.com";
  newdataAccountModel.owner = owner;
  newdataAccountModel.mail = mail;
  newdataAccountModel.passMail = passMail;
  newdataAccountModel.link = link;

  console.log(newdataAccountModel);
  //save
  newdataAccountModel.save();

  res.json({
    success: true,
    data: newdataAccountModel,
  });
});

router.get("/dataTanPhu", async (req, res) => {
  const fullName = await randomFullname();
  const hoVietNam = await randomHo();
  const tenVietNam = await randomTen();
  var dauSo = [
    "090",
    "093",
    "070",
    "076",
    "077",
    "078",
    "079",
    "091",
    "094",
    "081",
    "082",
    "084",
    "085",
    "088",
    "096",
    "097",
    "098",
    "086",
    "032",
    "034",
    "035",
    "036",
    "037",
    "038",
    "039",
  ];
  let randomDauSo = Math.floor(Math.random() * dauSo.length);
  var soDienThoai =
    dauSo[randomDauSo] +
    getRandomNumber(3).toString() +
    getRandomNumber(4).toString();
  phoneNumber = soDienThoai;

  console.log("So dien thoai: " + soDienThoai);
  console.log("Fullname: " + fullName);

  var diaChi =
    "S??? nh?? " +
    getRndInteger(1, 100).toString() +
    "/" +
    getRndInteger(1, 60) +
    " ???????ng ph???m v??n x???o";
  address = diaChi;

  const dataDinhDangDiaChi = fs
    .readFileSync("./config/dinhDangDiaChi.txt", "utf-8")
    .toString()
    .split("\n");
  let indexDinhDangDiaChi = Math.floor(
    Math.random() * dataDinhDangDiaChi.length
  );

  const diaChiTemp = dataDinhDangDiaChi[indexDinhDangDiaChi];

  const listTenDuong = fs
    .readFileSync("./config/tenDuongVN.txt", "utf-8")
    .toString()
    .split("\n");
  const tenDuongRandom =
    listTenDuong[[getRndInteger(0, listTenDuong.length)]].trim();

  const soNhaRandom = getRndInteger(1, 100).toString();

  const diaChiTemp1 = diaChiTemp.replace("ABC", tenDuongRandom);
  const diaChiTemp2 = diaChiTemp1.replace("ABC", tenDuongRandom);
  const diaChiTemp3 = diaChiTemp2.replace("123", soNhaRandom).trim();

  console.log(diaChiTemp3);

  res.status(200).json({
    status: "success",
    fullname: fullName,
    phoneNumber: phoneNumber,
    address: diaChiTemp3,
    hoVietNam: hoVietNam,
    tenVietNam: tenVietNam
  });
});

router.get("/getInfo&deviceName=:deviceName&owner=:owner", async (req, res) => {
  const infoData = await dataAccountModel.findOne(
    {
      deviceName: req.params.deviceName,
      owner: req.params.owner,
    },
    {},
    { sort: { _id: -1 } }
  );
  console.log(infoData);
  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.get("/getGmail&deviceName=:deviceName", async (req, res) => {
  const infoData = await gmailModel.findOne(
    {
      deviceName: req.params.deviceName,
    },
    {},
    { sort: { _id: -1 } }
  );

  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.post("/setnaptien", async (req, res) => {
  let newDataNapTien = new napTienModel();

  //init
  const deviceName = req.body.deviceName;
  const phoneNumber = req.body.phoneNumber;
  const noiDung =
    "So " + phoneNumber + " cua may " + deviceName + " can nap tien";

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

router.get("/getNapTien", async (req, res) => {
  const infoDataNapTien = await napTienModel.find().sort({ _id: -1 });

  if (infoDataNapTien) {
    res.json(infoDataNapTien);
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/scripts");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/upload", upload.single("avatar"), (req, res) => {
  console.log(req.file);

  res.json({
    success: true,
  });
});

router.post("/setKichBan", async (req, res) => {
  let newKichBan = new scriptModel();

  //init
  const scriptName = req.body.scriptName;
  const deviceName = req.body.deviceName;

  if (deviceName == "all") {
    const insertMany = await scriptModel.insertMany([
      { scriptName: scriptName, deviceName: "1" },
      { scriptName: scriptName, deviceName: "2" },
      { scriptName: scriptName, deviceName: "3" },
      { scriptName: scriptName, deviceName: "4" },
      { scriptName: scriptName, deviceName: "5" },
      { scriptName: scriptName, deviceName: "6" },
      { scriptName: scriptName, deviceName: "7" },
      { scriptName: scriptName, deviceName: "8" },
      { scriptName: scriptName, deviceName: "9" },
      { scriptName: scriptName, deviceName: "10" },
    ]);
  } else {
    newKichBan.scriptName = scriptName;
    newKichBan.deviceName = deviceName;
    newKichBan.save();
  }

  res.json({
    success: true,
    data: newKichBan,
  });
});

router.get(
  "/getKichBan&deviceName=:deviceName&owner=:owner",
  async (req, res) => {
    const infoKichBan = await scriptModel.findOne(
      {
        deviceName: req.params.deviceName,
        owner: req.params.owner,
      },
      {},
      { sort: { _id: -1 } }
    );

    if (infoKichBan) {
      res.json({
        status: "success",
        data: infoKichBan,
      });
    } else {
      res.json({
        status: "fail",
        data: null,
      });
    }
  }
);

router.post("/setLinkSub", async (req, res) => {
  let newLinkSub = new linkSubModel();

  //init
  const linkSub = req.body.linkSub;
  newLinkSub.linkSub = linkSub;
  newLinkSub.owner = "admin";

  //save

  newLinkSub.save();

  res.json({
    success: true,
    data: newLinkSub,
  });
});

router.get("/getLinkSub", async (req, res) => {
  const infoDataLinkSub = await linkSubModel
    .findOne({ owner: "admin" })
    .sort({ _id: -1 });

  if (infoDataLinkSub) {
    res.json(infoDataLinkSub);
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.get("/getDataLZD", async (req, res) => {
  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  var password = "Sang123";
  var fullName = removeVietnameseTones(dataJson[randomIndex].full_name);

  res.json({
    success: true,
    data: {
      password: password,
      fullName: fullName,
    },
  });
});

router.get("/deleteTest", async (req, res) => {
  const result = await dataAccountModel.deleteMany();
  console.log(result);
});

router.post("/setdatareg", async (req, res) => {
  let newDataLZDFBTemp = new lzdFBTempModel();

  //init
  const uid = req.body.username;
  const passwordFB = req.body.password;
  const passwordLZD = req.body.passwordLZD;
  const phoneNumber = req.body.phoneNumber;
  const otp = req.body.otp;
  const otpLan2 = req.body.otpLan2;
  const deviceName = req.body.deviceName;
  const twoFA = req.body.twoFA;
  const owner = req.body.owner;
  const mail = req.body.mail;
  const passMail = req.body.passMail;

  //set
  newDataLZDFBTemp.uid = uid;
  newDataLZDFBTemp.passwordFB = passwordFB;
  newDataLZDFBTemp.passwordLZD = passwordLZD;
  newDataLZDFBTemp.phoneNumber = phoneNumber;
  newDataLZDFBTemp.otp = otp;
  newDataLZDFBTemp.otpLan2 = otpLan2;
  newDataLZDFBTemp.deviceName = deviceName;
  newDataLZDFBTemp.twoFA = twoFA;
  newDataLZDFBTemp.owner = owner;
  newDataLZDFBTemp.mail = mail;
  newDataLZDFBTemp.passMail = passMail;

  //save
  newDataLZDFBTemp.save();

  res.json({
    success: true,
    data: newDataLZDFBTemp,
  });
});

router.get(
  "/getdatareg&deviceName=:deviceName&owner=:owner",
  async (req, res) => {
    const infoData = await lzdFBTempModel.findOne(
      {
        deviceName: req.params.deviceName,
        owner: req.params.owner,
      },
      {},
      { sort: { _id: -1 } }
    );

    if (infoData) {
      res.json({
        status: "success",
        data: infoData,
      });
    } else {
      res.json({
        status: "fail",
        data: null,
      });
    }
  }
);

router.post("/updatePhoneThue", async (req, res) => {
  const filter = { deviceName: req.body.deviceName, owner: req.body.owner };
  const update = {
    phoneNumber: req.body.phoneNumber,
    otp: req.body.otp,
    otpLan2: req.body.otpLan2,
    passwordLZD: req.body.passwordLZD,
    status: req.body.status,
  };
  let resultUpdate = await lzdFBTempModel.findOneAndUpdate(filter, update, {
    new: true,
    sort: { created: -1 },
  });

  console.log(resultUpdate);
  if (resultUpdate.status == true) {
    const newDuLieu = new lzdFBModel();

    newDuLieu.uid = resultUpdate.uid;
    newDuLieu.passwordFB = resultUpdate.passwordFB;
    newDuLieu.phoneNumber = resultUpdate.phoneNumber;
    newDuLieu.passwordLZD = resultUpdate.passwordLZD;
    newDuLieu.deviceName = resultUpdate.deviceName;
    newDuLieu.status = resultUpdate.status;
    newDuLieu.owner = resultUpdate.owner;

    newDuLieu.save();
  }
  res.status(200).json({ success: true, data: resultUpdate });
});

router.get("/nghiadeptrai", async (req, res) => {
  const infoData = await lzdFBTempModel.find({ status: true });

  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.get("/regdone&deviceName=:deviceName&owner=:owner", async (req, res) => {
  const infoData = await lzdFBTempModel.findOne(
    {
      deviceName: req.params.deviceName,
      status: true,
      owner: req.params.owner,
    },
    {},
    { sort: { _id: -1 } }
  );

  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.post("/setkhodulieu", async (req, res) => {
  let duLieu = new khoDuLieuModel();

  //init
  const username = req.body.username;
  const password = req.body.password;
  const mail = req.body.mail;
  const passMail = req.body.passMail;
  const twoFA = req.body.twoFA;
  const owner = req.body.owner;

  const fileData = await readFilePro(`${__dirname}/../config/output.json`);
  const dataJson = JSON.parse(fileData);

  let randomIndex = Math.floor(Math.random() * dataJson.length);

  //set
  duLieu.username = username;
  duLieu.password = password;
  duLieu.mail = mail;
  duLieu.fullName = dataJson[randomIndex].full_name;
  duLieu.passMail = passMail;
  duLieu.twoFA = twoFA;
  duLieu.isGet = false;
  duLieu.owner = owner;
  //save
  duLieu.save();

  res.json({
    success: true,
    data: duLieu,
  });
});

router.get(
  "/getKhoDuLieu&deviceName=:deviceName&owner=:owner",
  async (req, res) => {
    const filter = { isGet: false, owner: req.params.owner };
    const update = {
      isGet: true,
      status: `May ${req.params.deviceName}`,
    };

    let doc = await KhoDuLieu.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (doc) {
      res.json({
        status: "success",
        data: doc,
      });
    } else {
      res.json({
        status: "fail",
        data: null,
      });
    }
  }
);

router.get("/getLink&linkType=:linkType&owner=:owner", async (req, res) => {
  console.log(req.params.owner);
  const infoData = await linkModel.findOne(
    {
      linkType: { $regex: req.params.linkType, $options: "i" },
      owner: req.params.owner,
    },
    {}
  );

  if (infoData) {
    res.json({
      status: "success",
      data: infoData,
    });
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.get(
  "/getDataAndroid&deviceName=:deviceName&owner=:owner",
  async (req, res) => {
    const infoData = await KhoDuLieu.findOne(
      {
        deviceName: req.params.deviceName,
        owner: req.params.owner,
        isGet: true,
      },
      {},
      { sort: { _id: -1 } }
    );

    if (
      infoData == null ||
      (infoData.isRegLZD == true && infoData.isLoginFB == true) ||
      (infoData.isRegLZD == false && infoData.isLoginFB == true)
    ) {
      console.log("ok");
      const filter = { isGet: false, owner: req.params.owner };
      const update = {
        isGet: true,
        status: `May ${req.params.deviceName}`,
        deviceName: req.params.deviceName,
      };
      let doc = await KhoDuLieu.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(doc);

      if (doc) {
        res.json({
          status: "success",
          data: doc,
        });
      } else {
        res.json({
          status: "fail",
          data: null,
        });
      }
    } else {
      res.json({
        status: "success",
        data: infoData,
      });
    }
  }
);

router.post("/updateTrangThaiReg", async (req, res) => {
  const filter = {
    deviceName: req.body.deviceName,
    owner: req.body.owner,
    mail: req.body.mail,
  };
  const update = {
    isRegLZD: req.body.isRegLZD,
    isLoginFB: req.body.isLoginFB,
  };

  let resultUpdate = await KhoDuLieu.findOneAndUpdate(filter, update, {
    new: true,
    sort: { created: -1 },
  });

  res.status(200).json({
    success: true,
    data: resultUpdate,
  });
});

router.get("/getOTPHotMail&mail=:mail&passMail=:passMail", async (req, res) => {
  const linkAPI =
    "https://serverotp.herokuapp.com/getOTPHotmail?mail=" +
    req.params.mail +
    "&passMail=" +
    req.params.passMail;
  console.log(linkAPI);

  const resultOTP = await axios.get(linkAPI);

  const dataResp = resultOTP.data;

  res.status(200).json({
    success: dataResp.status,
    otp: dataResp.otp,
  });
});

router.get("/resetKho", async (req, res) => {
  const result = await khoDuLieuModel.deleteMany({ owner: "admin" });
  console.log(result);

  res.status(200).json({
    success: true,
    msg: "Da xoa toan bo du lieu",
    data: result,
  });
});

router.get("/getCountKho", async (req, res) => {
  const resultDaLay = await khoDuLieuModel.countDocuments({
    owner: "admin",
    isGet: true,
  });
  const result = await khoDuLieuModel.countDocuments({ owner: "admin" });

  res.status(200).json({
    success: true,
    data: resultDaLay + "/" + result,
  });
});

router.get("/getCountAccLZD", async (req, res) => {
  const resultDaLay = await accountModel.countDocuments({ owner: "admin" });

  res.status(200).json({
    success: true,
    data: resultDaLay.toString(),
  });
});

router.get("/getAccountLZD", async (req, res) => {
  const result = await accountModel.find({ owner: "admin" });

  res.status(200).json({
    success: true,
    data: result,
  });
});

router.post("/setKhoDatHang", async (req, res) => {
  let duLieu = new khoDuLieuDatHangModel();

  //init
  const username = req.body.username;
  const password = req.body.password;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const owner = req.body.owner;

  //set
  duLieu.username = username;
  duLieu.password = password;
  duLieu.address = address;
  duLieu.phoneNumber = phoneNumber;
  duLieu.isGet = false;
  duLieu.owner = owner;
  //save
  duLieu.save();

  res.json({
    success: true,
    data: duLieu,
  });
});

router.get(
  "/getKhoDatHang&deviceName=:deviceName&owner=:owner",
  async (req, res) => {
    const filter = { isGet: false, owner: req.params.owner };

    const update = {
      isGet: true,
      status: "",
      deviceName: req.params.deviceName,
    };

    let doc = await khoDuLieuDatHangModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (doc) {
      res.json({
        status: "success",
        data: doc,
      });
    } else {
      res.json({
        status: "fail",
        data: "???? H???t Acc Trong Kho",
      });
    }
  }
);

router.get("/resetKhoDatHang", async (req, res) => {
  const result = await khoDuLieuDatHangModel.deleteMany({ owner: "admin" });
  console.log(result);

  res.status(200).json({
    success: true,
    msg: "Da xoa toan bo du lieu",
    data: result,
  });
});

router.get("/getCountKhoDatHang", async (req, res) => {
  const resultDaLay = await khoDuLieuDatHangModel.countDocuments({
    owner: "admin",
    isGet: true,
  });
  const result = await khoDuLieuDatHangModel.countDocuments({ owner: "admin" });

  res.status(200).json({
    success: true,
    data: resultDaLay + "/" + result,
  });
});

router.get("/getKhoDatHang", async (req, res) => {
  const result = await khoDuLieuDatHangModel.find({ owner: "admin" });

  res.status(200).json({
    success: true,
    data: result,
  });
});

router.post("/updateTrangThaiKhoDatHang", async (req, res) => {
  const filter = { username: req.body.username, owner: req.body.owner };

  const update = {
    status: req.body.status,
  };

  let doc = await khoDuLieuDatHangModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    success: true,
    msg: "Updated",
    data: doc,
  });
});

router.get("/checkImei&imei=:imei", async (req, res) => {
  const imeiNumber = req.params.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent({ deviceCategory: "mobile" });

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {
    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);

    const resp = {
      imei: result.data.Item.Imei,
      model: result.data.Item.ModelCode,
      ngayKichHoat: ngayKichHoat.content,
      content: "",
    };

    if (thang == 8 && ngay >= 20) {
      //update content
      resp.content = "Imei X???n. ???? Th??m V??o Database";

      //add vao database

      const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
      if (checkExists == false) {
        //chua co du lieu. Them vao database
        const duLieuImei = new imeiGiftModel();
        duLieuImei.imei = resp.imei;
        duLieuImei.model = resp.model;
        duLieuImei.ngayKichHoat = resp.ngayKichHoat;
        duLieuImei.content = resp.content;

        duLieuImei.save();
      } else {
        resp.content = "Imei ???? C?? Trong Database R???i !!!";
      }

      return res.json({
        success: true,
        data: resp,
      });
    }

    if (thang == 9) {
      //update content
      resp.content = "Imei X???n. ???? Th??m V??o Database";

      //add vao database

      const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
      if (checkExists == false) {
        //chua co du lieu. Them vao database
        const duLieuImei = new imeiGiftModel();
        duLieuImei.imei = resp.imei;
        duLieuImei.model = resp.model;
        duLieuImei.ngayKichHoat = resp.ngayKichHoat;
        duLieuImei.content = resp.content;

        duLieuImei.save();
      } else {
        resp.content = "Imei ???? C?? Trong Database R???i !!!";
      }

      return res.status(200).json({
        success: true,
        data: resp,
      });
    }

    if (thang != 8 || thang != 9) {
      resp.content = "KH??NG TH???A ??I???U KI???N";
      return res.status(200).json({
        success: true,
        data: resp,
      });
    }
  }
});

router.get("/checkImeiA52s&imei=:imei", async (req, res) => {
  // up
  const imeiNumber = req.params.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent({ deviceCategory: "mobile" });

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {

    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);
    const nam = parseInt(ngayKichHoat.year);

    const modelMay = result.data.Item.ModelCode;
    
    //print
    console.log("Model May: " + modelMay + " Date: " + ngay.toString() + "-" + thang.toString() + "-" + nam.toString());

    if (modelMay.search("SM-A52") != -1)
    {
      const resp = {
        imei: result.data.Item.Imei,
        model: result.data.Item.ModelCode,
        ngayKichHoat: ngayKichHoat.content,
        content: "",
      };

      if (thang == 12 && ngay >= 15) {
      
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }

      else if (thang == 1 && nam == 2022){
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }
  
      else {
        resp.content = "KH??NG TH???A ??I???U KI???N";
        return res.status(200).json({
          success: true,
          data: resp,
        });
      }


    }

  }
});

router.get("/checkImeiA32&imei=:imei", async (req, res) => {
  // up
  const imeiNumber = req.params.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent();

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {

    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);
    const nam = parseInt(ngayKichHoat.year);

    const modelMay = result.data.Item.ModelCode;
    
    //print
    console.log("Model May: " + modelMay + " Date: " + ngay.toString() + "-" + thang.toString());

    if (modelMay.search("SM-A32") != -1)
    {
      const resp = {
        imei: result.data.Item.Imei,
        model: result.data.Item.ModelCode,
        ngayKichHoat: ngayKichHoat.content,
        content: "",
      };

      if (thang == 12 && ngay >= 15) {
      
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }

      else if (thang == 1 && nam == 2022){
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }
  
      else  {
        resp.content = "KH??NG TH???A ??I???U KI???N";
        return res.status(200).json({
          success: true,
          data: resp,
        });
      }


    }

  }
});

router.post("/imeiA53", async(req,res)=>{
  const imeiNumber = req.body.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent();

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {

    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);
    const nam = parseInt(ngayKichHoat.year);

    const modelMay = result.data.Item.ModelCode;
    
    //print
    console.log("Model May: " + modelMay + " Date: " + ngay.toString() + "-" + thang.toString());

    if (modelMay.search("SM-A536") != -1)
    {
      const resp = {
        imei: result.data.Item.Imei,
        model: result.data.Item.ModelCode,
        ngayKichHoat: ngayKichHoat.content,
        content: "",
      };

      if (thang == 3 && ngay >= 25) {
      
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }

      else if (thang >= 4 && nam == 2022){
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }
  
      else  {
        resp.content = "KH??NG TH???A ??I???U KI???N";
        return res.status(200).json({
          success: true,
          data: resp,
        });
      }

    }

  }

})

/////// Check Imei A73

router.post("/imeiA73", async(req,res)=>{
  const imeiNumber = req.body.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent();

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {

    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);
    const nam = parseInt(ngayKichHoat.year);

    const modelMay = result.data.Item.ModelCode;
    
    //print
    console.log("Model May: " + modelMay + " Date: " + ngay.toString() + "-" + thang.toString());

    if (modelMay.search("SM-A736") != -1)
    {
      const resp = {
        imei: result.data.Item.Imei,
        model: result.data.Item.ModelCode,
        ngayKichHoat: ngayKichHoat.content,
        content: "",
      };

      if (thang == 4 && ngay >= 21) {
      
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }

      else if (thang == 5 && nam == 2022){
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }
  
      else  {
        resp.content = "KH??NG TH???A ??I???U KI???N";
        return res.status(200).json({
          success: true,
          data: resp,
        });
      }

    }

  }

})

///////



/////// Check Imei A33

router.post("/imeiA33", async(req,res)=>{
  const imeiNumber = req.body.imei;
  const url = `https://csone.vn/api/mcs?ownerType=3&owner=0911111111&imei=${imeiNumber}`;

  const firstUserAgent = new userAgent();

  const result = await axios.get(url, {
    headers: { "User-Agent": firstUserAgent.toString() },
  });

  if (result.data.Item.Message == "Not yet activated") {
    res.status(200).json({
      status: "fail",
      message: "Kh??ng c?? imei " + imeiNumber + " trong h??? th???ng",
    });
  } else if (result.data.Item.Message == "Activated") {

    const ngayKichHoat = convertToDate(result.data.Item.SurveyDate);
    const ngay = parseInt(ngayKichHoat.date);
    const thang = parseInt(ngayKichHoat.month);
    const nam = parseInt(ngayKichHoat.year);

    const modelMay = result.data.Item.ModelCode;
    
    //print
    console.log("Model May: " + modelMay + " Date: " + ngay.toString() + "-" + thang.toString());

    if (modelMay.search("SM-A336") != -1)
    {
      const resp = {
        imei: result.data.Item.Imei,
        model: result.data.Item.ModelCode,
        ngayKichHoat: ngayKichHoat.content,
        content: "",
      };

      if (thang == 4 && ngay >= 22) {
      
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }

      else if (thang == 5 && nam == 2022){
        const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
        if (checkExists == false) {
          //update content
          resp.content = "Imei X???n. ???? Th??m V??o Database";
  
          //chua co du lieu. Them vao database
          const duLieuImei = new imeiGiftModel();
          duLieuImei.imei = resp.imei;
          duLieuImei.model = resp.model;
          duLieuImei.ngayKichHoat = resp.ngayKichHoat;
          duLieuImei.content = resp.content;
  
          duLieuImei.save();
        } else {
          resp.content = "Imei ???? C?? Trong Database R???i !!!";
        }
  
        return res.json({
          success: true,
          data: resp,
        });
      }
  
      else  {
        resp.content = "KH??NG TH???A ??I???U KI???N";
        return res.status(200).json({
          success: true,
          data: resp,
        });
      }

    }

  }

})

///////



router.get("/getAllImei", async (req, res) => {
  const allListImei = await imeiGiftModel.find();
  const countAllList = await imeiGiftModel.countDocuments();

  res.json({
    success: true,
    data: allListImei,
    count: countAllList,
  });
});

router.post("/setImei", async (req, res) => {
  //init
  const imei = req.body.imei;
  const model = req.body.model;
  const ngayKichHoat = req.body.ngayKichHoat;

  const resp = {
    imei: imei,
    model: model,
    ngayKichHoat: ngayKichHoat.content,
    content: "",
  };

  const checkExists = await imeiGiftModel.exists({ imei: resp.imei });
  if (checkExists == false) {
    const duLieuImei = new imeiGiftModel();
    //set
    duLieuImei.imei = imei;
    duLieuImei.model = model;
    duLieuImei.ngayKichHoat = ngayKichHoat;
    duLieuImei.content = "Imei X???n. ???? Th??m V??o Database";
    resp.content = duLieuImei.content;
    //save
    duLieuImei.save();

    return res.status(200).json({
      success: true,
      data: resp,
    });
  } else {
    resp.content = "Imei ???? C?? Trong H??? Th???ng R???i !!!";
    return res.status(200).json({
      success: true,
      data: resp,
    });
  }
});

function convertToDate(input) {
  var onlyDate = input.slice(input.length - 2, input.length);
  var onlyMonth = input.slice(input.length - 4, input.length - 2);
  var onlyYear = input.slice(0, 4);

  var chuanHoa = onlyDate + "/" + onlyMonth + "/" + onlyYear;

  var result = {
    date: onlyDate,
    month: onlyMonth,
    year: onlyYear,
    content: chuanHoa,
  };

  return result;
}

router.post("/setCauHinhFake", async (req, res) => {
  let newCauHinh = new cauHinhFakeModel();

  //init
  const appVersion = req.body.appVersion;
  const isFakeAppRandom = req.body.isFakeAppRandom;
  const CFBundleIdentifier = req.body.CFBundleIdentifier;
  const owner = req.body.owner;

  //set
  newCauHinh.appVersion = appVersion;
  newCauHinh.isFakeAppRandom = isFakeAppRandom;
  newCauHinh.owner = owner;
  newCauHinh.CFBundleIdentifier = CFBundleIdentifier;

  //save
  newCauHinh.save();

  res.json({
    success: true,
    data: newCauHinh,
  });
});

router.get("/getCauHinhFake&owner=:owner", async (req, res) => {

  const infoGetCauHinh = await cauHinhFakeModel
    .find({ owner: req.params.owner })
    .sort({ _id: -1 });

  if (infoGetCauHinh) {
    res.json(infoGetCauHinh);
  } else {
    res.json({
      status: "fail",
      data: null,
    });
  }
});

router.get("/danhSachDiaChi&soLuong=:soLuong", async (req, res) => {

  num = req.params.soLuong;

  var result = "";
  for (var i = 0; i < num; i++) {
    const dataDinhDangDiaChi = fs
      .readFileSync("./config/dinhDangDiaChi.txt", "utf-8")
      .toString()
      .split("\n");
    let indexDinhDangDiaChi = Math.floor(
      Math.random() * dataDinhDangDiaChi.length
    );

    const diaChiTemp = dataDinhDangDiaChi[indexDinhDangDiaChi];

    const listTenDuong = fs
      .readFileSync("./config/tenDuongVN.txt", "utf-8")
      .toString()
      .split("\n");
    const tenDuongRandom =
      listTenDuong[[getRndInteger(0, listTenDuong.length)]].trim();

    const soNhaRandom = getRndInteger(1, 100).toString();

    const diaChiTemp1 = diaChiTemp.replace("ABC", tenDuongRandom);
    const diaChiTemp2 = diaChiTemp1.replace("ABC", tenDuongRandom);
    const diaChiTemp3 = diaChiTemp2.replace("123", soNhaRandom).trim();

    console.log(diaChiTemp3);

    address = diaChiTemp3;

    result += address
    result += "<br/>"
  }

  res.send(result)



})

router.post("/checkSoLuongImei", async (req,res) =>{
  const tenMauMay = req.body.modelMay;
  

  const listImei = await imeiGiftModel.find({model: {$regex: tenMauMay, $options: 'i'}}).exec();
  console.log("helo: " + listImei.length)
  res.json({total: listImei.length})
})

module.exports = router;
