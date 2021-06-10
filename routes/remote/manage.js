var express = require('express');
const router = express.Router();
const deviceModel = require('../../models/DeviceModel');
const scriptModel = require('../../models/ScriptModel');
const axios = require('axios');

router.get('/', async function (req, res) {
  const listDevice = await deviceModel.find();
  const listScriptLazada = await scriptModel.find({
    scriptType: 'Lazada',
  });
  const listScriptFacebook = await scriptModel.find({
    scriptType: 'Facebook',
  });
  const listScriptXoaInfo = await scriptModel.find({
    scriptType: 'XoaDuLieu',
  });
  const listScriptInputData = await scriptModel.find({
    scriptType: 'InputData',
  });

  const listScriptYeuThich = await scriptModel.find({
    scriptType: 'YeuThich',
  });

  res.render('remote/manage', {
    userData: req.user,
    RemoteSlideBarActive: true,
    active: {
      manage: true,
    },
    listDevice: listDevice,
    listScriptLazada: listScriptLazada,
    listScriptFacebook: listScriptFacebook,
    listScriptXoaInfo: listScriptXoaInfo,
    listScriptInputData: listScriptInputData,
    listScriptYeuThich: listScriptYeuThich
  });
});

router.post('/playScript', async function (req, res) {
  const url = "http://" + req.body.ipAddress + ":8080/control/start_playing?path=" + req.body.duongDan;

  const result = await axios.get(url);

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
  });



  res.status(200).json({
    status: true,
    data: 'ok'
  });
});

module.exports = router;
