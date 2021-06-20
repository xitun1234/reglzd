var express = require('express');
const router = express.Router();
const deviceModel = require('../../models/DeviceModel');

router.use((req, res, next) => {
  if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
  next();
});

router.get('/', async function (req, res) {
  console.log(req.owner);
  const listDevice = await deviceModel.find({owner: req.owner}).exec((err, result) => {
    
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
module.exports = router;
