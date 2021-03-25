const Utils = require('./Utils.js');
const dataAccount = require('./DataAccountModel.js');
const Config = require('./Config.js');
const { touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp } = at


function main() {
    const utilHelper = new Utils();
    const newdataAccount = new dataAccount();

    const ip = "192.168.1.2";
    const port = "500" + Config.port;
    const deviceName = Config.deviceName;

    //get data
    utilHelper.thongBao("Get Data May: " + deviceName);
    newdataAccount.getData(deviceName);
    at.usleep(1000000);

    utilHelper.thongBao("Thuc hien reset Zalopay");
    newdataAccount.resetZaloPay();

    //DangNhap OTP
    utilHelper.thongBao("Thuc hien dang nhap by otp - Zalopay");
    newdataAccount.runZaloPayByOTP();

}

module.exports = {main};
