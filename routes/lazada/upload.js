var express = require('express');
const router = express.Router();
const accountModel = require('../../models/LazadaAccountModel');
const deviceModel = require('../../models/DeviceModel');
const multer = require('multer');
const fs = require('fs');
router.use((req, res, next) => {
  if (req.user) {
    req.owner = req.user.username;
  } else {
    req.owner = req.user.username;
  }
  next();
});



// router.get('/', async function(req, res) {
//   const testFolder = './public/scripts';
//   var file= fs.readdirSync(testFolder);
  
//   var testArray = [];
//   (file).forEach(item => {
//     testArray.push(item);
//   });
//   console.log(testArray);
//   res.render('lazada/upload', {
//     userData: req.user,
//     UploadSlideBarActive: true,
//     lazadaSubMenuUploadActive: true,
//     listFile : testArray
//   });
// });

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, path.join(__dirname, '/uploads'));
//   },
// });

// var upload = multer({dest: 'uploads/'});

// router.post('/upload', upload.single('avatar'), (req, res) => {
//   console.log(req.fieldname, req.body);
//   //   let file = req.files.file;
//   //   let uploadedfile = file.filename;
//   //   console.log(uploadedfile);
//   res.json('File uploaded successfully');
//   //   if (uploadedfile) {
//   //     res.json('File uploaded successfully');
//   //   }
// });

module.exports = router;
