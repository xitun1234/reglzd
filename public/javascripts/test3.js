const Utils = require('https://reglzd.herokuapp.com/javascripts/Utils.js');
const dataAccount = require('https://reglzd.herokuapp.com/javascripts/DataAccountModel.js');
const Config = require('./Config.js');
const { touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp } = at



function main() {

    const utilHelper = new Utils();
    const newdataAccount = new dataAccount();

    const ip = "192.168.1.2";
    const port = "5001" + Config.port;
    const deviceName = Config.deviceName;

    const label = { type: CONTROLLER_TYPE.LABEL, text: "Tool Lazada" }
    const deviceNameInput = { type: CONTROLLER_TYPE.INPUT, title: "Máy:", key: "deviceName", value: deviceName }

    const btnOpenApp = { type: CONTROLLER_TYPE.BUTTON, title: "Mo App Lazada Va Dang Nhap", width: 0.8, flag: 1, collectInputs: true }
    const btnLogin = { type: CONTROLLER_TYPE.BUTTON, title: "Dang Nhap LZD", color: 0x71C69E, width: 0.6, flag: 2, collectInputs: true }
    const btnAddr1 = { type: CONTROLLER_TYPE.BUTTON, title: "Dien Dia Chi TH1", color: 0xFF5733, width: 0.8, flag: 3, collectInputs: true }
    const btnAdd2 = { type: CONTROLLER_TYPE.BUTTON, title: "Dien Dia Chi TH2", color: 0xd18813, width: 0.9, flag: 4, collectInputs: true }
    const btnCollect = { type: CONTROLLER_TYPE.BUTTON, title: "Suu Tam Voucher", color: 0x6438b5, width: 1.0, flag: 5, collectInputs: true }
    const btnThoatTool = { type: CONTROLLER_TYPE.BUTTON, title: "Thoat Tool", color: 0x010105, width: 1.0, flag: 6, collectInputs: true }

    const controls = [label, deviceNameInput, btnOpenApp, btnLogin, btnAddr1, btnAdd2, btnCollect, btnThoatTool]

    const orientations = [INTERFACE_ORIENTATION_TYPE.PORTRAIT, INTERFACE_ORIENTATION_TYPE.LANDSCAPE_LEFT, INTERFACE_ORIENTATION_TYPE.LANDSCAPE_RIGHT];

    const result = at.dialog({ controls, orientations });

    if (result == 1) {
        //get data
        utilHelper.thongBao("Get Data May: " + deviceNameInput.value);
        newdataAccount.getData(deviceNameInput.value);
        at.usleep(1000000);
        
        utilHelper.thongBao("Thuc hien mo app LZD");
        newdataAccount.openAppLZD();

        at.usleep(3000000);
        newdataAccount.loginLZD();

    } else if (result == 2) {
        //get data
        utilHelper.thongBao("Get Data May: " + deviceNameInput.value);
        newdataAccount.getData(deviceNameInput.value);
        at.usleep(1000000);

        newdataAccount.loginLZD();
    } else if (result == 3) {
        //get data
        utilHelper.thongBao("Get Data May: " + deviceNameInput.value);
        newdataAccount.getData(deviceNameInput.value);
        at.usleep(1000000);

        newdataAccount.diaChiTH1();

    } else if (result == 4) {

        //get data
        utilHelper.thongBao("Get Data May: " + deviceNameInput.value);
        newdataAccount.getData(deviceNameInput.value);
        at.usleep(1000000);

        newdataAccount.dienDiaChiTH2();


    } else if (result == 5) {
        //get data
        utilHelper.thongBao("Thuc hien suu tam voucher");
        newdataAccount.suuTamVoucher();

    } else if (result == 6) {

    }

}


module.exports = {main};

