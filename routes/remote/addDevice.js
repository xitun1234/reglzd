var express = require('express');
const router = express.Router();
const deviceModel = require('../../models/DeviceModel');
const KhoDuLieu = require('../../models/KhoDuLieuModel');

router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = 'anonymous';
  }
  next();
});

router.get('/', async function (req, res) {
  console.log(req.owner);
  const listDevice = await deviceModel
    .find({owner: req.owner})
    .exec((err, result) => {
      res.render('remote/addDevice', {
        userData: req.user,
        RemoteSlideBarActive: true,
        active: {
          addDevice: true,
        },
        listDevice: result,
      });
    });
});

router.post('/addThietBi', async function (req, res) {
  let newDevice = new deviceModel();

  newDevice.deviceName = req.body.deviceName;
  newDevice.ipAddress = req.body.ipAddress;
  newDevice.isChoice = false;
  newDevice.owner = req.owner;

  newDevice.save().then((result) => {
    res.status(200).json({
      success: true,
      data: result,
      msg: 'Thêm ' + newDevice.deviceName + ' thành công',
    });
  });
});

router.post('/deleteThietBi', async (req, res) => {
  const result = await deviceModel.deleteMany({owner: req.owner});

  res.status(200).json({
    success: true,
    msg: 'Da xoa toan bo du lieu',
    data: result,
  });
});

router.post('/updateThietBi', async (req, res) => {
  const filter = {_id: req.body.deviceID, owner: req.owner};

  const update = {
    isChoice: false,
  };

  let temp = await deviceModel.findOne(filter);
  if (temp.isChoice == false) {
    update.isChoice = true;
    const doc = await deviceModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  } else if (temp.isChoice == true) {
    update.isChoice = false;
    const doc = await deviceModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  }

  // let doc = await KhoDuLieu.findOneAndUpdate(filter, update, {
  //   new: true,
  // });

  res.status(200).json({
    success: true,
    msg: 'Da xoa toan bo du lieu',
    data: temp,
  });
});
module.exports = router;
