var express = require('express');
const router = express.Router();
const deviceModel = require('../../models/DeviceModel');
const scriptModel = require('../../models/ScriptModel');
const axios = require('axios');

router.use((req, res, next) => {
  if (req.user) { req.owner = req.user.username; } else { req.owner = 'anonymous'; }
  next();
});

router.get('/', async function (req, res) {
  const listDevice = await deviceModel.find({owner: req.owner, isChoice: true});
  const listScriptLazada = await scriptModel.find({
    scriptType: 'Lazada',
    owner: req.owner
  });
  const listScriptFacebook = await scriptModel.find({
    scriptType: 'Facebook',
    owner: req.owner
  });
  const listScriptXoaInfo = await scriptModel.find({
    scriptType: 'XoaDuLieu',
    owner: req.owner
  });
  const listScriptInputData = await scriptModel.find({
    scriptType: 'InputData',
    owner: req.owner
  });

  const listScriptYeuThich = await scriptModel.find({
    scriptType: 'YeuThich',
    owner: req.owner
  });

  res.render('remote/manage', {
    userData: req.user,
    RemoteSlideBarActive: true,
    active: {
      manage: true,
    },
    title:"Quản lý điều khiển máy",
    listDevice: listDevice,
    listScriptLazada: listScriptLazada,
    listScriptFacebook: listScriptFacebook,
    listScriptXoaInfo: listScriptXoaInfo,
    listScriptInputData: listScriptInputData,
    listScriptYeuThich: listScriptYeuThich
  });
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}  

router.post('/playScript', async function (req, res) {
  const url = "http://" + req.body.ipAddress + ":8080/control/start_playing?path=" + req.body.duongDan;

  const result = await axios.get(url);
  console.log("Chờ 1s")
  sleep(1)

  res.status(200).json({
    status: true,
    data: result.data
  });
});



router.post('/playAllScript', async function (req, res) {

  const listDevice = await deviceModel.find();
  var duongDan = req.body.duongDan;
  console.log(duongDan);

  listDevice.forEach(element => {
    const url = "http://" + element.ipAddress + ":8080/control/start_playing?path=" + duongDan;

    const result = axios.get(url);
    sleep(1)
  });



  res.status(200).json({
    status: true,
    data: 'ok'
  });
});

module.exports = router;
