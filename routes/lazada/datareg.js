var express = require('express');
const router = express.Router();
const lzdFBTempModel = require('../../models/LzdFbModelTemp');
const deviceModel = require('../../models/DeviceModel');
const utilsHelper = require('../../utils/UtilsHelper');
router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = 'anonymous';
  }
  next();
});

router.get('/', async function (req, res) {
  const dataReg = await lzdFBTempModel
    .find({status: 'true'})
    .exec((err, result) => {
      res.render('lazada/datareg', {
        userData: req.user,
        LazadaSlideBarActive: true,
        lazadaSubMenuAccountDataRegActive: true,
        listAccount: result,
      });
    });
});

router.post('/export', async (req, res, next) => {
  const d = new Date();
  const today = d.getDate();
  const currentMonth = d.getMonth() + 1; 
  const formartDate = today.toString() + currentMonth.toString();
  const pathExcel = `download/lazada_${formartDate}.xlsx`;
  const dataExcel = [];

  const dataReg = await lzdFBTempModel
    .find({status: 'true'})
    .exec((err, result) => {
      result.forEach((rowExcel) => {
        const dataExtract = {
          'Username': rowExcel.phoneNumber,
          'Password': rowExcel.passwordLZD,
          'UID': rowExcel.uid,
            
          'Thiết Bị Tạo': rowExcel.deviceName,
          'Trạng Thái': rowExcel.status,
          'Thời Gian': rowExcel.created

        };

        if (dataExcel.length == 0) {
          dataExcel.push(Object.keys(dataExtract));
        }

        dataExcel.push(Object.values(dataExtract));

        utilsHelper.renderExcel(pathExcel, dataExcel);
      });

    });

  // const dataExtract = {
  //   Username: 'test',
  //   Password: 'test',
  //   UID: '123123123',
  //   'Mật khẩu FB': 'Nghia2612',
  //   'Thiết Bị Tạo': '1',
  //   'Trạng Thái': true,
  // };
  // if (dataExcel.length == 0) {
  //   dataExcel.push(Object.keys(dataExtract));
  // }
  // dataExcel.push(Object.values(dataExtract));
  // utilsHelper.renderExcel(pathExcel, dataExcel);
  res.json({
    success: true,
    pathExcel,
  });
});

module.exports = router;
