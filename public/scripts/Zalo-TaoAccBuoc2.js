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


    appActivate("vn.com.vng.zingalo");


    touchDown(1, 257.62, 350.68);
    usleep(67814.00);
    touchUp(1, 257.62, 350.68);
    usleep(1149093.71);

    touchDown(5, 187.82, 1073.55);
    usleep(84381.04);
    touchMove(5, 184.74, 1045.06);
    usleep(16631.12);
    touchMove(5, 184.74, 1029.77);
    usleep(16656.42);
    touchMove(5, 185.77, 1004.33);
    usleep(16848.54);
    touchMove(5, 187.82, 979.88);
    usleep(16507.25);
    touchUp(5, 189.88, 947.31);
    usleep(1583415.75);

    touchDown(4, 191.93, 1093.93);
    usleep(66673.67);
    touchMove(4, 187.82, 1069.48);
    usleep(16825.33);
    touchMove(4, 187.82, 1054.22);
    usleep(16601.83);
    touchMove(4, 187.82, 1037.93);
    usleep(16592.46);
    touchMove(4, 184.74, 1021.63);
    usleep(16654.50);
    touchMove(4, 179.62, 1004.33);
    usleep(15486.83);
    touchUp(4, 175.51, 1000.26);
    usleep(2151675.25);

    touchDown(3, 359.23, 1080.68);
    usleep(83085.42);
    touchMove(3, 362.31, 1061.34);
    usleep(16621.67);
    touchMove(3, 362.31, 1049.13);
    usleep(16671.88);
    touchMove(3, 362.31, 1030.79);
    usleep(16694.71);
    touchMove(3, 362.31, 1013.49);
    usleep(16706.00);
    touchMove(3, 362.31, 995.17);
    usleep(16627.67);
    touchMove(3, 362.31, 981.94);
    usleep(16579.42);
    touchMove(3, 362.31, 967.67);
    usleep(16713.83);
    touchUp(3, 366.42, 953.42);
    usleep(2232626.25);

    touchDown(6, 561.44, 1061.34);
    usleep(51112.21);
    touchMove(6, 557.33, 1051.16);
    usleep(16518.29);
    touchMove(6, 557.33, 1039.97);
    usleep(16575.38);
    touchMove(6, 555.28, 1026.72);
    usleep(16764.46);
    touchMove(6, 554.25, 1013.49);
    usleep(16561.00);
    touchMove(6, 554.25, 1000.26);
    usleep(16646.71);
    touchMove(6, 554.25, 979.88);
    usleep(16682.33);
    touchUp(6, 558.36, 953.42);
    usleep(2867113.71);

    touchDown(2, 421.84, 1244.60);
    usleep(198442.12);
    touchUp(2, 421.84, 1244.60);
    usleep(2167163.46);

    touchDown(2, 395.15, 1249.69);
    usleep(133189.50);
    touchUp(2, 395.15, 1249.69);
    usleep(2918274.08);

    touchDown(1, 402.34, 1077.63);
    usleep(115219.25);
    touchUp(1, 402.34, 1077.63);
    usleep(2484762.42);

    touchDown(5, 168.32, 66.62);
    usleep(115239.00);
    touchUp(5, 168.32, 66.62);
    usleep(1500257.79);

    touchDown(4, 532.70, 759.98);
    usleep(199992.58);
    touchUp(4, 532.70, 759.98)

}

module.exports = {main};