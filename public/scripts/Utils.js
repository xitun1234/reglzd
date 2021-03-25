const axios = require('axios');
const { appRun, appKill, appState, appInfo } = at;
const { touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp } = at


class ATHelper {
    constructor() {

    }

    findMau(x, y, maMau, soLanLap) {
        const resp = {
            success: false,
            data: {
                x: '',
                y: ''
            }
        }

        for (var i = 0; i < soLanLap; i++) {
            at.toast(`Find mau lan ${i + 1}`, 'bottom', 1);
            at.usleep(1000000);
            const [result, error] = at.getColor(x, y);

            if (result[0] == maMau) {
                resp.success = true;
                resp.data.x = x;
                resp.data.y = y;
                break;
            }
            at.usleep(2000000);
        }

        return resp;
    }

    findClick(options, duration, interval) {
        let index = 0;

        at.findColors({
            options,
            duration: duration,
            interval: interval,
            exitIfFound: true,
            eachFindingCallback: () => {
                at.toast(`Cho ${index + 1}s`, 1);
                at.usleep(1200000);
                index += 1;
            },
            foundCallback: result => { // OPTIONAL, will call this function while getting matched result, returns the rectangle coordinate matching the action you specified through `matchMethod`.

                at.toast(`Find and click`, 1);
                at.usleep(1500000);
                at.tap(result[0]['x'], result[0]['y']);
            },
            errorCallback: error => { // OPTIONAL, handle any error, will exit findColors if got error, if no errorCallback provide, it will alert while getting error.
                alert(error)
            },
            completedCallback: () => { // OPTIONAL, callback when all finding completed

            },
            block: true, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
        })
    }

    findToaDo(options, soLanLap) {
        const resp = {
            success: false,
            data: ''
        }
        for (var i = 0; i < soLanLap; i++) {

            at.toast(`Find icon lan ${i + 1}`, 'bottom', 1);
            const [result, error] = at.findColors(options);

            if (result[0]) {
                resp.success = true;
                resp.data = result[0];
                break;
            }
            at.usleep(1200000);


        }
        return resp;
    }

    findToaDoVer1(options, soLanLap, x, y, msg) {
        const resp = {
            success: false,
            data: ''
        }
        for (var i = 0; i < soLanLap; i++) {

            at.toast(`Find icon lan ${i + 1}`, 1);
            const [result, error] = at.findColors(options);

            if (result[0]) {
                resp.success = true;
                resp.data = result[0];
                break;
            }
            at.usleep(1200000);


        }

        if (resp.success == true) {
            this.thongBao(msg);
            at.tap(resp.data.x, resp.data.y);
            at.usleep(1000000);
        }
        else {
            at.tap(x, y);
            at.usleep(1000000);
        }
    }

    keyPress(keyType) {
        at.keyDown(keyType)
        at.usleep(10000)
        at.keyUp(keyType)
    }
    test() {
        alert('ok');
    }

    runXoaInfo() {
        at.toast('Run Xoa Info', 1);
        at.appRun("com.ienthach.XoaInfo");
        this.delayCus(2);

        //config button ResetData
        const optionResetData = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 16777215, x: 0, y: 0 },
                { color: 16777215, x: 1, y: 51 },
                { color: 16777215, x: 64, y: 52 },
                { color: 16777215, x: 63, y: 1 },
                { color: 16618503, x: 35, y: 22 },
                { color: 16618761, x: 18, y: 22 },
                { color: 16620052, x: 74, y: 20 },
                { color: 16777215, x: 37, y: 30 },
                { color: 16618503, x: 35, y: 29 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 387.68, y: 175.35, width: 317.96, height: 147.89 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }

        //find btn ResetData
        const findBtnResetData = this.findToaDo(optionResetData, 5);

        if (findBtnResetData.success == true) {
            this.thongBao('Click');
            at.tap(findBtnResetData.data.x, findBtnResetData.data.y);
        }
        else {
            at.tap(527, 222);
        }

        //config icon Done
        at.usleep(3000000);
        this.thongBao("Cho 5s");
        this.delayCus(4);


    }

    turnOffWifi() {
        at.toast('Turn off wifi', 1);
        at.usleep(1000000);

        at.touchDown(2, 373.60, 15.71);
        at.usleep(99080.04);
        at.touchUp(2, 373.60, 15.71);
        at.usleep(250919.75);

        at.touchDown(2, 382.84, 9.61);
        at.usleep(83448.71);
        at.touchUp(2, 382.84, 9.61);

        at.usleep(1000000);
        at.touchDown(3, 523.46, 143.99);
        at.usleep(84822.04);
        at.touchMove(3, 527.56, 134.83);
        at.usleep(16693.08);
        at.touchMove(3, 529.62, 122.62);
        at.usleep(16649.67);
        at.touchMove(3, 535.78, 106.34);
        at.usleep(16619.92);
        at.touchMove(3, 546.04, 85.96);
        at.usleep(16685.62);
        at.touchMove(3, 554.25, 65.60);
        at.usleep(16369.88);
        at.touchMove(3, 559.39, 47.29);
        at.usleep(16720.08);
        at.touchMove(3, 567.59, 27.93);
        at.usleep(16667.33);
        at.touchMove(3, 581.97, 7.57);
        at.usleep(15554.54);
        at.touchUp(3, 586.07, 3.50);
    }
    turnOnWifi() {
        at.toast('Turn on wifi', 1);
        at.usleep(1000000);

        at.touchDown(2, 373.60, 15.71);
        at.usleep(99080.04);
        at.touchUp(2, 373.60, 15.71);
        at.usleep(250919.75);

        at.touchDown(2, 382.84, 9.61);
        at.usleep(83448.71);
        at.touchUp(2, 382.84, 9.61);

        at.usleep(1000000);
        at.touchDown(3, 523.46, 143.99);
        at.usleep(84822.04);
        at.touchMove(3, 527.56, 134.83);
        at.usleep(16693.08);
        at.touchMove(3, 529.62, 122.62);
        at.usleep(16649.67);
        at.touchMove(3, 535.78, 106.34);
        at.usleep(16619.92);
        at.touchMove(3, 546.04, 85.96);
        at.usleep(16685.62);
        at.touchMove(3, 554.25, 65.60);
        at.usleep(16369.88);
        at.touchMove(3, 559.39, 47.29);
        at.usleep(16720.08);
        at.touchMove(3, 567.59, 27.93);
        at.usleep(16667.33);
        at.touchMove(3, 581.97, 7.57);
        at.usleep(15554.54);
        at.touchUp(3, 586.07, 3.50);
    }
    turnOffLte() {
        at.toast('Turn off LTE', 1);
        this.keyPress(KEY_TYPE.VOLUME_UP_BUTTON);
        at.toast(`Cho 3s`);
        at.usleep(3000000);


    }
    turnOnLte() {
        at.toast('Turn on LTE', 1);
        this.keyPress(KEY_TYPE.VOLUME_UP_BUTTON);
        at.toast(`Cho 5s`);
        at.usleep(5000000);
    }
    checkIP() {
        return axios.get('https://api.ipify.org/?format=json').then(resp => {
            at.toast(resp.data.ip);
            return resp.ip;
        });
    }
    delayCus(number) {
        for (var i = number; i > 0; i--) {
            at.toast(`Wait ${i} seconds.`, 1);
            at.usleep(1200000);
        }
    }
    thongBao(msg, delay = 1) {
        at.toast(msg, delay);
        let sleepTime = delay * 1000000 + 500000;
        at.usleep(sleepTime);
    }
    changeIP() {
        at.toast('Change IP start', 1);
        at.usleep(1000000);
        this.checkIP();
        at.usleep(2000000);

        this.keyPress(KEY_TYPE.HOME_BUTTON);
        at.usleep(1000000);


        at.toast('Mo tuy chon di dong', 1);
        this.keyPress(KEY_TYPE.VOLUME_UP_BUTTON);
        at.usleep(2000000);
        this.keyPress(KEY_TYPE.VOLUME_UP_BUTTON);
        this.delayCus(3);

        at.toast('Click tuy chon', 1);
        at.tap(517, 336);
        at.usleep(2000000);

        this.thongBao("Click thoai va du lieu");
        at.tap(505, 242);
        at.usleep(2000000);

        this.thongBao("Click 2G");
        at.tap(153, 448);
        this.delayCus(5);

        this.thongBao("Click 4G");
        at.tap(141, 243);
        this.delayCus(6);



    }

    removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.replace(/ + /g, " ");
        str = str.trim();

        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
    recogText(options, text, isClick) {
        const textResource = this.removeVietnameseTones(text).toLowerCase();
        at.usleep(1000000);
        at.recognizeText(options, (result, error) => {
            if (error) {
                alert(error);
            } else {
                result.forEach(item => {
                    const textResult = this.removeVietnameseTones(item.text).toLowerCase();
                    if (textResult.search(textResource) != -1) {
                        this.thongBao(`Find text: ${textResult}`);
                        const btnBam = item.rectangle.bottomRight;
                        at.tap(btnBam.x, btnBam.y);
                        at.usleep(1000000);

                    }
                })
            }
        })
    }
    timCodeGmail(options) {
        at.copyText("fail");

        at.recognizeText(options, (result, error) => {
            if (error) {
                console.log(error);
            } else {
                result.forEach(item => {

                    if (item.text.length == 6) {
                        at.copyText(item.text);
                        const text = at.clipText()
                        this.thongBao("Code: " + text);
                    }
                    else {
                        at.copyText("fail");
                    }
                    this.delayCus(2);
                })

                if (result[0] == null) {
                    at.copyText("fail");
                }

            }
        })
    }
    testReg(options) {
        at.recognizeText(options, (result, error) => {
            if (error) {
                console.log(error);
            } else {
                result.forEach(item => {

                    if (item.text.length == 6) {
                        at.copyText(item.text);
                        const text = at.clipText()
                        this.thongBao("Code: " + text);

                    }
                    else {
                        at.copyText("fail");
                    }
                    this.delayCus(2);
                })

            }
        })
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    inputMonth(month) {
        switch (month) {
            case 1:
                touchDown(3, 588.12, 1186.57);
                usleep(101270.04);
                touchMove(3, 595.31, 1172.32);
                usleep(16923.67);
                touchMove(3, 596.33, 1162.14);
                usleep(16488.75);
                touchMove(3, 598.39, 1150.95);
                usleep(16664.96);
                touchMove(3, 601.47, 1140.75);
                usleep(16703.83);
                touchMove(3, 603.52, 1131.59);
                usleep(16598.71);
                touchMove(3, 605.58, 1123.45);
                usleep(16552.58);
                touchMove(3, 606.59, 1116.32);
                usleep(16741.04);
                touchMove(3, 607.62, 1111.23);
                usleep(16734.88);
                touchMove(3, 608.65, 1105.13);
                usleep(16735.54);
                touchMove(3, 609.67, 1098.00);
                usleep(16584.62);
                touchMove(3, 610.70, 1093.93);
                usleep(16675.58);
                touchMove(3, 610.70, 1089.84);
                usleep(16604.17);
                touchMove(3, 610.70, 1086.79);
                usleep(16687.04);
                touchMove(3, 610.70, 1084.75);
                usleep(16736.75);
                touchMove(3, 610.70, 1083.73);
                usleep(16603.33);
                touchMove(3, 610.70, 1082.71);
                usleep(300132.42);
                touchUp(3, 611.73, 1082.71);
                break;
            case 2:
                touchDown(1, 589.15, 1176.39);
                usleep(68111.33);
                touchMove(1, 592.23, 1163.16);
                usleep(16635.75);
                touchMove(1, 592.23, 1154.00);
                usleep(16545.50);
                touchMove(1, 596.33, 1143.80);
                usleep(16718.67);
                touchMove(1, 600.44, 1132.61);
                usleep(16843.42);
                touchMove(1, 604.55, 1121.41);
                usleep(16610.79);
                touchMove(1, 606.59, 1111.23);
                usleep(16555.83);
                touchMove(1, 609.67, 1104.11);
                usleep(16694.08);
                touchMove(1, 611.73, 1094.95);
                usleep(16811.88);
                touchMove(1, 614.81, 1085.77);
                usleep(16694.46);
                touchMove(1, 616.86, 1076.61);
                usleep(16579.62);
                touchMove(1, 619.94, 1067.45);
                usleep(16776.71);
                touchMove(1, 623.02, 1059.31);
                usleep(16452.88);
                touchMove(1, 624.05, 1052.18);
                usleep(16656.29);
                touchMove(1, 626.09, 1046.08);
                usleep(16690.12);
                touchMove(1, 627.12, 1039.97);
                usleep(16692.83);
                touchMove(1, 628.15, 1035.90);
                usleep(16589.04);
                touchMove(1, 628.15, 1032.82);
                usleep(16672.46);
                touchMove(1, 628.15, 1030.79);
                usleep(16801.88);
                touchMove(1, 628.15, 1029.77);
                usleep(16539.12);
                touchMove(1, 628.15, 1028.75);
                usleep(148978.96);
                touchUp(1, 630.20, 1026.72);
                break;
            case 3:
                touchDown(5, 559.39, 1179.44);
                usleep(49775.88);
                touchMove(5, 562.47, 1172.32);
                usleep(16641.00);
                touchMove(5, 562.47, 1162.14);
                usleep(16648.92);
                touchMove(5, 565.54, 1149.93);
                usleep(16719.88);
                touchMove(5, 569.64, 1137.69);
                usleep(16747.04);
                touchMove(5, 573.75, 1125.48);
                usleep(16539.17);
                touchMove(5, 577.86, 1113.27);
                usleep(16716.21);
                touchMove(5, 582.98, 1102.07);
                usleep(16639.00);
                touchMove(5, 588.12, 1089.84);
                usleep(16568.62);
                touchMove(5, 592.23, 1078.64);
                usleep(16833.50);
                touchMove(5, 597.36, 1066.43);
                usleep(16709.17);
                touchMove(5, 601.47, 1054.22);
                usleep(16504.67);
                touchMove(5, 604.55, 1042.00);
                usleep(16737.50);
                touchMove(5, 607.62, 1031.81);
                usleep(16629.79);
                touchMove(5, 609.67, 1021.63);
                usleep(16653.88);
                touchMove(5, 612.75, 1014.50);
                usleep(16740.33);
                touchMove(5, 613.78, 1008.40);
                usleep(16734.67);
                touchMove(5, 614.81, 1002.29);
                usleep(16528.25);
                touchMove(5, 615.83, 997.20);
                usleep(16734.62);
                touchMove(5, 616.86, 994.15);
                usleep(16662.88);
                touchMove(5, 617.89, 991.10);
                usleep(16550.00);
                touchMove(5, 618.92, 990.08);
                usleep(16749.58);
                touchMove(5, 618.92, 988.04);
                usleep(16560.88);
                touchMove(5, 618.92, 987.02);
                usleep(132334.38);
                touchUp(5, 620.97, 987.02);

                break;
            case 4:
                touchDown(1, 596.33, 1190.64);
                usleep(66373.92);
                touchMove(1, 598.39, 1180.46);
                usleep(16654.04);
                touchMove(1, 598.39, 1171.30);
                usleep(16731.88);
                touchMove(1, 600.44, 1158.07);
                usleep(16640.71);
                touchMove(1, 604.55, 1141.77);
                usleep(16630.25);
                touchMove(1, 609.67, 1125.48);
                usleep(16880.58);
                touchMove(1, 612.75, 1113.27);
                usleep(16457.54);
                touchMove(1, 614.81, 1100.04);
                usleep(16595.71);
                touchMove(1, 617.89, 1087.80);
                usleep(16797.75);
                touchMove(1, 619.94, 1076.61);
                usleep(16583.42);
                touchMove(1, 622.00, 1065.41);
                usleep(16768.62);
                touchMove(1, 626.09, 1053.20);
                usleep(16832.00);
                touchMove(1, 629.17, 1042.00);
                usleep(16437.29);
                touchMove(1, 631.23, 1031.81);
                usleep(16802.12);
                touchMove(1, 634.31, 1021.63);
                usleep(16804.71);
                touchMove(1, 637.39, 1011.45);
                usleep(16432.08);
                touchMove(1, 641.50, 999.24);
                usleep(16660.08);
                touchMove(1, 645.60, 987.02);
                usleep(16781.71);
                touchMove(1, 648.67, 974.79);
                usleep(16568.88);
                touchMove(1, 649.70, 966.65);
                usleep(16629.12);
                touchMove(1, 651.76, 959.52);
                usleep(16789.25);
                touchMove(1, 652.78, 953.42);
                usleep(16616.58);
                touchMove(1, 653.81, 948.33);
                usleep(16656.00);
                touchMove(1, 654.84, 943.24);
                usleep(16749.00);
                touchMove(1, 655.86, 940.19);
                usleep(16612.04);
                touchMove(1, 656.89, 938.15);
                usleep(16646.04);
                touchMove(1, 656.89, 937.13);
                usleep(16747.71);
                touchMove(1, 656.89, 936.12);
                usleep(33285.58);
                touchMove(1, 656.89, 935.10);
                usleep(216843.88);
                touchUp(1, 659.97, 933.06);

                break;
            case 5:
                touchDown(2, 546.04, 1232.39);
                usleep(99806.29);
                touchMove(2, 556.31, 1204.91);
                usleep(16739.38);
                touchMove(2, 556.31, 1193.69);
                usleep(16539.58);
                touchMove(2, 557.33, 1180.46);
                usleep(16734.00);
                touchMove(2, 561.44, 1167.23);
                usleep(16730.58);
                touchMove(2, 564.51, 1155.02);
                usleep(16649.08);
                touchMove(2, 567.59, 1142.78);
                usleep(16591.92);
                touchMove(2, 571.70, 1129.55);
                usleep(16558.92);
                touchMove(2, 574.78, 1118.36);
                usleep(16703.96);
                touchMove(2, 577.86, 1108.18);
                usleep(16748.88);
                touchMove(2, 580.94, 1095.97);
                usleep(16574.08);
                touchMove(2, 585.04, 1082.71);
                usleep(16696.96);
                touchMove(2, 589.15, 1069.48);
                usleep(16730.62);
                touchMove(2, 594.28, 1053.20);
                usleep(16644.33);
                touchMove(2, 598.39, 1040.99);
                usleep(16581.83);
                touchMove(2, 602.50, 1026.72);
                usleep(16802.96);
                touchMove(2, 605.58, 1012.47);
                usleep(16572.08);
                touchMove(2, 609.67, 999.24);
                usleep(16701.42);
                touchMove(2, 613.78, 986.01);
                usleep(16724.88);
                touchMove(2, 616.86, 972.76);
                usleep(16538.42);
                touchMove(2, 618.92, 962.58);
                usleep(16765.04);
                touchMove(2, 619.94, 954.44);
                usleep(16673.17);
                touchMove(2, 622.00, 947.31);
                usleep(16652.25);
                touchMove(2, 623.02, 941.21);
                usleep(16635.67);
                touchMove(2, 624.05, 937.13);
                usleep(16740.08);
                touchMove(2, 625.08, 934.08);
                usleep(16608.46);
                touchMove(2, 625.08, 931.03);
                usleep(16652.54);
                touchMove(2, 625.08, 928.99);
                usleep(16745.25);
                touchMove(2, 626.09, 926.96);
                usleep(16620.79);
                touchMove(2, 626.09, 924.90);
                usleep(16662.12);
                touchMove(2, 627.12, 921.85);
                usleep(16630.29);
                touchMove(2, 628.15, 917.78);
                usleep(16581.75);
                touchMove(2, 630.20, 911.67);
                usleep(16739.00);
                touchMove(2, 632.25, 905.56);
                usleep(16716.12);
                touchMove(2, 633.28, 899.46);
                usleep(16562.71);
                touchMove(2, 635.34, 893.35);
                usleep(16715.79);
                touchMove(2, 636.36, 888.26);
                usleep(16715.62);
                touchMove(2, 637.39, 885.21);
                usleep(16623.00);
                touchMove(2, 637.39, 882.15);
                usleep(16739.12);
                touchMove(2, 637.39, 880.12);
                usleep(16727.83);
                touchMove(2, 637.39, 878.08);
                usleep(16652.79);
                touchMove(2, 637.39, 877.07);
                usleep(382253.42);
                touchUp(2, 639.44, 877.07);
                break;
            case 6:
                touchDown(6, 533.72, 1197.76);
                usleep(33037.21);
                touchMove(6, 537.83, 1188.60);
                usleep(16829.25);
                touchMove(6, 537.83, 1176.39);
                usleep(16299.33);
                touchMove(6, 541.93, 1159.09);
                usleep(16874.62);
                touchMove(6, 550.14, 1134.64);
                usleep(16803.42);
                touchMove(6, 558.36, 1108.18);
                usleep(16499.08);
                touchMove(6, 565.54, 1081.70);
                usleep(16579.08);
                touchMove(6, 569.64, 1063.38);
                usleep(16737.96);
                touchMove(6, 575.81, 1044.04);
                usleep(16559.83);
                touchMove(6, 582.98, 1021.63);
                usleep(16762.46);
                touchMove(6, 589.15, 1005.34);
                usleep(16744.54);
                touchMove(6, 595.31, 988.04);
                usleep(16645.71);
                touchMove(6, 598.39, 974.79);
                usleep(16606.33);
                touchMove(6, 601.47, 962.58);
                usleep(16734.79);
                touchMove(6, 604.55, 952.40);
                usleep(16622.08);
                touchMove(6, 607.62, 942.22);
                usleep(16670.75);
                touchMove(6, 609.67, 933.06);
                usleep(16720.92);
                touchMove(6, 611.73, 925.94);
                usleep(16648.38);
                touchMove(6, 612.75, 919.81);
                usleep(16635.42);
                touchMove(6, 613.78, 913.71);
                usleep(16733.62);
                touchMove(6, 614.81, 908.62);
                usleep(16577.54);
                touchMove(6, 615.83, 904.55);
                usleep(16856.38);
                touchMove(6, 616.86, 901.49);
                usleep(16581.50);
                touchMove(6, 617.89, 897.42);
                usleep(16605.62);
                touchMove(6, 618.92, 894.37);
                usleep(16682.29);
                touchMove(6, 618.92, 891.31);
                usleep(16740.71);
                touchMove(6, 619.94, 888.26);
                usleep(16548.75);
                touchMove(6, 619.94, 885.21);
                usleep(16668.46);
                touchMove(6, 620.97, 881.14);
                usleep(16815.75);
                touchMove(6, 622.00, 876.05);
                usleep(16559.54);
                touchMove(6, 623.02, 870.96);
                usleep(16745.46);
                touchMove(6, 624.05, 866.87);
                usleep(16860.71);
                touchMove(6, 625.08, 862.80);
                usleep(16252.08);
                touchMove(6, 626.09, 858.73);
                usleep(16763.58);
                touchMove(6, 627.12, 853.64);
                usleep(16678.71);
                touchMove(6, 627.12, 849.57);
                usleep(16593.96);
                touchMove(6, 628.15, 845.49);
                usleep(16692.75);
                touchMove(6, 629.17, 840.41);
                usleep(16722.75);
                touchMove(6, 630.20, 836.34);
                usleep(16705.08);
                touchMove(6, 630.20, 833.28);
                usleep(16655.62);
                touchMove(6, 631.23, 829.21);
                usleep(16721.83);
                touchMove(6, 631.23, 826.16);
                usleep(16610.12);
                touchMove(6, 632.25, 823.10);
                usleep(16660.42);
                touchMove(6, 632.25, 820.05);
                usleep(16773.42);
                touchMove(6, 633.28, 817.00);
                usleep(16561.42);
                touchMove(6, 634.31, 814.96);
                usleep(16713.96);
                touchMove(6, 634.31, 811.89);
                usleep(16617.17);
                touchMove(6, 635.34, 809.85);
                usleep(16688.42);
                touchMove(6, 636.36, 807.82);
                usleep(16663.75);
                touchMove(6, 637.39, 805.78);
                usleep(16711.21);
                touchMove(6, 637.39, 804.76);
                usleep(33440.88);
                touchMove(6, 637.39, 803.75);
                usleep(83300.83);
                touchMove(6, 638.42, 803.75);
                usleep(15413.75);
                touchUp(6, 642.52, 805.78);
                break;
            case 7:
                touchDown(3, 558.36, 1201.85);
                usleep(50201.58);
                touchMove(3, 563.48, 1193.69);
                usleep(16253.67);
                touchMove(3, 563.48, 1183.51);
                usleep(16901.08);
                touchMove(3, 567.59, 1167.23);
                usleep(16483.12);
                touchMove(3, 574.78, 1142.78);
                usleep(16760.58);
                touchMove(3, 584.01, 1111.23);
                usleep(16477.00);
                touchMove(3, 592.23, 1078.64);
                usleep(16716.50);
                touchMove(3, 602.50, 1044.04);
                usleep(16633.58);
                touchMove(3, 613.78, 1006.36);
                usleep(16691.92);
                touchMove(3, 626.09, 967.67);
                usleep(16780.67);
                touchMove(3, 637.39, 932.05);
                usleep(16653.04);
                touchMove(3, 642.52, 907.60);
                usleep(16660.79);
                touchMove(3, 645.60, 888.26);
                usleep(16691.96);
                touchMove(3, 646.63, 872.99);
                usleep(16550.62);
                touchMove(3, 648.67, 857.71);
                usleep(16700.88);
                touchMove(3, 651.76, 843.46);
                usleep(16790.79);
                touchMove(3, 653.81, 831.25);
                usleep(16564.25);
                touchMove(3, 655.86, 820.05);
                usleep(16811.25);
                touchMove(3, 657.92, 811.89);
                usleep(16555.21);
                touchMove(3, 659.97, 803.75);
                usleep(16721.83);
                touchMove(3, 662.02, 795.60);
                usleep(16604.04);
                touchMove(3, 664.08, 788.48);
                usleep(16721.83);
                touchMove(3, 666.13, 782.37);
                usleep(16602.42);
                touchMove(3, 667.16, 778.30);
                usleep(16695.79);
                touchMove(3, 668.19, 775.25);
                usleep(16731.54);
                touchMove(3, 668.19, 772.20);
                usleep(183471.29);
                touchMove(3, 668.19, 771.18);
                usleep(16805.38);
                touchMove(3, 669.20, 768.12);
                usleep(16344.38);
                touchMove(3, 670.23, 766.09);
                usleep(16679.04);
                touchMove(3, 671.26, 763.04);
                usleep(16702.25);
                touchMove(3, 672.28, 761.00);
                usleep(16597.50);
                touchMove(3, 673.31, 756.91);
                usleep(16704.92);
                touchMove(3, 674.34, 752.84);
                usleep(16720.29);
                touchMove(3, 675.36, 749.78);
                usleep(16646.04);
                touchMove(3, 675.36, 745.71);
                usleep(16644.96);
                touchMove(3, 675.36, 743.68);
                usleep(16709.92);
                touchMove(3, 675.36, 741.64);
                usleep(16617.08);
                touchMove(3, 675.36, 740.62);
                usleep(16658.21);
                touchMove(3, 676.39, 740.62);
                usleep(466880.12);
                touchMove(3, 677.42, 740.62);
                usleep(15411.50);
                touchUp(3, 681.53, 742.66);

                break;
            case 8:
                touchDown(4, 520.37, 1197.76);
                usleep(66640.42);
                touchMove(4, 522.43, 1188.60);
                usleep(16738.62);
                touchMove(4, 522.43, 1179.44);
                usleep(16378.58);
                touchMove(4, 523.46, 1167.23);
                usleep(16578.88);
                touchMove(4, 525.51, 1154.00);
                usleep(16858.96);
                touchMove(4, 527.56, 1141.77);
                usleep(16525.08);
                touchMove(4, 528.59, 1130.57);
                usleep(16697.08);
                touchMove(4, 529.62, 1121.41);
                usleep(16710.62);
                touchMove(4, 530.64, 1111.23);
                usleep(16572.21);
                touchMove(4, 531.67, 1102.07);
                usleep(16697.12);
                touchMove(4, 531.67, 1092.91);
                usleep(16681.38);
                touchMove(4, 531.67, 1085.77);
                usleep(16698.25);
                touchMove(4, 532.70, 1078.64);
                usleep(16661.46);
                touchMove(4, 532.70, 1071.52);
                usleep(16878.75);
                touchMove(4, 533.72, 1065.41);
                usleep(16465.46);
                touchMove(4, 534.75, 1058.29);
                usleep(16751.58);
                touchMove(4, 536.80, 1050.15);
                usleep(16668.42);
                touchMove(4, 537.83, 1044.04);
                usleep(16607.46);
                touchMove(4, 538.86, 1038.95);
                usleep(16755.62);
                touchMove(4, 539.89, 1033.84);
                usleep(16669.96);
                touchMove(4, 540.90, 1028.75);
                usleep(16572.38);
                touchMove(4, 540.90, 1022.65);
                usleep(16720.12);
                touchMove(4, 541.93, 1018.58);
                usleep(16772.71);
                touchMove(4, 541.93, 1014.50);
                usleep(16506.58);
                touchMove(4, 541.93, 1011.45);
                usleep(16742.42);
                touchMove(4, 541.93, 1006.36);
                usleep(16647.79);
                touchMove(4, 542.96, 1003.31);
                usleep(16596.79);
                touchMove(4, 542.96, 999.24);
                usleep(16647.12);
                touchMove(4, 543.98, 995.17);
                usleep(16743.12);
                touchMove(4, 545.01, 991.10);
                usleep(16656.25);
                touchMove(4, 545.01, 988.04);
                usleep(16686.38);
                touchMove(4, 546.04, 983.97);
                usleep(16770.25);
                touchMove(4, 546.04, 979.88);
                usleep(16532.12);
                touchMove(4, 547.06, 975.81);
                usleep(16774.12);
                touchMove(4, 547.06, 971.74);
                usleep(16658.38);
                touchMove(4, 547.06, 967.67);
                usleep(16656.46);
                touchMove(4, 547.06, 962.58);
                usleep(16606.62);
                touchMove(4, 547.06, 957.49);
                usleep(16728.50);
                touchMove(4, 548.09, 952.40);
                usleep(16672.88);
                touchMove(4, 549.12, 947.31);
                usleep(16598.75);
                touchMove(4, 550.14, 941.21);
                usleep(16734.25);
                touchMove(4, 550.14, 936.12);
                usleep(16635.83);
                touchMove(4, 550.14, 932.05);
                usleep(16603.50);
                touchMove(4, 551.17, 927.97);
                usleep(16813.42);
                touchMove(4, 551.17, 923.88);
                usleep(16521.79);
                touchMove(4, 552.20, 917.78);
                usleep(16688.50);
                touchMove(4, 553.22, 910.65);
                usleep(16750.29);
                touchMove(4, 554.25, 904.55);
                usleep(16626.12);
                touchMove(4, 555.28, 897.42);
                usleep(16657.54);
                touchMove(4, 555.28, 891.31);
                usleep(16705.71);
                touchMove(4, 555.28, 885.21);
                usleep(16662.00);
                touchMove(4, 556.31, 879.10);
                usleep(16633.83);
                touchMove(4, 557.33, 872.99);
                usleep(16715.50);
                touchMove(4, 557.33, 865.85);
                usleep(16669.88);
                touchMove(4, 558.36, 859.74);
                usleep(16712.83);
                touchMove(4, 559.39, 854.65);
                usleep(16643.12);
                touchMove(4, 559.39, 847.53);
                usleep(16584.71);
                touchMove(4, 560.41, 841.42);
                usleep(16660.67);
                touchMove(4, 560.41, 835.32);
                usleep(17120.25);
                touchMove(4, 561.44, 830.23);
                usleep(16277.29);
                touchMove(4, 561.44, 824.12);
                usleep(16612.79);
                touchMove(4, 561.44, 819.03);
                usleep(16736.75);
                touchMove(4, 562.47, 812.91);
                usleep(16678.83);
                touchMove(4, 562.47, 807.82);
                usleep(16603.29);
                touchMove(4, 563.48, 802.73);
                usleep(17012.88);
                touchMove(4, 564.51, 796.62);
                usleep(16315.50);
                touchMove(4, 564.51, 790.52);
                usleep(16669.62);
                touchMove(4, 565.54, 785.43);
                usleep(16732.58);
                touchMove(4, 566.56, 779.32);
                usleep(16586.54);
                touchMove(4, 567.59, 773.21);
                usleep(16690.17);
                touchMove(4, 567.59, 767.11);
                usleep(16725.38);
                touchMove(4, 568.62, 761.00);
                usleep(16602.62);
                touchMove(4, 569.64, 754.87);
                usleep(16661.21);
                touchMove(4, 570.67, 747.75);
                usleep(16764.92);
                touchMove(4, 571.70, 740.62);
                usleep(16588.38);
                touchMove(4, 572.73, 732.48);
                usleep(16631.54);
                touchMove(4, 573.75, 724.34);
                usleep(16760.08);
                touchMove(4, 574.78, 717.22);
                usleep(16575.08);
                touchMove(4, 575.81, 710.09);
                usleep(16738.25);
                touchMove(4, 577.86, 701.93);
                usleep(16690.46);
                touchMove(4, 578.89, 695.82);
                usleep(16606.00);
                touchMove(4, 579.91, 688.70);
                usleep(16704.21);
                touchMove(4, 580.94, 683.61);
                usleep(16737.71);
                touchMove(4, 580.94, 679.54);
                usleep(16622.67);
                touchMove(4, 581.97, 676.49);
                usleep(16619.83);
                touchMove(4, 581.97, 674.45);
                usleep(16706.50);
                touchMove(4, 581.97, 672.41);
                usleep(33186.46);
                touchMove(4, 581.97, 671.40);
                usleep(17109.96);
                touchMove(4, 581.97, 670.38);
                usleep(99845.25);
                touchMove(4, 582.98, 670.38);
                usleep(16742.58);
                touchMove(4, 584.01, 670.38);
                usleep(15355.12);
                touchUp(4, 588.12, 672.41);

                break;
            case 9:
                touchDown(1, 517.30, 1216.10);
                usleep(83151.21);
                touchMove(1, 519.36, 1201.85);
                usleep(16717.04);
                touchMove(1, 519.36, 1196.74);
                usleep(16640.33);
                touchMove(1, 519.36, 1187.58);
                usleep(16629.83);
                touchMove(1, 519.36, 1178.43);
                usleep(16630.50);
                touchMove(1, 519.36, 1170.28);
                usleep(16593.12);
                touchMove(1, 519.36, 1164.18);
                usleep(16875.00);
                touchMove(1, 520.37, 1159.09);
                usleep(16460.29);
                touchMove(1, 520.37, 1155.02);
                usleep(16671.79);
                touchMove(1, 520.37, 1150.95);
                usleep(16729.92);
                touchMove(1, 521.40, 1146.87);
                usleep(16625.33);
                touchMove(1, 522.43, 1142.78);
                usleep(16715.29);
                touchMove(1, 523.46, 1138.71);
                usleep(16680.75);
                touchMove(1, 524.48, 1133.62);
                usleep(16584.17);
                touchMove(1, 525.51, 1129.55);
                usleep(16815.50);
                touchMove(1, 526.54, 1125.48);
                usleep(16683.04);
                touchMove(1, 526.54, 1122.43);
                usleep(16597.75);
                touchMove(1, 526.54, 1118.36);
                usleep(16678.75);
                touchMove(1, 527.56, 1115.30);
                usleep(16728.29);
                touchMove(1, 527.56, 1110.21);
                usleep(16562.88);
                touchMove(1, 528.59, 1105.13);
                usleep(16680.54);
                touchMove(1, 529.62, 1099.02);
                usleep(16717.38);
                touchMove(1, 530.64, 1093.93);
                usleep(16610.71);
                touchMove(1, 531.67, 1088.82);
                usleep(16670.96);
                touchMove(1, 532.70, 1083.73);
                usleep(16726.04);
                touchMove(1, 533.72, 1077.63);
                usleep(16638.33);
                touchMove(1, 534.75, 1072.54);
                usleep(16630.00);
                touchMove(1, 535.78, 1066.43);
                usleep(16754.54);
                touchMove(1, 536.80, 1059.31);
                usleep(16606.88);
                touchMove(1, 537.83, 1053.20);
                usleep(16678.62);
                touchMove(1, 538.86, 1047.09);
                usleep(16712.29);
                touchMove(1, 540.90, 1040.99);
                usleep(16621.12);
                touchMove(1, 542.96, 1033.84);
                usleep(16772.04);
                touchMove(1, 543.98, 1025.70);
                usleep(16636.96);
                touchMove(1, 546.04, 1017.56);
                usleep(16587.54);
                touchMove(1, 548.09, 1010.43);
                usleep(16698.83);
                touchMove(1, 549.12, 1001.27);
                usleep(16747.21);
                touchMove(1, 551.17, 992.11);
                usleep(16555.92);
                touchMove(1, 553.22, 983.97);
                usleep(16603.29);
                touchMove(1, 555.28, 975.81);
                usleep(16849.62);
                touchMove(1, 557.33, 966.65);
                usleep(16460.08);
                touchMove(1, 560.41, 957.49);
                usleep(16867.75);
                touchMove(1, 562.47, 948.33);
                usleep(16639.58);
                touchMove(1, 565.54, 938.15);
                usleep(16619.29);
                touchMove(1, 568.62, 926.96);
                usleep(16649.42);
                touchMove(1, 572.73, 915.74);
                usleep(16729.67);
                touchMove(1, 575.81, 905.56);
                usleep(16606.83);
                touchMove(1, 577.86, 894.37);
                usleep(16678.04);
                touchMove(1, 580.94, 884.19);
                usleep(16730.58);
                touchMove(1, 582.98, 872.99);
                usleep(16576.00);
                touchMove(1, 586.07, 861.78);
                usleep(16746.42);
                touchMove(1, 588.12, 850.58);
                usleep(16658.92);
                touchMove(1, 590.17, 841.42);
                usleep(16614.50);
                touchMove(1, 592.23, 832.26);
                usleep(16679.92);
                touchMove(1, 595.31, 823.10);
                usleep(16733.04);
                touchMove(1, 597.36, 813.92);
                usleep(16549.96);
                touchMove(1, 599.41, 806.80);
                usleep(16700.46);
                touchMove(1, 600.44, 798.66);
                usleep(16724.42);
                touchMove(1, 601.47, 792.55);
                usleep(16622.62);
                touchMove(1, 603.52, 785.43);
                usleep(16735.67);
                touchMove(1, 604.55, 780.34);
                usleep(16667.79);
                touchMove(1, 605.58, 775.25);
                usleep(16626.25);
                touchMove(1, 606.59, 771.18);
                usleep(16628.29);
                touchMove(1, 607.62, 766.09);
                usleep(16759.08);
                touchMove(1, 608.65, 759.98);
                usleep(16595.38);
                touchMove(1, 608.65, 753.86);
                usleep(16747.92);
                touchMove(1, 609.67, 748.77);
                usleep(16673.25);
                touchMove(1, 609.67, 743.68);
                usleep(16596.04);
                touchMove(1, 610.70, 739.61);
                usleep(16668.67);
                touchMove(1, 610.70, 735.54);
                usleep(16723.71);
                touchMove(1, 611.73, 730.45);
                usleep(16608.38);
                touchMove(1, 612.75, 724.34);
                usleep(16656.75);
                touchMove(1, 613.78, 720.27);
                usleep(16734.71);
                touchMove(1, 614.81, 716.20);
                usleep(16664.58);
                touchMove(1, 615.83, 711.11);
                usleep(16610.17);
                touchMove(1, 616.86, 706.02);
                usleep(16691.79);
                touchMove(1, 616.86, 700.91);
                usleep(16605.71);
                touchMove(1, 617.89, 694.81);
                usleep(16790.54);
                touchMove(1, 617.89, 689.72);
                usleep(16643.17);
                touchMove(1, 617.89, 683.61);
                usleep(16629.71);
                touchMove(1, 617.89, 677.50);
                usleep(16654.42);
                touchMove(1, 618.92, 671.40);
                usleep(16718.54);
                touchMove(1, 618.92, 666.31);
                usleep(16575.29);
                touchMove(1, 619.94, 662.24);
                usleep(16724.54);
                touchMove(1, 619.94, 657.15);
                usleep(16714.92);
                touchMove(1, 619.94, 652.06);
                usleep(16587.88);
                touchMove(1, 620.97, 647.97);
                usleep(16687.00);
                touchMove(1, 620.97, 643.90);
                usleep(16726.88);
                touchMove(1, 622.00, 640.84);
                usleep(16607.17);
                touchMove(1, 623.02, 636.77);
                usleep(16677.00);
                touchMove(1, 623.02, 632.70);
                usleep(16721.21);
                touchMove(1, 624.05, 628.63);
                usleep(16594.83);
                touchMove(1, 624.05, 626.59);
                usleep(16694.96);
                touchMove(1, 624.05, 624.56);
                usleep(16722.04);
                touchMove(1, 624.05, 622.52);
                usleep(33405.79);
                touchMove(1, 624.05, 621.51);
                usleep(66745.33);
                touchMove(1, 625.08, 621.51);
                usleep(16621.92);
                touchUp(1, 628.15, 619.47);
                break;
            case 10:
                touchDown(4, 500.87, 1187.58);
                usleep(82916.25);
                touchMove(4, 500.87, 1176.39);
                usleep(17096.38);
                touchMove(4, 500.87, 1168.25);
                usleep(16223.58);
                touchMove(4, 500.87, 1158.07);
                usleep(16743.29);
                touchMove(4, 501.90, 1144.82);
                usleep(16669.75);
                touchMove(4, 502.93, 1132.61);
                usleep(16590.88);
                touchMove(4, 503.95, 1120.39);
                usleep(16721.71);
                touchMove(4, 504.98, 1108.18);
                usleep(16712.92);
                touchMove(4, 506.01, 1094.95);
                usleep(16559.25);
                touchMove(4, 507.04, 1080.68);
                usleep(16653.67);
                touchMove(4, 509.09, 1067.45);
                usleep(16776.00);
                touchMove(4, 510.12, 1057.27);
                usleep(16651.67);
                touchMove(4, 511.14, 1048.11);
                usleep(16675.25);
                touchMove(4, 511.14, 1038.95);
                usleep(16710.96);
                touchMove(4, 512.17, 1028.75);
                usleep(16576.42);
                touchMove(4, 512.17, 1018.58);
                usleep(16690.00);
                touchMove(4, 513.20, 1007.38);
                usleep(16741.21);
                touchMove(4, 514.22, 996.18);
                usleep(16612.71);
                touchMove(4, 515.25, 986.01);
                usleep(16655.71);
                touchMove(4, 516.28, 976.83);
                usleep(16740.38);
                touchMove(4, 516.28, 968.68);
                usleep(16612.38);
                touchMove(4, 517.30, 961.56);
                usleep(16786.92);
                touchMove(4, 517.30, 955.45);
                usleep(16667.46);
                touchMove(4, 517.30, 950.37);
                usleep(16806.17);
                touchMove(4, 517.30, 945.28);
                usleep(16525.88);
                touchMove(4, 518.33, 940.19);
                usleep(16687.33);
                touchMove(4, 518.33, 933.06);
                usleep(16593.58);
                touchMove(4, 519.36, 925.94);
                usleep(16655.33);
                touchMove(4, 520.37, 917.78);
                usleep(16681.25);
                touchMove(4, 521.40, 910.65);
                usleep(16621.25);
                touchMove(4, 522.43, 904.55);
                usleep(16720.62);
                touchMove(4, 522.43, 897.42);
                usleep(16666.88);
                touchMove(4, 523.46, 891.31);
                usleep(16677.83);
                touchMove(4, 524.48, 884.19);
                usleep(16968.33);
                touchMove(4, 525.51, 877.07);
                usleep(16439.12);
                touchMove(4, 526.54, 869.92);
                usleep(16601.08);
                touchMove(4, 526.54, 862.80);
                usleep(16680.75);
                touchMove(4, 527.56, 855.67);
                usleep(16694.50);
                touchMove(4, 527.56, 849.57);
                usleep(16722.75);
                touchMove(4, 528.59, 844.48);
                usleep(16574.29);
                touchMove(4, 529.62, 839.39);
                usleep(16740.75);
                touchMove(4, 530.64, 833.28);
                usleep(16608.42);
                touchMove(4, 531.67, 828.19);
                usleep(16826.38);
                touchMove(4, 532.70, 821.07);
                usleep(16580.17);
                touchMove(4, 533.72, 814.96);
                usleep(16602.54);
                touchMove(4, 534.75, 808.84);
                usleep(16834.21);
                touchMove(4, 535.78, 802.73);
                usleep(16568.38);
                touchMove(4, 536.80, 796.62);
                usleep(16642.12);
                touchMove(4, 537.83, 791.53);
                usleep(16624.08);
                touchMove(4, 537.83, 785.43);
                usleep(16709.17);
                touchMove(4, 538.86, 780.34);
                usleep(16634.12);
                touchMove(4, 539.89, 775.25);
                usleep(16672.67);
                touchMove(4, 540.90, 769.14);
                usleep(16732.08);
                touchMove(4, 541.93, 763.04);
                usleep(16607.25);
                touchMove(4, 542.96, 756.91);
                usleep(16691.38);
                touchMove(4, 543.98, 750.80);
                usleep(16690.08);
                touchMove(4, 545.01, 744.70);
                usleep(16609.67);
                touchMove(4, 545.01, 738.59);
                usleep(16753.04);
                touchMove(4, 546.04, 732.48);
                usleep(16651.71);
                touchMove(4, 547.06, 727.39);
                usleep(16665.71);
                touchMove(4, 548.09, 722.31);
                usleep(16811.38);
                touchMove(4, 549.12, 716.20);
                usleep(16538.33);
                touchMove(4, 550.14, 711.11);
                usleep(16876.75);
                touchMove(4, 551.17, 705.00);
                usleep(16413.75);
                touchMove(4, 552.20, 698.88);
                usleep(16719.12);
                touchMove(4, 552.20, 691.75);
                usleep(16728.25);
                touchMove(4, 552.20, 684.63);
                usleep(16549.29);
                touchMove(4, 553.22, 678.52);
                usleep(16715.54);
                touchMove(4, 554.25, 672.41);
                usleep(16559.71);
                touchMove(4, 554.25, 666.31);
                usleep(16746.21);
                touchMove(4, 555.28, 660.20);
                usleep(16687.50);
                touchMove(4, 556.31, 655.11);
                usleep(16612.29);
                touchMove(4, 557.33, 650.02);
                usleep(16731.12);
                touchMove(4, 559.39, 643.90);
                usleep(16676.12);
                touchMove(4, 560.41, 638.81);
                usleep(16995.83);
                touchMove(4, 561.44, 632.70);
                usleep(16304.04);
                touchMove(4, 562.47, 626.59);
                usleep(16725.38);
                touchMove(4, 562.47, 620.49);
                usleep(16587.79);
                touchMove(4, 562.47, 614.38);
                usleep(16720.00);
                touchMove(4, 562.47, 608.28);
                usleep(16672.92);
                touchMove(4, 562.47, 603.19);
                usleep(16546.00);
                touchMove(4, 562.47, 597.08);
                usleep(16712.67);
                touchMove(4, 563.48, 592.99);
                usleep(16750.21);
                touchMove(4, 564.51, 587.90);
                usleep(16668.04);
                touchMove(4, 565.54, 582.81);
                usleep(16625.71);
                touchMove(4, 566.56, 577.72);
                usleep(16709.79);
                touchMove(4, 567.59, 572.63);
                usleep(16582.96);
                touchMove(4, 569.64, 568.56);
                usleep(16699.71);
                touchMove(4, 571.70, 564.49);
                usleep(16692.04);
                touchMove(4, 574.78, 559.40);
                usleep(16611.83);
                touchMove(4, 576.83, 555.33);
                usleep(16785.38);
                touchMove(4, 578.89, 550.24);
                usleep(16607.17);
                touchMove(4, 580.94, 545.15);
                usleep(16602.71);
                touchMove(4, 581.97, 541.08);
                usleep(16962.42);
                touchMove(4, 582.98, 535.97);
                usleep(16649.33);
                touchMove(4, 584.01, 532.92);
                usleep(16380.88);
                touchMove(4, 585.04, 528.85);
                usleep(16743.54);
                touchMove(4, 586.07, 524.78);
                usleep(16805.62);
                touchMove(4, 587.09, 521.72);
                usleep(16466.58);
                touchMove(4, 588.12, 518.67);
                usleep(16665.25);
                touchMove(4, 589.15, 515.62);
                usleep(16723.21);
                touchMove(4, 590.17, 513.58);
                usleep(16625.21);
                touchMove(4, 591.20, 511.55);
                usleep(50108.71);
                touchMove(4, 592.23, 511.55);
                usleep(32164.33);
                touchUp(4, 595.31, 512.56);
                break;


        }

    }

    inputGender() {
        const numberRan = this.getRandom(1, 2);
        switch (numberRan) {
            case 1:
                touchDown(2, 597.36, 1169.27);
                usleep(66484.62);
                touchMove(2, 598.39, 1162.14);
                usleep(16761.38);
                touchMove(2, 598.39, 1155.02);
                usleep(16651.50);
                touchMove(2, 598.39, 1145.86);
                usleep(16595.96);
                touchMove(2, 599.41, 1136.68);
                usleep(16774.38);
                touchMove(2, 602.50, 1125.48);
                usleep(16597.83);
                touchMove(2, 604.55, 1115.30);
                usleep(16604.21);
                touchMove(2, 605.58, 1107.16);
                usleep(16758.04);
                touchMove(2, 607.62, 1099.02);
                usleep(16816.50);
                touchMove(2, 608.65, 1090.88);
                usleep(16512.88);
                touchMove(2, 610.70, 1083.73);
                usleep(16672.96);
                touchMove(2, 611.73, 1078.64);
                usleep(16708.88);
                touchMove(2, 612.75, 1073.55);
                usleep(16708.92);
                touchMove(2, 613.78, 1067.45);
                usleep(16570.46);
                touchMove(2, 614.81, 1061.34);
                usleep(16685.79);
                touchMove(2, 616.86, 1053.20);
                usleep(16614.08);
                touchMove(2, 617.89, 1046.08);
                usleep(16718.17);
                touchMove(2, 618.92, 1039.97);
                usleep(16692.83);
                touchMove(2, 618.92, 1035.90);
                usleep(16628.92);
                touchMove(2, 618.92, 1033.84);
                usleep(16619.83);
                touchMove(2, 618.92, 1030.79);
                usleep(16775.12);
                touchMove(2, 618.92, 1028.75);
                usleep(16533.58);
                touchMove(2, 619.94, 1024.68);
                usleep(16710.75);
                touchMove(2, 620.97, 1020.61);
                usleep(16657.25);
                touchMove(2, 620.97, 1017.56);
                usleep(16662.50);
                touchMove(2, 620.97, 1015.52);
                usleep(16747.71);
                touchMove(2, 620.97, 1013.49);
                usleep(50105.58);
                touchMove(2, 622.00, 1013.49);
                usleep(15526.38);
                touchUp(2, 625.08, 1010.43);
                break;
            case 2:
                touchDown(4, 603.52, 1176.39);
                usleep(83403.58);
                touchMove(4, 606.59, 1168.25);
                usleep(16662.42);
                touchMove(4, 606.59, 1162.14);
                usleep(16609.42);
                touchMove(4, 607.62, 1154.00);
                usleep(16587.75);
                touchMove(4, 609.67, 1145.86);
                usleep(16662.75);
                touchMove(4, 611.73, 1139.73);
                usleep(16863.17);
                touchMove(4, 612.75, 1135.66);
                usleep(16387.75);
                touchMove(4, 614.81, 1131.59);
                usleep(16647.79);
                touchMove(4, 615.83, 1127.52);
                usleep(16660.04);
                touchMove(4, 616.86, 1124.46);
                usleep(16665.33);
                touchMove(4, 617.89, 1120.39);
                usleep(16636.33);
                touchMove(4, 618.92, 1116.32);
                usleep(16758.21);
                touchMove(4, 619.94, 1112.25);
                usleep(16743.67);
                touchMove(4, 620.97, 1109.20);
                usleep(16481.96);
                touchMove(4, 620.97, 1105.13);
                usleep(16824.75);
                touchMove(4, 622.00, 1102.07);
                usleep(16605.92);
                touchMove(4, 622.00, 1100.04);
                usleep(16649.83);
                touchMove(4, 622.00, 1099.02);
                usleep(33364.00);
                touchMove(4, 622.00, 1098.00);
                usleep(148880.46);
                touchUp(4, 625.08, 1094.95);
                break;
            case 3:
                touchDown(4, 624.05, 1203.89);
                usleep(83179.25);
                touchMove(4, 627.12, 1192.67);
                usleep(16605.38);
                touchMove(4, 627.12, 1184.53);
                usleep(16886.79);
                touchMove(4, 627.12, 1174.35);
                usleep(16470.29);
                touchMove(4, 630.20, 1162.14);
                usleep(16640.42);
                touchMove(4, 632.25, 1149.93);
                usleep(16635.62);
                touchMove(4, 635.34, 1136.68);
                usleep(16817.88);
                touchMove(4, 638.42, 1124.46);
                usleep(16480.50);
                touchMove(4, 641.50, 1111.23);
                usleep(16876.21);
                touchMove(4, 645.60, 1098.00);
                usleep(16667.21);
                touchMove(4, 650.73, 1085.77);
                usleep(16514.88);
                touchMove(4, 654.84, 1074.57);
                usleep(16741.25);
                touchMove(4, 658.94, 1064.40);
                usleep(16677.00);
                touchMove(4, 662.02, 1055.24);
                usleep(16599.42);
                touchMove(4, 664.08, 1048.11);
                usleep(16664.54);
                touchMove(4, 666.13, 1043.02);
                usleep(16686.79);
                touchMove(4, 668.19, 1036.92);
                usleep(16648.33);
                touchMove(4, 670.23, 1031.81);
                usleep(16681.79);
                touchMove(4, 672.28, 1025.70);
                usleep(16722.42);
                touchMove(4, 674.34, 1018.58);
                usleep(16590.50);
                touchMove(4, 676.39, 1012.47);
                usleep(16867.67);
                touchMove(4, 678.44, 1007.38);
                usleep(16529.25);
                touchMove(4, 679.47, 1002.29);
                usleep(16606.04);
                touchMove(4, 681.53, 997.20);
                usleep(16413.50);
                touchMove(4, 682.55, 992.11);
                usleep(16730.92);
                touchMove(4, 684.61, 988.04);
                usleep(16587.58);
                touchMove(4, 685.63, 983.97);
                usleep(16929.71);
                touchMove(4, 686.66, 979.88);
                usleep(16528.04);
                touchMove(4, 687.69, 975.81);
                usleep(16541.08);
                touchMove(4, 688.71, 973.77);
                usleep(16825.46);
                touchMove(4, 689.74, 971.74);
                usleep(16570.29);
                touchMove(4, 690.77, 970.72);
                usleep(16613.12);
                touchMove(4, 690.77, 969.70);
                usleep(33541.58);
                touchMove(4, 690.77, 968.68);
                usleep(250024.54);
                touchMove(4, 690.77, 969.70);
                usleep(65634.17);
                touchUp(4, 691.78, 972.76);
                usleep(717702.54);

                touchDown(3, 713.34, 850.58);
                usleep(65970.88);
                touchUp(3, 713.34, 850.58);
                break;
            case 4:
                touchDown(3, 535.78, 1169.27);
                usleep(49797.79);
                touchMove(3, 537.83, 1164.18);
                usleep(16583.38);
                touchMove(3, 537.83, 1154.00);
                usleep(16685.33);
                touchMove(3, 540.90, 1133.62);
                usleep(16622.54);
                touchMove(3, 549.12, 1098.00);
                usleep(16675.54);
                touchMove(3, 559.39, 1059.31);
                usleep(16579.62);
                touchMove(3, 568.62, 1018.58);
                usleep(16916.12);
                touchMove(3, 577.86, 979.88);
                usleep(16456.33);
                touchMove(3, 588.12, 947.31);
                usleep(16626.75);
                touchMove(3, 598.39, 916.76);
                usleep(16790.50);
                touchMove(3, 606.59, 893.35);
                usleep(16610.38);
                touchMove(3, 615.83, 870.96);
                usleep(16727.79);
                touchMove(3, 623.02, 853.64);
                usleep(17038.79);
                touchMove(3, 630.20, 835.32);
                usleep(16254.00);
                touchMove(3, 636.36, 817.00);
                usleep(16703.00);
                touchMove(3, 643.55, 798.66);
                usleep(16738.62);
                touchMove(3, 651.76, 780.34);
                usleep(16577.50);
                touchMove(3, 668.19, 748.77);
                usleep(15473.12);
                touchUp(3, 672.28, 744.70);

                break;
        }
    }

    scrollAndClickToiDongY() {

        touchDown(3, 495.75, 1057.27);
        usleep(151634.50);
        touchMove(3, 500.87, 1024.68);
        usleep(14680.92);
        touchMove(3, 503.95, 1005.34);
        usleep(16564.08);
        touchMove(3, 508.06, 994.15);
        usleep(16720.12);
        touchMove(3, 512.17, 980.92);
        usleep(16714.25);
        touchMove(3, 517.30, 960.54);
        usleep(16594.92);
        touchMove(3, 522.43, 944.26);
        usleep(16697.88);
        touchMove(3, 530.64, 922.87);
        usleep(16711.50);
        touchMove(3, 536.80, 901.49);
        usleep(15332.62);
        touchUp(3, 540.90, 897.42);
        usleep(1184886.58);

        touchDown(5, 524.48, 1105.13);
        usleep(100092.08);
        touchMove(5, 526.54, 1096.98);
        usleep(16656.50);
        touchMove(5, 526.54, 1081.70);
        usleep(16627.83);
        touchMove(5, 527.56, 1064.40);
        usleep(16597.21);
        touchMove(5, 530.64, 1040.99);
        usleep(16604.33);
        touchMove(5, 534.75, 1027.74);
        usleep(16675.54);
        touchMove(5, 539.89, 1009.42);
        usleep(16702.21);
        touchMove(5, 542.96, 998.22);
        usleep(16622.79);
        touchMove(5, 546.04, 983.97);
        usleep(16778.46);
        touchMove(5, 551.17, 967.67);
        usleep(16813.88);
        touchMove(5, 556.31, 944.26);
        usleep(16418.29);
        touchMove(5, 561.44, 926.96);
        usleep(16661.75);
        touchMove(5, 570.67, 893.35);
        usleep(16706.21);
        touchMove(5, 577.86, 861.78);
        usleep(15370.71);
        touchUp(5, 581.97, 857.71);
        usleep(1250180.33);

        touchDown(6, 518.33, 1165.19);
        usleep(51132.17);
        touchMove(6, 524.48, 1140.75);
        usleep(16805.00);
        touchMove(6, 524.48, 1123.45);
        usleep(16591.00);
        touchMove(6, 526.54, 1100.04);
        usleep(16678.08);
        touchMove(6, 530.64, 1065.41);
        usleep(16662.96);
        touchMove(6, 539.89, 1020.61);
        usleep(16484.33);
        touchMove(6, 551.17, 983.97);
        usleep(16716.62);
        touchMove(6, 559.39, 957.49);
        usleep(16805.38);
        touchMove(6, 564.51, 939.17);
        usleep(16446.62);
        touchUp(6, 568.62, 922.87);
        usleep(1499201.25);

        touchDown(2, 506.01, 997.20);
        usleep(120580.88);
        touchMove(2, 512.17, 980.92);
        usleep(14026.67);
        touchMove(2, 514.22, 965.63);
        usleep(16398.83);
        touchMove(2, 519.36, 948.33);
        usleep(16800.96);
        touchMove(2, 524.48, 935.10);
        usleep(16608.46);
        touchMove(2, 530.64, 914.72);
        usleep(16565.92);
        touchMove(2, 536.80, 898.44);
        usleep(16816.46);
        touchMove(2, 545.01, 876.05);
        usleep(16596.88);
        touchMove(2, 551.17, 853.64);
        usleep(15380.75);
        touchUp(2, 555.28, 849.57);
    }

    inputTextCustom(text) {
        for (var i = 0; i < text.length; i++) {

            let startIndex = i;
            let endIndex = startIndex + 1;
            let word = text.substring(startIndex, endIndex);
            at.inputText(word);
            at.usleep(60000);
        }
    }

    clickKBXong() {
        this.thongBao("Click kb Xong");
        at.tap(665, 856);
        at.usleep(2000000);
    }

    checkFullScreenLZD() {
        //check loginDone
        this.thongBao('Kiem tra fullscreen lzd');
        const optionCheckFullScreen = ({
            colors: [
                { color: 5846188, x: 0, y: 0 },
                { color: 6173612, x: 0, y: 7 },
                { color: 6238636, x: 18, y: 9 },
                { color: 5845676, x: 14, y: 1 }
            ],
            region: { x: 489.08, y: 49.65, width: 233.45, height: 68.66 },
            debug: false,
        })

        const find_checkFullScreen = this.findToaDo(optionCheckFullScreen, 2);
        return find_checkFullScreen;
    }

    truotDangNhapNoFull() {
        touchDown(2, 71.85, 423.98);
        usleep(333360.21);
        touchMove(2, 78.00, 419.91);
        usleep(16618.67);
        touchMove(2, 81.08, 419.91);
        usleep(16662.71);
        touchMove(2, 85.19, 419.91);
        usleep(16622.00);
        touchMove(2, 90.32, 419.91);
        usleep(16714.62);
        touchMove(2, 94.43, 419.91);
        usleep(16610.46);
        touchMove(2, 98.53, 419.91);
        usleep(16663.38);
        touchMove(2, 103.66, 420.93);
        usleep(16758.25);
        touchMove(2, 108.79, 421.94);
        usleep(16570.83);
        touchMove(2, 113.93, 421.94);
        usleep(16692.38);
        touchMove(2, 119.05, 421.94);
        usleep(16823.46);
        touchMove(2, 124.19, 421.94);
        usleep(16623.79);
        touchMove(2, 128.30, 422.96);
        usleep(16635.29);
        touchMove(2, 131.38, 422.96);
        usleep(16659.54);
        touchMove(2, 134.46, 422.96);
        usleep(16650.83);
        touchMove(2, 137.54, 423.98);
        usleep(16607.88);
        touchMove(2, 140.61, 423.98);
        usleep(16808.21);
        touchMove(2, 143.69, 425.00);
        usleep(16592.38);
        touchMove(2, 147.80, 426.01);
        usleep(16613.83);
        touchMove(2, 150.88, 426.01);
        usleep(16806.96);
        touchMove(2, 153.96, 426.01);
        usleep(16671.17);
        touchMove(2, 157.04, 426.01);
        usleep(16695.21);
        touchMove(2, 160.11, 426.01);
        usleep(16662.08);
        touchMove(2, 162.16, 426.01);
        usleep(16502.17);
        touchMove(2, 165.24, 426.01);
        usleep(16590.00);
        touchMove(2, 168.32, 426.01);
        usleep(16842.50);
        touchMove(2, 172.43, 426.01);
        usleep(16617.71);
        touchMove(2, 175.51, 426.01);
        usleep(16765.92);
        touchMove(2, 179.62, 426.01);
        usleep(16729.08);
        touchMove(2, 183.72, 426.01);
        usleep(51799.79);
        touchMove(2, 191.93, 426.01);
        usleep(14695.92);
        touchMove(2, 197.07, 426.01);
        usleep(16605.54);
        touchMove(2, 202.19, 426.01);
        usleep(16707.50);
        touchMove(2, 207.33, 426.01);
        usleep(16783.54);
        touchMove(2, 211.43, 426.01);
        usleep(16580.50);
        touchMove(2, 216.57, 426.01);
        usleep(16756.71);
        touchMove(2, 221.69, 426.01);
        usleep(16518.08);
        touchMove(2, 226.83, 426.01);
        usleep(16663.71);
        touchMove(2, 231.96, 426.01);
        usleep(16749.46);
        touchMove(2, 237.09, 426.01);
        usleep(16705.54);
        touchMove(2, 243.26, 426.01);
        usleep(16567.38);
        touchMove(2, 248.38, 426.01);
        usleep(16655.75);
        touchMove(2, 253.52, 426.01);
        usleep(16706.83);
        touchMove(2, 257.62, 426.01);
        usleep(16742.17);
        touchMove(2, 262.76, 426.01);
        usleep(16616.50);
        touchMove(2, 267.88, 427.03);
        usleep(16664.83);
        touchMove(2, 273.02, 427.03);
        usleep(16631.54);
        touchMove(2, 278.15, 427.03);
        usleep(16675.75);
        touchMove(2, 284.31, 427.03);
        usleep(16608.92);
        touchMove(2, 289.44, 427.03);
        usleep(16819.54);
        touchMove(2, 294.57, 427.03);
        usleep(16496.50);
        touchMove(2, 300.73, 427.03);
        usleep(16999.50);
        touchMove(2, 305.87, 427.03);
        usleep(16588.75);
        touchMove(2, 310.99, 427.03);
        usleep(16419.83);
        touchMove(2, 316.12, 427.03);
        usleep(16792.54);
        touchMove(2, 321.26, 427.03);
        usleep(16757.62);
        touchMove(2, 326.39, 427.03);
        usleep(16615.25);
        touchMove(2, 331.52, 428.05);
        usleep(16650.54);
        touchMove(2, 336.65, 428.05);
        usleep(16595.67);
        touchMove(2, 341.79, 429.09);
        usleep(16672.92);
        touchMove(2, 346.92, 429.09);
        usleep(16719.38);
        touchMove(2, 353.07, 429.09);
        usleep(16725.75);
        touchMove(2, 358.21, 429.09);
        usleep(16553.12);
        touchMove(2, 363.34, 429.09);
        usleep(16822.96);
        touchMove(2, 368.48, 429.09);
        usleep(16465.42);
        touchMove(2, 372.57, 429.09);
        usleep(16897.08);
        touchMove(2, 377.71, 429.09);
        usleep(16572.46);
        touchMove(2, 381.82, 429.09);
        usleep(16660.12);
        touchMove(2, 386.95, 429.09);
        usleep(52524.08);
        touchMove(2, 400.29, 429.09);
        usleep(14226.21);
        touchMove(2, 406.45, 429.09);
        usleep(16412.00);
        touchMove(2, 413.64, 429.09);
        usleep(16713.29);
        touchMove(2, 418.76, 429.09);
        usleep(16847.92);
        touchMove(2, 424.92, 430.11);
        usleep(16513.96);
        touchMove(2, 430.06, 430.11);
        usleep(16684.08);
        touchMove(2, 435.18, 430.11);
        usleep(16729.79);
        touchMove(2, 438.26, 431.12);
        usleep(16568.96);
        touchMove(2, 443.40, 431.12);
        usleep(16878.12);
        touchMove(2, 447.51, 432.14);
        usleep(16571.08);
        touchMove(2, 452.64, 433.16);
        usleep(16815.12);
        touchMove(2, 457.76, 433.16);
        usleep(16483.17);
        touchMove(2, 462.90, 434.18);
        usleep(16849.38);
        touchMove(2, 468.03, 434.18);
        usleep(16553.62);
        touchMove(2, 473.17, 435.19);
        usleep(16591.33);
        touchMove(2, 478.29, 435.19);
        usleep(16732.21);
        touchMove(2, 483.43, 436.21);
        usleep(16640.38);
        touchMove(2, 489.59, 436.21);
        usleep(16743.38);
        touchMove(2, 494.72, 437.23);
        usleep(16745.88);
        touchMove(2, 499.86, 437.23);
        usleep(16567.33);
        touchMove(2, 506.01, 437.23);
        usleep(16542.96);
        touchMove(2, 511.14, 437.23);
        usleep(16838.83);
        touchMove(2, 516.28, 438.25);
        usleep(16442.83);
        touchMove(2, 521.40, 438.25);
        usleep(16729.83);
        touchMove(2, 527.56, 438.25);
        usleep(16923.79);
        touchMove(2, 531.67, 438.25);
        usleep(16479.79);
        touchMove(2, 536.80, 439.27);
        usleep(16665.54);
        touchMove(2, 540.90, 439.27);
        usleep(16654.46);
        touchMove(2, 546.04, 440.28);
        usleep(16702.08);
        touchMove(2, 550.14, 440.28);
        usleep(16683.54);
        touchMove(2, 555.28, 440.28);
        usleep(16764.04);
        touchMove(2, 559.39, 440.28);
        usleep(16609.58);
        touchMove(2, 564.51, 440.28);
        usleep(16551.17);
        touchMove(2, 568.62, 440.28);
        usleep(16690.46);
        touchMove(2, 572.73, 440.28);
        usleep(16627.00);
        touchMove(2, 577.86, 440.28);
        usleep(16735.83);
        touchMove(2, 581.97, 440.28);
        usleep(16747.25);
        touchMove(2, 587.09, 440.28);
        usleep(16577.83);
        touchMove(2, 592.23, 440.28);
        usleep(16735.79);
        touchMove(2, 597.36, 440.28);
        usleep(16563.54);
        touchMove(2, 601.47, 440.28);
        usleep(16607.04);
        touchMove(2, 606.59, 441.30);
        usleep(16860.92);
        touchMove(2, 611.73, 441.30);
        usleep(16604.83);
        touchMove(2, 616.86, 441.30);
        usleep(16582.17);
        touchMove(2, 620.97, 441.30);
        usleep(16645.42);
        touchMove(2, 625.08, 442.32);
        usleep(16917.75);
        touchMove(2, 630.20, 442.32);
        usleep(16400.46);
        touchMove(2, 634.31, 442.32);
        usleep(16693.79);
        touchMove(2, 639.44, 442.32);
        usleep(16703.04);
        touchMove(2, 644.58, 442.32);
        usleep(16862.00);
        touchMove(2, 649.70, 442.32);
        usleep(16501.92);
        touchMove(2, 654.84, 442.32);
        usleep(16745.96);
        touchMove(2, 659.97, 442.32);
        usleep(16601.62);
        touchMove(2, 665.11, 442.32);
        usleep(16698.08);
        touchMove(2, 669.20, 442.32);
        usleep(16839.50);
        touchMove(2, 673.31, 442.32);
        usleep(16403.58);
        touchMove(2, 676.39, 442.32);
        usleep(16652.29);
        touchMove(2, 679.47, 442.32);
        usleep(16652.29);
        touchMove(2, 682.55, 442.32);
        usleep(16402.12);
        touchMove(2, 685.63, 442.32);
        usleep(16725.62);
        touchMove(2, 688.71, 443.34);
        usleep(16719.00);
        touchMove(2, 691.78, 443.34);
        usleep(16575.92);
        touchMove(2, 694.86, 443.34);
        usleep(16639.25);
        touchMove(2, 697.95, 444.35);
        usleep(16741.71);
        touchMove(2, 700.00, 444.35);
        usleep(16619.25);
        touchMove(2, 702.05, 444.35);
        usleep(16632.17);
        touchMove(2, 704.11, 444.35);
        usleep(16750.38);
        touchMove(2, 706.16, 444.35);
        usleep(16700.29);
        touchMove(2, 707.19, 444.35);
        usleep(16542.33);
        touchMove(2, 708.21, 444.35);
        usleep(16729.79);
        touchMove(2, 709.24, 444.35);
        usleep(16633.29);
        touchMove(2, 711.28, 444.35);
        usleep(15689.00);
        touchUp(2, 715.39, 446.39);
    }
    truotDangNhapFull() {
        touchDown(6, 87.24, 341.52);
        usleep(131951.12);
        touchMove(6, 97.50, 346.61);
        usleep(16658.38);
        touchMove(6, 101.61, 346.61);
        usleep(16631.33);
        touchMove(6, 105.71, 346.61);
        usleep(16669.29);
        touchMove(6, 108.79, 346.61);
        usleep(16567.71);
        touchMove(6, 111.88, 346.61);
        usleep(16803.50);
        touchMove(6, 114.96, 346.61);
        usleep(16583.71);
        touchMove(6, 118.03, 346.61);
        usleep(16613.62);
        touchMove(6, 121.11, 346.61);
        usleep(16727.75);
        touchMove(6, 124.19, 347.63);
        usleep(16732.58);
        touchMove(6, 128.30, 348.64);
        usleep(16579.62);
        touchMove(6, 133.43, 349.66);
        usleep(16765.71);
        touchMove(6, 138.55, 350.68);
        usleep(16641.88);
        touchMove(6, 142.66, 351.70);
        usleep(16645.88);
        touchMove(6, 147.80, 352.72);
        usleep(16641.88);
        touchMove(6, 151.90, 352.72);
        usleep(16737.88);
        touchMove(6, 157.04, 352.72);
        usleep(16596.67);
        touchMove(6, 161.14, 352.72);
        usleep(16685.75);
        touchMove(6, 166.27, 352.72);
        usleep(16711.54);
        touchMove(6, 169.35, 352.72);
        usleep(16515.96);
        touchMove(6, 173.46, 353.73);
        usleep(16821.92);
        touchMove(6, 176.54, 353.73);
        usleep(16695.75);
        touchMove(6, 180.64, 353.73);
        usleep(16501.42);
        touchMove(6, 183.72, 353.73);
        usleep(16742.04);
        touchMove(6, 186.80, 353.73);
        usleep(16648.21);
        touchMove(6, 190.91, 353.73);
        usleep(16780.96);
        touchMove(6, 193.99, 353.73);
        usleep(16660.33);
        touchMove(6, 197.07, 353.73);
        usleep(16710.88);
        touchMove(6, 202.19, 353.73);
        usleep(16511.25);
        touchMove(6, 206.30, 353.73);
        usleep(16679.83);
        touchMove(6, 211.43, 353.73);
        usleep(16732.33);
        touchMove(6, 215.54, 353.73);
        usleep(16513.50);
        touchMove(6, 220.66, 353.73);
        usleep(16878.79);
        touchMove(6, 225.80, 353.73);
        usleep(16575.67);
        touchMove(6, 230.93, 353.73);
        usleep(16608.29);
        touchMove(6, 235.04, 353.73);
        usleep(16821.92);
        touchMove(6, 239.15, 353.73);
        usleep(16618.29);
        touchMove(6, 243.26, 353.73);
        usleep(16580.42);
        touchMove(6, 248.38, 354.75);
        usleep(16795.42);
        touchMove(6, 252.49, 355.77);
        usleep(16648.50);
        touchMove(6, 257.62, 356.79);
        usleep(16571.12);
        touchMove(6, 261.73, 357.80);
        usleep(16706.25);
        touchMove(6, 265.83, 358.82);
        usleep(16848.62);
        touchMove(6, 269.94, 359.84);
        usleep(16423.96);
        touchMove(6, 274.04, 360.86);
        usleep(16929.92);
        touchMove(6, 279.18, 360.86);
        usleep(16547.33);
        touchMove(6, 283.28, 360.86);
        usleep(16645.79);
        touchMove(6, 288.41, 360.86);
        usleep(16756.62);
        touchMove(6, 292.52, 360.86);
        usleep(16621.75);
        touchMove(6, 297.65, 360.86);
        usleep(16573.17);
        touchMove(6, 301.76, 360.86);
        usleep(16739.46);
        touchMove(6, 304.84, 360.86);
        usleep(16679.96);
        touchMove(6, 308.94, 360.86);
        usleep(16638.58);
        touchMove(6, 313.04, 360.86);
        usleep(16705.92);
        touchMove(6, 317.15, 360.86);
        usleep(16575.71);
        touchMove(6, 322.29, 360.86);
        usleep(16609.58);
        touchMove(6, 327.42, 360.86);
        usleep(16868.88);
        touchMove(6, 333.57, 360.86);
        usleep(16544.04);
        touchMove(6, 339.73, 360.86);
        usleep(16574.00);
        touchMove(6, 345.89, 360.86);
        usleep(16799.12);
        touchMove(6, 353.07, 360.86);
        usleep(16731.88);
        touchMove(6, 360.26, 360.86);
        usleep(16466.08);
        touchMove(6, 368.48, 360.86);
        usleep(16818.83);
        touchMove(6, 375.65, 360.86);
        usleep(16695.25);
        touchMove(6, 381.82, 360.86);
        usleep(16569.92);
        touchMove(6, 387.98, 360.86);
        usleep(16715.46);
        touchMove(6, 394.13, 360.86);
        usleep(16589.50);
        touchMove(6, 400.29, 360.86);
        usleep(16802.04);
        touchMove(6, 407.48, 359.84);
        usleep(16674.17);
        touchMove(6, 413.64, 358.82);
        usleep(16615.12);
        touchMove(6, 418.76, 357.80);
        usleep(16649.38);
        touchMove(6, 422.87, 357.80);
        usleep(16827.38);
        touchMove(6, 428.01, 356.79);
        usleep(16449.46);
        touchMove(6, 431.09, 356.79);
        usleep(16768.88);
        touchMove(6, 435.18, 355.77);
        usleep(16715.58);
        touchMove(6, 438.26, 355.77);
        usleep(16628.92);
        touchMove(6, 440.32, 355.77);
        usleep(16681.21);
        touchMove(6, 443.40, 354.75);
        usleep(16666.38);
        touchMove(6, 447.51, 354.75);
        usleep(16694.75);
        touchMove(6, 450.59, 354.75);
        usleep(16662.50);
        touchMove(6, 454.69, 354.75);
        usleep(16668.17);
        touchMove(6, 459.82, 354.75);
        usleep(16633.38);
        touchMove(6, 464.95, 353.73);
        usleep(16668.25);
        touchMove(6, 470.09, 353.73);
        usleep(16698.83);
        touchMove(6, 475.22, 353.73);
        usleep(16606.42);
        touchMove(6, 480.35, 353.73);
        usleep(16762.67);
        touchMove(6, 485.48, 353.73);
        usleep(16587.83);
        touchMove(6, 489.59, 352.72);
        usleep(16667.79);
        touchMove(6, 494.72, 352.72);
        usleep(16692.71);
        touchMove(6, 499.86, 352.72);
        usleep(16693.00);
        touchMove(6, 506.01, 352.72);
        usleep(16580.83);
        touchMove(6, 512.17, 351.70);
        usleep(16644.88);
        touchMove(6, 519.36, 351.70);
        usleep(16711.42);
        touchMove(6, 527.56, 351.70);
        usleep(16657.71);
        touchMove(6, 534.75, 350.68);
        usleep(16630.54);
        touchMove(6, 541.93, 349.66);
        usleep(16743.67);
        touchMove(6, 549.12, 349.66);
        usleep(16637.42);
        touchMove(6, 556.31, 349.66);
        usleep(16686.58);
        touchMove(6, 563.48, 348.64);
        usleep(16659.58);
        touchMove(6, 571.70, 348.64);
        usleep(16691.29);
        touchMove(6, 580.94, 348.64);
        usleep(16659.50);
        touchMove(6, 589.15, 348.64);
        usleep(16547.79);
        touchMove(6, 597.36, 347.63);
        usleep(16630.92);
        touchMove(6, 604.55, 347.63);
        usleep(16666.21);
        touchMove(6, 610.70, 346.61);
        usleep(16855.71);
        touchMove(6, 615.83, 345.59);
        usleep(16631.96);
        touchMove(6, 619.94, 345.59);
        usleep(16692.17);
        touchMove(6, 624.05, 345.59);
        usleep(16725.21);
        touchMove(6, 628.15, 345.59);
        usleep(16530.79);
        touchMove(6, 632.25, 344.57);
        usleep(16585.71);
        touchMove(6, 637.39, 344.57);
        usleep(16654.12);
        touchMove(6, 642.52, 341.52);
        usleep(16756.88);
        touchMove(6, 648.67, 341.52);
        usleep(16729.00);
        touchMove(6, 653.81, 341.52);
        usleep(16650.08);
        touchMove(6, 658.94, 341.52);
        usleep(16620.50);
        touchMove(6, 664.08, 341.52);
        usleep(16638.54);
        touchMove(6, 669.20, 341.52);
        usleep(16808.54);
        touchMove(6, 674.34, 341.52);
        usleep(16503.50);
        touchMove(6, 679.47, 341.52);
        usleep(16500.12);
        touchMove(6, 684.61, 341.52);
        usleep(16792.17);
        touchMove(6, 690.77, 341.52);
        usleep(16572.50);
        touchMove(6, 697.95, 341.52);
        usleep(16645.58);
        touchMove(6, 705.13, 340.50);
        usleep(16669.71);
        touchMove(6, 711.28, 340.50);
        usleep(16624.04);
        touchMove(6, 718.47, 340.50);
        usleep(16608.79);
        touchMove(6, 727.71, 339.48);
        usleep(16820.75);
        touchMove(6, 735.92, 339.48);
        usleep(16499.42);
        touchMove(6, 741.05, 339.48);
        usleep(15708.33);
        touchUp(6, 745.16, 336.43);
    }

    truotDangNhapFull1() {
        touchDown(4, 95.46, 344.57);
        usleep(401401.54);
        touchMove(4, 103.66, 344.57);
        usleep(16487.29);
        touchMove(4, 111.88, 344.57);
        usleep(16825.54);
        touchMove(4, 127.27, 344.57);
        usleep(16679.25);
        touchMove(4, 158.05, 344.57);
        usleep(16681.54);
        touchMove(4, 191.93, 344.57);
        usleep(16804.71);
        touchMove(4, 231.96, 344.57);
        usleep(16411.54);
        touchMove(4, 274.04, 344.57);
        usleep(16656.25);
        touchMove(4, 313.04, 344.57);
        usleep(16736.88);
        touchMove(4, 352.05, 344.57);
        usleep(16637.00);
        touchMove(4, 389.00, 344.57);
        usleep(16806.17);
        touchMove(4, 424.92, 345.59);
        usleep(16525.12);
        touchMove(4, 463.93, 346.61);
        usleep(16666.58);
        touchMove(4, 499.86, 346.61);
        usleep(16727.21);
        touchMove(4, 526.54, 346.61);
        usleep(16631.12);
        touchMove(4, 548.09, 346.61);
        usleep(16681.96);
        touchMove(4, 575.81, 346.61);
        usleep(16742.54);
        touchMove(4, 601.47, 346.61);
        usleep(16639.25);
        touchMove(4, 633.28, 346.61);
        usleep(16587.17);
        touchMove(4, 679.47, 346.61);
        usleep(16653.96);
        touchMove(4, 728.74, 347.63);
        usleep(15400.04);
        touchUp(4, 732.85, 350.68);
    }


    truotTheoHanhViRandom() {
        const randTruot = this.getRandom(1, 5);
        this.thongBao("Truot truong hop: " + randTruot);
        at.usleep(1000000);
        switch (randTruot) {
            case 1:
                touchDown(6, 85.19, 349.66);
                usleep(168430.17);
                touchMove(6, 93.40, 348.64);
                usleep(16425.29);
                touchMove(6, 97.50, 348.64);
                usleep(16647.58);
                touchMove(6, 101.61, 348.64);
                usleep(16734.42);
                touchMove(6, 106.74, 348.64);
                usleep(16594.92);
                touchMove(6, 111.88, 348.64);
                usleep(16941.21);
                touchMove(6, 118.03, 348.64);
                usleep(16457.92);
                touchMove(6, 122.13, 348.64);
                usleep(16463.33);
                touchMove(6, 126.24, 348.64);
                usleep(16729.00);
                touchMove(6, 130.35, 348.64);
                usleep(16716.54);
                touchMove(6, 134.46, 347.63);
                usleep(16641.71);
                touchMove(6, 137.54, 347.63);
                usleep(16630.42);
                touchMove(6, 141.63, 347.63);
                usleep(16698.12);
                touchMove(6, 144.72, 347.63);
                usleep(16545.29);
                touchMove(6, 148.82, 347.63);
                usleep(16751.71);
                touchMove(6, 152.93, 346.61);
                usleep(16717.50);
                touchMove(6, 157.04, 346.61);
                usleep(16564.88);
                touchMove(6, 162.16, 346.61);
                usleep(16877.00);
                touchMove(6, 167.30, 346.61);
                usleep(16555.54);
                touchMove(6, 173.46, 346.61);
                usleep(16749.46);
                touchMove(6, 178.59, 346.61);
                usleep(16481.71);
                touchMove(6, 183.72, 346.61);
                usleep(16857.42);
                touchMove(6, 188.85, 346.61);
                usleep(16534.38);
                touchMove(6, 193.99, 345.59);
                usleep(16923.71);
                touchMove(6, 198.09, 344.57);
                usleep(16443.42);
                touchMove(6, 203.22, 344.57);
                usleep(16589.79);
                touchMove(6, 207.33, 344.57);
                usleep(16665.00);
                touchMove(6, 211.43, 344.57);
                usleep(16663.33);
                touchMove(6, 216.57, 344.57);
                usleep(16631.58);
                touchMove(6, 222.72, 344.57);
                usleep(16747.92);
                touchMove(6, 228.88, 344.57);
                usleep(16658.83);
                touchMove(6, 235.04, 344.57);
                usleep(16633.62);
                touchMove(6, 242.23, 344.57);
                usleep(16985.71);
                touchMove(6, 248.38, 344.57);
                usleep(16472.42);
                touchMove(6, 254.54, 344.57);
                usleep(16590.96);
                touchMove(6, 259.68, 344.57);
                usleep(16650.88);
                touchMove(6, 265.83, 344.57);
                usleep(16716.21);
                touchMove(6, 271.99, 344.57);
                usleep(16523.04);
                touchMove(6, 277.12, 344.57);
                usleep(16811.29);
                touchMove(6, 283.28, 344.57);
                usleep(16890.12);
                touchMove(6, 289.44, 343.56);
                usleep(16429.58);
                touchMove(6, 296.62, 343.56);
                usleep(16541.04);
                touchMove(6, 302.79, 343.56);
                usleep(16817.12);
                touchMove(6, 307.91, 342.54);
                usleep(16575.42);
                touchMove(6, 313.04, 342.54);
                usleep(16771.88);
                touchMove(6, 318.18, 342.54);
                usleep(16841.08);
                touchMove(6, 322.29, 342.54);
                usleep(16381.62);
                touchMove(6, 326.39, 342.54);
                usleep(16781.71);
                touchMove(6, 330.49, 342.54);
                usleep(16700.17);
                touchMove(6, 335.63, 342.54);
                usleep(16671.38);
                touchMove(6, 341.79, 342.54);
                usleep(16629.92);
                touchMove(6, 347.95, 342.54);
                usleep(16663.58);
                touchMove(6, 355.13, 342.54);
                usleep(16670.50);
                touchMove(6, 362.31, 342.54);
                usleep(16561.46);
                touchMove(6, 370.53, 342.54);
                usleep(16707.75);
                touchMove(6, 377.71, 342.54);
                usleep(16659.38);
                touchMove(6, 385.92, 342.54);
                usleep(16725.67);
                touchMove(6, 394.13, 341.52);
                usleep(16757.71);
                touchMove(6, 403.37, 341.52);
                usleep(16685.29);
                touchMove(6, 414.67, 340.50);
                usleep(16726.12);
                touchMove(6, 425.95, 340.50);
                usleep(16513.38);
                touchMove(6, 438.26, 340.50);
                usleep(16588.58);
                touchMove(6, 448.53, 340.50);
                usleep(16680.12);
                touchMove(6, 458.79, 340.50);
                usleep(16806.29);
                touchMove(6, 470.09, 340.50);
                usleep(16539.58);
                touchMove(6, 481.37, 340.50);
                usleep(16669.04);
                touchMove(6, 491.64, 340.50);
                usleep(16670.71);
                touchMove(6, 499.86, 340.50);
                usleep(16717.12);
                touchMove(6, 509.09, 340.50);
                usleep(16552.42);
                touchMove(6, 516.28, 340.50);
                usleep(16830.04);
                touchMove(6, 525.51, 340.50);
                usleep(16598.29);
                touchMove(6, 534.75, 340.50);
                usleep(16603.88);
                touchMove(6, 546.04, 340.50);
                usleep(16814.46);
                touchMove(6, 557.33, 340.50);
                usleep(16594.08);
                touchMove(6, 569.64, 340.50);
                usleep(16739.50);
                touchMove(6, 582.98, 340.50);
                usleep(16860.88);
                touchMove(6, 596.33, 340.50);
                usleep(16533.67);
                touchMove(6, 609.67, 340.50);
                usleep(16498.42);
                touchMove(6, 623.02, 340.50);
                usleep(16703.92);
                touchMove(6, 639.44, 341.52);
                usleep(16713.00);
                touchMove(6, 652.78, 342.54);
                usleep(16573.58);
                touchMove(6, 665.11, 343.56);
                usleep(16703.83);
                touchMove(6, 676.39, 344.57);
                usleep(16414.88);
                touchUp(6, 690.77, 345.59);
                break;
            case 2:
                touchDown(2, 71.85, 350.68);
                usleep(85326.79);
                touchMove(2, 81.08, 350.68);
                usleep(16202.67);
                touchMove(2, 87.24, 350.68);
                usleep(16647.58);
                touchMove(2, 94.43, 350.68);
                usleep(16736.71);
                touchMove(2, 102.63, 350.68);
                usleep(16717.00);
                touchMove(2, 111.88, 350.68);
                usleep(16525.88);
                touchMove(2, 121.11, 350.68);
                usleep(16710.08);
                touchMove(2, 128.30, 350.68);
                usleep(16464.54);
                touchMove(2, 133.43, 349.66);
                usleep(16677.12);
                touchMove(2, 137.54, 349.66);
                usleep(16798.08);
                touchMove(2, 141.63, 348.64);
                usleep(16734.62);
                touchMove(2, 143.69, 347.63);
                usleep(16620.46);
                touchMove(2, 146.77, 346.61);
                usleep(16912.25);
                touchMove(2, 149.85, 345.59);
                usleep(16342.08);
                touchMove(2, 152.93, 344.57);
                usleep(16817.21);
                touchMove(2, 156.01, 344.57);
                usleep(16684.38);
                touchMove(2, 161.14, 343.56);
                usleep(16583.67);
                touchMove(2, 166.27, 342.54);
                usleep(16620.12);
                touchMove(2, 172.43, 342.54);
                usleep(16673.17);
                touchMove(2, 178.59, 340.50);
                usleep(16564.33);
                touchMove(2, 185.77, 340.50);
                usleep(16691.29);
                touchMove(2, 190.91, 340.50);
                usleep(16660.21);
                touchMove(2, 197.07, 340.50);
                usleep(16695.17);
                touchMove(2, 203.22, 340.50);
                usleep(16693.08);
                touchMove(2, 208.35, 340.50);
                usleep(16675.67);
                touchMove(2, 214.51, 340.50);
                usleep(16659.96);
                touchMove(2, 220.66, 340.50);
                usleep(16572.62);
                touchMove(2, 227.85, 340.50);
                usleep(16946.08);
                touchMove(2, 236.07, 340.50);
                usleep(16489.79);
                touchMove(2, 245.30, 340.50);
                usleep(16591.75);
                touchMove(2, 255.57, 340.50);
                usleep(16968.46);
                touchMove(2, 266.85, 340.50);
                usleep(16378.92);
                touchMove(2, 278.15, 340.50);
                usleep(16757.25);
                touchMove(2, 291.49, 340.50);
                usleep(16854.58);
                touchMove(2, 304.84, 340.50);
                usleep(16574.42);
                touchMove(2, 317.15, 340.50);
                usleep(16504.96);
                touchMove(2, 328.45, 340.50);
                usleep(16848.25);
                touchMove(2, 340.76, 340.50);
                usleep(16699.04);
                touchMove(2, 354.10, 341.52);
                usleep(16500.71);
                touchMove(2, 367.45, 342.54);
                usleep(16903.54);
                touchMove(2, 380.79, 344.57);
                usleep(16343.04);
                touchMove(2, 394.13, 345.59);
                usleep(16782.71);
                touchMove(2, 412.61, 346.61);
                usleep(16685.42);
                touchMove(2, 434.17, 346.61);
                usleep(16565.25);
                touchMove(2, 456.75, 346.61);
                usleep(16699.96);
                touchMove(2, 483.43, 346.61);
                usleep(16710.21);
                touchMove(2, 512.17, 347.63);
                usleep(16666.71);
                touchMove(2, 540.90, 348.64);
                usleep(16615.17);
                touchMove(2, 567.59, 351.70);
                usleep(16796.62);
                touchMove(2, 594.28, 355.77);
                usleep(16542.58);
                touchMove(2, 620.97, 359.84);
                usleep(16728.04);
                touchMove(2, 647.66, 362.89);
                usleep(16683.71);
                touchMove(2, 675.36, 364.93);
                usleep(16425.54);
                touchMove(2, 709.24, 365.95);
                usleep(16660.62);
                touchMove(2, 732.85, 366.96);
                usleep(16605.50);
                touchMove(2, 744.14, 366.96);
                usleep(15450.50);
                touchUp(2, 748.24, 362.89);
                break;
            case 3:
                touchDown(6, 88.27, 345.59);
                usleep(68268.96);
                touchMove(6, 99.55, 348.64);
                usleep(16471.58);
                touchMove(6, 105.71, 348.64);
                usleep(16779.08);
                touchMove(6, 113.93, 348.64);
                usleep(16627.88);
                touchMove(6, 124.19, 347.63);
                usleep(16641.04);
                touchMove(6, 136.51, 345.59);
                usleep(16724.71);
                touchMove(6, 149.85, 343.56);
                usleep(16826.12);
                touchMove(6, 165.24, 340.50);
                usleep(16384.62);
                touchMove(6, 181.66, 338.47);
                usleep(16616.33);
                touchMove(6, 199.12, 336.43);
                usleep(16631.38);
                touchMove(6, 221.69, 333.38);
                usleep(16678.00);
                touchMove(6, 244.27, 331.34);
                usleep(16789.21);
                touchMove(6, 269.94, 328.29);
                usleep(16641.92);
                touchMove(6, 302.79, 325.24);
                usleep(16626.12);
                touchMove(6, 335.63, 322.18);
                usleep(16728.92);
                touchMove(6, 370.53, 319.13);
                usleep(16583.29);
                touchMove(6, 417.74, 314.02);
                usleep(16585.38);
                touchMove(6, 455.72, 309.95);
                usleep(16656.75);
                touchMove(6, 496.78, 306.90);
                usleep(16772.21);
                touchMove(6, 545.01, 302.82);
                usleep(16614.67);
                touchMove(6, 580.94, 300.79);
                usleep(16736.46);
                touchMove(6, 617.89, 297.74);
                usleep(16733.08);
                touchMove(6, 646.63, 294.68);
                usleep(16456.04);
                touchMove(6, 674.34, 291.63);
                usleep(16654.17);
                touchMove(6, 697.95, 288.58);
                usleep(16637.58);
                touchMove(6, 709.24, 288.58);
                usleep(16543.21);
                touchMove(6, 716.42, 288.58);
                usleep(16711.75);
                touchMove(6, 720.53, 288.58);
                usleep(16733.62);
                touchMove(6, 721.55, 288.58);
                usleep(16528.17);
                touchMove(6, 722.58, 288.58);
                usleep(48951.04);
                touchUp(6, 724.63, 288.58);
                break;
            case 4:
                touchDown(2, 74.92, 356.79);
                usleep(67886.38);
                touchMove(2, 90.32, 354.75);
                usleep(16677.17);
                touchMove(2, 101.61, 354.75);
                usleep(16707.00);
                touchMove(2, 117.00, 353.73);
                usleep(16763.50);
                touchMove(2, 143.69, 349.66);
                usleep(16768.46);
                touchMove(2, 177.57, 343.56);
                usleep(16538.00);
                touchMove(2, 215.54, 339.48);
                usleep(16541.08);
                touchMove(2, 255.57, 339.48);
                usleep(16693.88);
                touchMove(2, 306.88, 339.48);
                usleep(16676.25);
                touchMove(2, 363.34, 336.43);
                usleep(16592.46);
                touchMove(2, 438.26, 327.27);
                usleep(16859.75);
                touchMove(2, 506.01, 319.13);
                usleep(16647.46);
                touchMove(2, 562.47, 313.00);
                usleep(16649.58);
                touchMove(2, 613.78, 310.97);
                usleep(16786.33);
                touchMove(2, 644.58, 310.97);
                usleep(16738.75);
                touchMove(2, 666.13, 314.02);
                usleep(16391.71);
                touchMove(2, 681.53, 320.15);
                usleep(16517.12);
                touchMove(2, 692.81, 323.20);
                usleep(16527.75);
                touchMove(2, 701.03, 326.25);
                usleep(16790.83);
                touchMove(2, 705.13, 328.29);
                usleep(16655.25);
                touchMove(2, 707.19, 328.29);
                usleep(16635.58);
                touchMove(2, 708.21, 328.29);
                usleep(49970.83);
                touchMove(2, 708.21, 329.31);
                usleep(15588.04);
                touchUp(2, 711.28, 332.36);
                break;
            case 5:
                touchDown(6, 94.43, 343.56);
                usleep(101585.33);
                touchMove(6, 98.53, 341.52);
                usleep(16586.50);
                touchMove(6, 103.66, 341.52);
                usleep(16396.92);
                touchMove(6, 110.85, 341.52);
                usleep(16891.88);
                touchMove(6, 119.05, 341.52);
                usleep(16392.71);
                touchMove(6, 127.27, 341.52);
                usleep(16892.92);
                touchMove(6, 136.51, 341.52);
                usleep(16715.83);
                touchMove(6, 144.72, 341.52);
                usleep(16506.50);
                touchMove(6, 152.93, 341.52);
                usleep(16707.71);
                touchMove(6, 162.16, 341.52);
                usleep(16796.33);
                touchMove(6, 171.40, 341.52);
                usleep(16704.33);
                touchMove(6, 179.62, 341.52);
                usleep(16521.42);
                touchMove(6, 187.82, 341.52);
                usleep(16635.25);
                touchMove(6, 195.01, 341.52);
                usleep(16862.75);
                touchMove(6, 203.22, 341.52);
                usleep(16625.04);
                touchMove(6, 211.43, 340.50);
                usleep(16535.04);
                touchMove(6, 221.69, 339.48);
                usleep(16596.58);
                touchMove(6, 232.99, 338.47);
                usleep(16672.21);
                touchMove(6, 243.26, 337.45);
                usleep(16902.33);
                touchMove(6, 253.52, 336.43);
                usleep(16661.42);
                touchMove(6, 264.80, 336.43);
                usleep(16417.71);
                touchMove(6, 276.10, 336.43);
                usleep(16727.71);
                touchMove(6, 288.41, 336.43);
                usleep(16624.88);
                touchMove(6, 299.70, 336.43);
                usleep(16670.46);
                touchMove(6, 310.99, 336.43);
                usleep(16838.42);
                touchMove(6, 322.29, 336.43);
                usleep(16677.71);
                touchMove(6, 334.60, 336.43);
                usleep(16531.42);
                touchMove(6, 347.95, 336.43);
                usleep(16874.29);
                touchMove(6, 360.26, 336.43);
                usleep(16477.96);
                touchMove(6, 372.57, 336.43);
                usleep(16639.54);
                touchMove(6, 383.87, 336.43);
                usleep(16813.21);
                touchMove(6, 396.18, 336.43);
                usleep(16696.17);
                touchMove(6, 409.53, 336.43);
                usleep(16408.50);
                touchMove(6, 422.87, 336.43);
                usleep(17043.12);
                touchMove(6, 435.18, 336.43);
                usleep(16520.67);
                touchMove(6, 449.56, 336.43);
                usleep(16489.54);
                touchMove(6, 464.95, 336.43);
                usleep(16776.17);
                touchMove(6, 480.35, 336.43);
                usleep(16614.00);
                touchMove(6, 495.75, 336.43);
                usleep(16732.21);
                touchMove(6, 511.14, 336.43);
                usleep(16583.38);
                touchMove(6, 528.59, 336.43);
                usleep(16710.17);
                touchMove(6, 545.01, 336.43);
                usleep(16720.92);
                touchMove(6, 558.36, 336.43);
                usleep(16758.79);
                touchMove(6, 571.70, 336.43);
                usleep(16565.46);
                touchMove(6, 584.01, 336.43);
                usleep(16688.33);
                touchMove(6, 595.31, 336.43);
                usleep(16591.08);
                touchMove(6, 605.58, 336.43);
                usleep(16716.54);
                touchMove(6, 613.78, 336.43);
                usleep(16753.08);
                touchMove(6, 620.97, 336.43);
                usleep(16579.29);
                touchMove(6, 627.12, 336.43);
                usleep(16953.83);
                touchMove(6, 633.28, 336.43);
                usleep(16400.67);
                touchMove(6, 638.42, 336.43);
                usleep(16694.92);
                touchMove(6, 642.52, 336.43);
                usleep(16553.88);
                touchMove(6, 647.66, 336.43);
                usleep(16620.33);
                touchMove(6, 651.76, 336.43);
                usleep(16723.50);
                touchMove(6, 655.86, 336.43);
                usleep(16688.17);
                touchMove(6, 659.97, 336.43);
                usleep(16633.12);
                touchMove(6, 663.05, 336.43);
                usleep(16926.75);
                touchMove(6, 667.16, 336.43);
                usleep(16435.79);
                touchMove(6, 670.23, 336.43);
                usleep(16691.08);
                touchMove(6, 674.34, 336.43);
                usleep(16665.92);
                touchMove(6, 678.44, 336.43);
                usleep(16487.00);
                touchMove(6, 682.55, 336.43);
                usleep(16419.75);
                touchMove(6, 687.69, 336.43);
                usleep(16864.21);
                touchMove(6, 693.84, 336.43);
                usleep(16636.21);
                touchMove(6, 700.00, 336.43);
                usleep(16677.50);
                touchMove(6, 706.16, 336.43);
                usleep(16722.42);
                touchMove(6, 713.34, 336.43);
                usleep(16803.62);
                touchMove(6, 722.58, 336.43);
                usleep(16538.21);
                touchMove(6, 732.85, 336.43);
                usleep(16613.88);
                touchMove(6, 740.03, 334.40);
                usleep(16635.75);
                touchMove(6, 745.16, 333.38);
                usleep(16543.58);
                touchUp(6, 746.19, 324.22);
                break;
        }
    }

    truotTheoHanhViNoFull() {
        const randTruot = this.getRandom(1, 5);
        this.thongBao("Truot truong hop: " + randTruot);
        at.usleep(1000000);
        switch (randTruot) {
            case 1:

                touchDown(4, 64.66, 420.93);
                usleep(118168.25);
                touchMove(4, 79.02, 425.00);
                usleep(16622.54);
                touchMove(4, 84.16, 425.00);
                usleep(16697.38);
                touchMove(4, 90.32, 425.00);
                usleep(16699.54);
                touchMove(4, 97.50, 425.00);
                usleep(16590.79);
                touchMove(4, 103.66, 425.00);
                usleep(16639.38);
                touchMove(4, 111.88, 425.00);
                usleep(16706.92);
                touchMove(4, 118.03, 425.00);
                usleep(16622.04);
                touchMove(4, 125.21, 423.98);
                usleep(16707.67);
                touchMove(4, 132.40, 421.94);
                usleep(16681.33);
                touchMove(4, 139.58, 421.94);
                usleep(16617.25);
                touchMove(4, 145.74, 420.93);
                usleep(16709.50);
                touchMove(4, 152.93, 419.91);
                usleep(16744.42);
                touchMove(4, 160.11, 419.91);
                usleep(16581.50);
                touchMove(4, 168.32, 419.91);
                usleep(16643.33);
                touchMove(4, 176.54, 419.91);
                usleep(16799.79);
                touchMove(4, 183.72, 419.91);
                usleep(16730.25);
                touchMove(4, 191.93, 419.91);
                usleep(16444.00);
                touchMove(4, 199.12, 419.91);
                usleep(16824.33);
                touchMove(4, 207.33, 419.91);
                usleep(16528.38);
                touchMove(4, 215.54, 419.91);
                usleep(16666.04);
                touchMove(4, 223.75, 419.91);
                usleep(16811.00);
                touchMove(4, 232.99, 419.91);
                usleep(16555.29);
                touchMove(4, 242.23, 419.91);
                usleep(16650.71);
                touchMove(4, 251.46, 419.91);
                usleep(16735.12);
                touchMove(4, 262.76, 419.91);
                usleep(16587.67);
                touchMove(4, 274.04, 419.91);
                usleep(16652.67);
                touchMove(4, 285.34, 419.91);
                usleep(16758.67);
                touchMove(4, 295.60, 419.91);
                usleep(16623.08);
                touchMove(4, 304.84, 419.91);
                usleep(16637.00);
                touchMove(4, 315.10, 419.91);
                usleep(16729.83);
                touchMove(4, 325.37, 419.91);
                usleep(16564.17);
                touchMove(4, 334.60, 417.87);
                usleep(16812.88);
                touchMove(4, 342.81, 416.85);
                usleep(16600.79);
                touchMove(4, 352.05, 415.84);
                usleep(16532.75);
                touchMove(4, 361.29, 414.82);
                usleep(16809.04);
                touchMove(4, 370.53, 413.80);
                usleep(16881.88);
                touchMove(4, 379.76, 411.77);
                usleep(16446.00);
                touchMove(4, 386.95, 409.73);
                usleep(16619.17);
                touchMove(4, 395.15, 407.69);
                usleep(16744.42);
                touchMove(4, 402.34, 406.68);
                usleep(16640.17);
                touchMove(4, 409.53, 404.64);
                usleep(16652.54);
                touchMove(4, 415.68, 403.62);
                usleep(16771.25);
                touchMove(4, 422.87, 402.61);
                usleep(16614.75);
                touchMove(4, 429.03, 401.59);
                usleep(16675.08);
                touchMove(4, 436.21, 401.59);
                usleep(16721.33);
                touchMove(4, 441.34, 400.57);
                usleep(16598.75);
                touchMove(4, 447.51, 400.57);
                usleep(16659.12);
                touchMove(4, 453.67, 400.57);
                usleep(16690.29);
                touchMove(4, 458.79, 399.55);
                usleep(16620.46);
                touchMove(4, 463.93, 399.55);
                usleep(16664.75);
                touchMove(4, 469.06, 399.55);
                usleep(16769.88);
                touchMove(4, 474.19, 399.55);
                usleep(16581.75);
                touchMove(4, 479.32, 399.55);
                usleep(16626.33);
                touchMove(4, 484.45, 399.55);
                usleep(16695.96);
                touchMove(4, 488.56, 399.55);
                usleep(16671.67);
                touchMove(4, 491.64, 399.55);
                usleep(16752.83);
                touchMove(4, 495.75, 399.55);
                usleep(16628.33);
                touchMove(4, 499.86, 399.55);
                usleep(16570.83);
                touchMove(4, 502.93, 399.55);
                usleep(16672.46);
                touchMove(4, 504.98, 399.55);
                usleep(16713.04);
                touchMove(4, 508.06, 399.55);
                usleep(16676.08);
                touchMove(4, 511.14, 399.55);
                usleep(16645.46);
                touchMove(4, 513.20, 399.55);
                usleep(16711.50);
                touchMove(4, 515.25, 399.55);
                usleep(16591.67);
                touchMove(4, 518.33, 399.55);
                usleep(16693.46);
                touchMove(4, 521.40, 399.55);
                usleep(16729.79);
                touchMove(4, 525.51, 399.55);
                usleep(16679.79);
                touchMove(4, 529.62, 399.55);
                usleep(16573.79);
                touchMove(4, 534.75, 399.55);
                usleep(16727.54);
                touchMove(4, 540.90, 399.55);
                usleep(16632.75);
                touchMove(4, 546.04, 399.55);
                usleep(16684.38);
                touchMove(4, 550.14, 399.55);
                usleep(16718.54);
                touchMove(4, 555.28, 400.57);
                usleep(16609.88);
                touchMove(4, 560.41, 400.57);
                usleep(16802.67);
                touchMove(4, 564.51, 400.57);
                usleep(16620.92);
                touchMove(4, 569.64, 400.57);
                usleep(16537.71);
                touchMove(4, 574.78, 400.57);
                usleep(16731.17);
                touchMove(4, 577.86, 400.57);
                usleep(16767.42);
                touchMove(4, 581.97, 400.57);
                usleep(16549.17);
                touchMove(4, 585.04, 400.57);
                usleep(16684.33);
                touchMove(4, 589.15, 400.57);
                usleep(16692.71);
                touchMove(4, 592.23, 400.57);
                usleep(16641.04);
                touchMove(4, 595.31, 400.57);
                usleep(16765.75);
                touchMove(4, 598.39, 400.57);
                usleep(16563.25);
                touchMove(4, 602.50, 400.57);
                usleep(16665.50);
                touchMove(4, 605.58, 400.57);
                usleep(16686.21);
                touchMove(4, 609.67, 400.57);
                usleep(16712.04);
                touchMove(4, 613.78, 400.57);
                usleep(16567.79);
                touchMove(4, 618.92, 400.57);
                usleep(16733.12);
                touchMove(4, 625.08, 401.59);
                usleep(16641.50);
                touchMove(4, 630.20, 402.61);
                usleep(16716.08);
                touchMove(4, 637.39, 404.64);
                usleep(16665.46);
                touchMove(4, 645.60, 406.68);
                usleep(16768.83);
                touchMove(4, 653.81, 409.73);
                usleep(16584.62);
                touchMove(4, 662.02, 411.77);
                usleep(16580.71);
                touchMove(4, 669.20, 412.78);
                usleep(16853.08);
                touchMove(4, 676.39, 413.80);
                usleep(16604.79);
                touchMove(4, 681.53, 414.82);
                usleep(16391.29);
                touchMove(4, 687.69, 414.82);
                usleep(16789.79);
                touchMove(4, 692.81, 414.82);
                usleep(16485.67);
                touchMove(4, 696.92, 414.82);
                usleep(16657.08);
                touchMove(4, 700.00, 414.82);
                usleep(16610.00);
                touchMove(4, 703.08, 414.82);
                usleep(16754.29);
                touchMove(4, 707.19, 414.82);
                usleep(16623.71);
                touchMove(4, 709.24, 414.82);
                usleep(16832.83);
                touchMove(4, 713.34, 414.82);
                usleep(16519.62);
                touchMove(4, 716.42, 414.82);
                usleep(16664.54);
                touchMove(4, 720.53, 414.82);
                usleep(16721.42);
                touchMove(4, 724.63, 414.82);
                usleep(16489.25);
                touchMove(4, 727.71, 414.82);
                usleep(16717.00);
                touchMove(4, 730.80, 414.82);
                usleep(16748.71);
                touchMove(4, 733.88, 414.82);
                usleep(16578.00);
                touchMove(4, 735.92, 414.82);
                usleep(16644.00);
                touchMove(4, 736.95, 414.82);
                usleep(16827.79);
                touchMove(4, 737.97, 414.82);
                usleep(16472.67);
                touchMove(4, 739.00, 414.82);
                usleep(33426.96);
                touchMove(4, 740.03, 414.82);
                usleep(33253.17);
                touchMove(4, 741.05, 414.82);
                usleep(33398.38);
                touchUp(4, 748.24, 411.77);
                break;
            case 2:

                touchDown(2, 97.50, 421.94);
                usleep(66694.46);
                touchMove(2, 120.08, 425.00);
                usleep(16543.08);
                touchMove(2, 134.46, 425.00);
                usleep(16685.96);
                touchMove(2, 157.04, 425.00);
                usleep(16689.71);
                touchMove(2, 183.72, 425.00);
                usleep(16578.08);
                touchMove(2, 217.59, 420.93);
                usleep(16671.50);
                touchMove(2, 252.49, 417.87);
                usleep(16538.92);
                touchMove(2, 286.37, 414.82);
                usleep(16764.33);
                touchMove(2, 322.29, 413.80);
                usleep(16679.88);
                touchMove(2, 355.13, 412.78);
                usleep(16615.12);
                touchMove(2, 389.00, 412.78);
                usleep(16727.75);
                touchMove(2, 412.61, 412.78);
                usleep(16679.88);
                touchMove(2, 441.34, 412.78);
                usleep(16631.33);
                touchMove(2, 468.03, 412.78);
                usleep(16685.04);
                touchMove(2, 502.93, 412.78);
                usleep(16606.38);
                touchMove(2, 538.86, 412.78);
                usleep(16716.38);
                touchMove(2, 574.78, 412.78);
                usleep(16727.54);
                touchMove(2, 609.67, 407.69);
                usleep(16627.92);
                touchMove(2, 643.55, 402.61);
                usleep(16638.71);
                touchMove(2, 681.53, 396.50);
                usleep(16336.96);
                touchMove(2, 727.71, 388.36);
                usleep(15654.42);
                touchUp(2, 731.82, 384.29);
                break;
            case 3:
                touchDown(1, 76.97, 420.93);
                usleep(116486.38);
                touchMove(1, 87.24, 420.93);
                usleep(16766.54);
                touchMove(1, 94.43, 420.93);
                usleep(16583.38);
                touchMove(1, 101.61, 420.93);
                usleep(16875.21);
                touchMove(1, 110.85, 420.93);
                usleep(16673.42);
                touchMove(1, 119.05, 420.93);
                usleep(16534.29);
                touchMove(1, 130.35, 420.93);
                usleep(16658.67);
                touchMove(1, 141.63, 420.93);
                usleep(16741.46);
                touchMove(1, 150.88, 420.93);
                usleep(16664.96);
                touchMove(1, 160.11, 420.93);
                usleep(16658.33);
                touchMove(1, 168.32, 420.93);
                usleep(16666.21);
                touchMove(1, 176.54, 420.93);
                usleep(16683.96);
                touchMove(1, 185.77, 420.93);
                usleep(16798.46);
                touchMove(1, 196.04, 420.93);
                usleep(16587.00);
                touchMove(1, 208.35, 420.93);
                usleep(16608.75);
                touchMove(1, 219.65, 420.93);
                usleep(16671.92);
                touchMove(1, 230.93, 420.93);
                usleep(16671.46);
                touchMove(1, 241.20, 420.93);
                usleep(16634.00);
                touchMove(1, 250.43, 420.93);
                usleep(16623.50);
                touchMove(1, 260.70, 420.93);
                usleep(16757.25);
                touchMove(1, 268.91, 420.93);
                usleep(16623.08);
                touchMove(1, 279.18, 421.94);
                usleep(16619.67);
                touchMove(1, 290.46, 422.96);
                usleep(16829.71);
                touchMove(1, 301.76, 422.96);
                usleep(16690.25);
                touchMove(1, 314.07, 422.96);
                usleep(16405.83);
                touchMove(1, 325.37, 422.96);
                usleep(16792.17);
                touchMove(1, 336.65, 422.96);
                usleep(16640.54);
                touchMove(1, 346.92, 422.96);
                usleep(16703.83);
                touchMove(1, 358.21, 422.96);
                usleep(16681.75);
                touchMove(1, 369.50, 422.96);
                usleep(16698.00);
                touchMove(1, 381.82, 422.96);
                usleep(16647.04);
                touchMove(1, 394.13, 422.96);
                usleep(16626.79);
                touchMove(1, 404.40, 422.96);
                usleep(16647.04);
                touchMove(1, 412.61, 420.93);
                usleep(16648.92);
                touchMove(1, 420.82, 419.91);
                usleep(16848.58);
                touchMove(1, 426.98, 418.89);
                usleep(16543.96);
                touchMove(1, 432.11, 417.87);
                usleep(16610.96);
                touchMove(1, 437.24, 415.84);
                usleep(16786.92);
                touchMove(1, 441.34, 414.82);
                usleep(16668.46);
                touchMove(1, 444.43, 413.80);
                usleep(16573.83);
                touchMove(1, 448.53, 413.80);
                usleep(16759.67);
                touchMove(1, 451.61, 412.78);
                usleep(16621.38);
                touchMove(1, 456.75, 412.78);
                usleep(16705.25);
                touchMove(1, 462.90, 411.77);
                usleep(16662.25);
                touchMove(1, 469.06, 411.77);
                usleep(16617.29);
                touchMove(1, 477.28, 411.77);
                usleep(16682.79);
                touchMove(1, 487.53, 410.75);
                usleep(16696.17);
                touchMove(1, 501.90, 410.75);
                usleep(16668.83);
                touchMove(1, 517.30, 410.75);
                usleep(16710.92);
                touchMove(1, 532.70, 410.75);
                usleep(16715.04);
                touchMove(1, 550.14, 410.75);
                usleep(16586.50);
                touchMove(1, 563.48, 410.75);
                usleep(16709.96);
                touchMove(1, 577.86, 410.75);
                usleep(16663.46);
                touchMove(1, 591.20, 410.75);
                usleep(16613.79);
                touchMove(1, 603.52, 410.75);
                usleep(16727.83);
                touchMove(1, 615.83, 410.75);
                usleep(16632.00);
                touchMove(1, 626.09, 408.71);
                usleep(16656.96);
                touchMove(1, 635.34, 407.69);
                usleep(16663.75);
                touchMove(1, 644.58, 405.66);
                usleep(16690.12);
                touchMove(1, 653.81, 404.64);
                usleep(16610.42);
                touchMove(1, 663.05, 403.62);
                usleep(16706.38);
                touchMove(1, 675.36, 402.61);
                usleep(16529.67);
                touchMove(1, 693.84, 401.59);
                usleep(16390.83);
                touchMove(1, 706.16, 401.59);
                usleep(16691.38);
                touchMove(1, 720.53, 401.59);
                usleep(16837.25);
                touchMove(1, 731.82, 401.59);
                usleep(16507.62);
                touchMove(1, 741.05, 401.59);
                usleep(15583.96);
                touchUp(1, 745.16, 399.55);
                break;
            case 4:
                touchDown(1, 58.50, 408.71);
                usleep(200370.38);
                touchMove(1, 74.92, 408.71);
                usleep(16707.54);
                touchMove(1, 76.97, 408.71);
                usleep(16626.12);
                touchMove(1, 80.05, 408.71);
                usleep(16736.00);
                touchMove(1, 83.13, 408.71);
                usleep(16640.12);
                touchMove(1, 85.19, 408.71);
                usleep(16623.38);
                touchMove(1, 89.29, 408.71);
                usleep(16893.75);
                touchMove(1, 93.40, 408.71);
                usleep(16507.67);
                touchMove(1, 96.47, 407.69);
                usleep(16718.33);
                touchMove(1, 100.58, 407.69);
                usleep(16530.79);
                touchMove(1, 103.66, 407.69);
                usleep(16726.96);
                touchMove(1, 106.74, 407.69);
                usleep(16601.00);
                touchMove(1, 109.82, 407.69);
                usleep(16729.88);
                touchMove(1, 112.90, 407.69);
                usleep(16720.83);
                touchMove(1, 114.96, 407.69);
                usleep(16531.00);
                touchMove(1, 118.03, 407.69);
                usleep(16672.54);
                touchMove(1, 122.13, 407.69);
                usleep(16756.08);
                touchMove(1, 125.21, 407.69);
                usleep(16556.58);
                touchMove(1, 129.32, 407.69);
                usleep(16649.29);
                touchMove(1, 131.38, 407.69);
                usleep(16822.50);
                touchMove(1, 134.46, 407.69);
                usleep(16522.58);
                touchMove(1, 136.51, 407.69);
                usleep(16719.83);
                touchMove(1, 137.54, 407.69);
                usleep(16749.96);
                touchMove(1, 139.58, 407.69);
                usleep(16578.33);
                touchMove(1, 141.63, 407.69);
                usleep(16711.58);
                touchMove(1, 142.66, 407.69);
                usleep(16669.29);
                touchMove(1, 143.69, 407.69);
                usleep(16669.96);
                touchMove(1, 145.74, 407.69);
                usleep(16637.00);
                touchMove(1, 146.77, 407.69);
                usleep(16707.58);
                touchMove(1, 149.85, 407.69);
                usleep(16620.17);
                touchMove(1, 152.93, 407.69);
                usleep(16854.21);
                touchMove(1, 156.01, 407.69);
                usleep(16563.46);
                touchMove(1, 159.08, 407.69);
                usleep(16530.33);
                touchMove(1, 162.16, 407.69);
                usleep(16674.92);
                touchMove(1, 166.27, 407.69);
                usleep(16728.54);
                touchMove(1, 170.38, 407.69);
                usleep(16656.21);
                touchMove(1, 175.51, 407.69);
                usleep(16640.92);
                touchMove(1, 179.62, 407.69);
                usleep(16709.12);
                touchMove(1, 184.74, 407.69);
                usleep(16678.42);
                touchMove(1, 188.85, 407.69);
                usleep(16640.71);
                touchMove(1, 193.99, 407.69);
                usleep(16746.38);
                touchMove(1, 198.09, 407.69);
                usleep(16563.67);
                touchMove(1, 204.24, 407.69);
                usleep(16722.54);
                touchMove(1, 209.38, 407.69);
                usleep(16646.50);
                touchMove(1, 216.57, 407.69);
                usleep(16555.08);
                touchMove(1, 222.72, 407.69);
                usleep(16835.88);
                touchMove(1, 229.91, 407.69);
                usleep(16612.92);
                touchMove(1, 237.09, 407.69);
                usleep(16620.96);
                touchMove(1, 244.27, 407.69);
                usleep(16634.12);
                touchMove(1, 250.43, 407.69);
                usleep(16766.17);
                touchMove(1, 257.62, 407.69);
                usleep(16592.33);
                touchMove(1, 263.77, 407.69);
                usleep(16831.04);
                touchMove(1, 270.96, 407.69);
                usleep(16593.54);
                touchMove(1, 277.12, 407.69);
                usleep(16573.75);
                touchMove(1, 283.28, 407.69);
                usleep(16843.17);
                touchMove(1, 289.44, 407.69);
                usleep(16553.00);
                touchMove(1, 295.60, 407.69);
                usleep(16604.12);
                touchMove(1, 300.73, 407.69);
                usleep(16657.96);
                touchMove(1, 305.87, 407.69);
                usleep(16735.25);
                touchMove(1, 310.99, 407.69);
                usleep(16620.21);
                touchMove(1, 316.12, 407.69);
                usleep(16765.33);
                touchMove(1, 321.26, 407.69);
                usleep(16716.21);
                touchMove(1, 327.42, 407.69);
                usleep(16652.67);
                touchMove(1, 333.57, 407.69);
                usleep(16604.71);
                touchMove(1, 340.76, 407.69);
                usleep(16735.83);
                touchMove(1, 347.95, 407.69);
                usleep(16528.75);
                touchMove(1, 355.13, 408.71);
                usleep(16739.42);
                touchMove(1, 362.31, 409.73);
                usleep(16674.79);
                touchMove(1, 368.48, 410.75);
                usleep(16551.96);
                touchMove(1, 374.63, 411.77);
                usleep(16786.58);
                touchMove(1, 380.79, 411.77);
                usleep(16739.38);
                touchMove(1, 387.98, 412.78);
                usleep(16622.50);
                touchMove(1, 394.13, 412.78);
                usleep(16740.71);
                touchMove(1, 400.29, 412.78);
                usleep(16595.12);
                touchMove(1, 407.48, 412.78);
                usleep(16659.92);
                touchMove(1, 413.64, 412.78);
                usleep(16757.83);
                touchMove(1, 420.82, 412.78);
                usleep(16625.92);
                touchMove(1, 425.95, 412.78);
                usleep(16525.00);
                touchMove(1, 431.09, 412.78);
                usleep(16711.79);
                touchMove(1, 436.21, 412.78);
                usleep(16714.83);
                touchMove(1, 441.34, 412.78);
                usleep(16655.29);
                touchMove(1, 447.51, 412.78);
                usleep(16684.33);
                touchMove(1, 452.64, 412.78);
                usleep(16673.33);
                touchMove(1, 458.79, 412.78);
                usleep(16639.54);
                touchMove(1, 464.95, 412.78);
                usleep(16726.50);
                touchMove(1, 472.14, 412.78);
                usleep(16645.50);
                touchMove(1, 478.29, 412.78);
                usleep(16726.04);
                touchMove(1, 484.45, 412.78);
                usleep(16510.88);
                touchMove(1, 490.61, 412.78);
                usleep(16790.62);
                touchMove(1, 495.75, 412.78);
                usleep(16595.92);
                touchMove(1, 501.90, 412.78);
                usleep(16716.88);
                touchMove(1, 509.09, 412.78);
                usleep(16683.62);
                touchMove(1, 515.25, 412.78);
                usleep(16625.42);
                touchMove(1, 522.43, 412.78);
                usleep(16751.46);
                touchMove(1, 529.62, 412.78);
                usleep(16674.04);
                touchMove(1, 536.80, 412.78);
                usleep(16586.21);
                touchMove(1, 542.96, 412.78);
                usleep(16717.17);
                touchMove(1, 549.12, 412.78);
                usleep(16811.92);
                touchMove(1, 554.25, 412.78);
                usleep(16421.00);
                touchMove(1, 559.39, 412.78);
                usleep(16696.42);
                touchMove(1, 564.51, 412.78);
                usleep(16741.71);
                touchMove(1, 568.62, 412.78);
                usleep(16619.96);
                touchMove(1, 574.78, 412.78);
                usleep(16658.42);
                touchMove(1, 578.89, 412.78);
                usleep(16861.38);
                touchMove(1, 584.01, 412.78);
                usleep(16486.42);
                touchMove(1, 590.17, 412.78);
                usleep(16742.75);
                touchMove(1, 595.31, 412.78);
                usleep(16740.75);
                touchMove(1, 600.44, 412.78);
                usleep(16521.46);
                touchMove(1, 605.58, 411.77);
                usleep(16686.21);
                touchMove(1, 610.70, 411.77);
                usleep(16710.33);
                touchMove(1, 615.83, 410.75);
                usleep(16542.29);
                touchMove(1, 619.94, 410.75);
                usleep(16753.75);
                touchMove(1, 625.08, 410.75);
                usleep(16793.79);
                touchMove(1, 630.20, 410.75);
                usleep(16503.96);
                touchMove(1, 635.34, 410.75);
                usleep(16666.50);
                touchMove(1, 639.44, 410.75);
                usleep(16691.58);
                touchMove(1, 644.58, 410.75);
                usleep(16674.50);
                touchMove(1, 649.70, 410.75);
                usleep(16600.42);
                touchMove(1, 653.81, 410.75);
                usleep(16820.17);
                touchMove(1, 656.89, 410.75);
                usleep(16625.46);
                touchMove(1, 661.00, 410.75);
                usleep(16609.83);
                touchMove(1, 665.11, 410.75);
                usleep(16689.79);
                touchMove(1, 668.19, 410.75);
                usleep(16584.79);
                touchMove(1, 671.26, 410.75);
                usleep(16736.96);
                touchMove(1, 674.34, 410.75);
                usleep(16672.92);
                touchMove(1, 677.42, 410.75);
                usleep(16637.42);
                touchMove(1, 679.47, 410.75);
                usleep(16363.08);
                touchMove(1, 682.55, 410.75);
                usleep(16796.79);
                touchMove(1, 686.66, 410.75);
                usleep(16621.46);
                touchMove(1, 689.74, 410.75);
                usleep(16608.50);
                touchMove(1, 692.81, 410.75);
                usleep(16719.83);
                touchMove(1, 695.89, 410.75);
                usleep(16621.33);
                touchMove(1, 698.97, 410.75);
                usleep(16754.38);
                touchMove(1, 701.03, 410.75);
                usleep(16598.12);
                touchMove(1, 703.08, 410.75);
                usleep(16602.75);
                touchMove(1, 705.13, 410.75);
                usleep(16742.29);
                touchMove(1, 706.16, 410.75);
                usleep(16628.38);
                touchMove(1, 708.21, 410.75);
                usleep(16666.50);
                touchMove(1, 710.27, 410.75);
                usleep(16659.75);
                touchMove(1, 711.28, 410.75);
                usleep(16747.38);
                touchMove(1, 712.31, 410.75);
                usleep(16532.17);
                touchMove(1, 713.34, 410.75);
                usleep(16690.96);
                touchMove(1, 714.37, 410.75);
                usleep(16777.33);
                touchMove(1, 715.39, 410.75);
                usleep(33325.75);
                touchMove(1, 716.42, 410.75);
                usleep(16703.46);
                touchMove(1, 717.45, 410.75);
                usleep(16542.92);
                touchMove(1, 718.47, 410.75);
                usleep(16717.83);
                touchMove(1, 719.50, 410.75);
                usleep(50039.50);
                touchMove(1, 720.53, 410.75);
                usleep(49889.38);
                touchMove(1, 721.55, 410.75);
                usleep(16816.12);
                touchMove(1, 721.55, 411.77);
                usleep(50026.62);
                touchMove(1, 722.58, 411.77);
                usleep(316629.04);
                touchMove(1, 723.61, 411.77);
                usleep(16783.46);
                touchMove(1, 723.61, 412.78);
                usleep(33228.50);
                touchMove(1, 724.63, 412.78);
                usleep(16583.38);
                touchMove(1, 727.71, 412.78);
                usleep(16710.42);
                touchUp(1, 740.03, 412.78);
                break;
            case 5:
                touchDown(3, 87.24, 412.78);
                usleep(83411.21);
                touchMove(3, 98.53, 416.85);
                usleep(16532.92);
                touchMove(3, 102.63, 416.85);
                usleep(16752.62);
                touchMove(3, 108.79, 416.85);
                usleep(16553.42);
                touchMove(3, 114.96, 416.85);
                usleep(16667.96);
                touchMove(3, 123.16, 416.85);
                usleep(16769.29);
                touchMove(3, 130.35, 416.85);
                usleep(16743.58);
                touchMove(3, 138.55, 416.85);
                usleep(16666.29);
                touchMove(3, 146.77, 416.85);
                usleep(16676.67);
                touchMove(3, 153.96, 416.85);
                usleep(16619.38);
                touchMove(3, 161.14, 416.85);
                usleep(16678.33);
                touchMove(3, 168.32, 416.85);
                usleep(16698.12);
                touchMove(3, 175.51, 416.85);
                usleep(16516.25);
                touchMove(3, 181.66, 416.85);
                usleep(16801.46);
                touchMove(3, 187.82, 416.85);
                usleep(16609.67);
                touchMove(3, 195.01, 416.85);
                usleep(16716.08);
                touchMove(3, 202.19, 416.85);
                usleep(16555.46);
                touchMove(3, 208.35, 416.85);
                usleep(16889.88);
                touchMove(3, 214.51, 416.85);
                usleep(16494.67);
                touchMove(3, 221.69, 416.85);
                usleep(16545.71);
                touchMove(3, 227.85, 416.85);
                usleep(16866.71);
                touchMove(3, 234.01, 416.85);
                usleep(16624.71);
                touchMove(3, 241.20, 417.87);
                usleep(16556.79);
                touchMove(3, 248.38, 418.89);
                usleep(16730.25);
                touchMove(3, 255.57, 419.91);
                usleep(16678.21);
                touchMove(3, 263.77, 420.93);
                usleep(16522.33);
                touchMove(3, 273.02, 421.94);
                usleep(16791.67);
                touchMove(3, 282.26, 422.96);
                usleep(16630.21);
                touchMove(3, 293.54, 423.98);
                usleep(16656.42);
                touchMove(3, 305.87, 425.00);
                usleep(16787.54);
                touchMove(3, 320.23, 426.01);
                usleep(16643.25);
                touchMove(3, 334.60, 426.01);
                usleep(16588.50);
                touchMove(3, 348.98, 426.01);
                usleep(16659.96);
                touchMove(3, 366.42, 426.01);
                usleep(16741.00);
                touchMove(3, 381.82, 426.01);
                usleep(16632.42);
                touchMove(3, 394.13, 426.01);
                usleep(16818.50);
                touchMove(3, 406.45, 423.98);
                usleep(16413.96);
                touchMove(3, 416.71, 422.96);
                usleep(16688.04);
                touchMove(3, 426.98, 422.96);
                usleep(16790.25);
                touchMove(3, 435.18, 422.96);
                usleep(16539.88);
                touchMove(3, 442.37, 422.96);
                usleep(16741.12);
                touchMove(3, 449.56, 422.96);
                usleep(16738.75);
                touchMove(3, 455.72, 422.96);
                usleep(16531.29);
                touchMove(3, 462.90, 422.96);
                usleep(16698.12);
                touchMove(3, 469.06, 422.96);
                usleep(16739.12);
                touchMove(3, 475.22, 422.96);
                usleep(16595.38);
                touchMove(3, 482.40, 422.96);
                usleep(16722.29);
                touchMove(3, 488.56, 422.96);
                usleep(16742.46);
                touchMove(3, 494.72, 422.96);
                usleep(16509.42);
                touchMove(3, 500.87, 422.96);
                usleep(16760.12);
                touchMove(3, 507.04, 422.96);
                usleep(16640.17);
                touchMove(3, 513.20, 422.96);
                usleep(16659.88);
                touchMove(3, 518.33, 422.96);
                usleep(16698.25);
                touchMove(3, 523.46, 422.96);
                usleep(16849.88);
                touchMove(3, 527.56, 422.96);
                usleep(16405.67);
                touchMove(3, 530.64, 422.96);
                usleep(16689.17);
                touchMove(3, 534.75, 422.96);
                usleep(16797.33);
                touchMove(3, 537.83, 422.96);
                usleep(16517.58);
                touchMove(3, 540.90, 422.96);
                usleep(16682.50);
                touchMove(3, 545.01, 422.96);
                usleep(16815.96);
                touchMove(3, 549.12, 422.96);
                usleep(16643.50);
                touchMove(3, 552.20, 422.96);
                usleep(16551.42);
                touchMove(3, 556.31, 422.96);
                usleep(16734.96);
                touchMove(3, 560.41, 422.96);
                usleep(16596.21);
                touchMove(3, 564.51, 422.96);
                usleep(16682.83);
                touchMove(3, 569.64, 422.96);
                usleep(16730.04);
                touchMove(3, 573.75, 422.96);
                usleep(16597.62);
                touchMove(3, 578.89, 422.96);
                usleep(16678.54);
                touchMove(3, 582.98, 422.96);
                usleep(16896.75);
                touchMove(3, 588.12, 421.94);
                usleep(16467.00);
                touchMove(3, 592.23, 421.94);
                usleep(16682.42);
                touchMove(3, 597.36, 421.94);
                usleep(16835.46);
                touchMove(3, 602.50, 420.93);
                usleep(16461.17);
                touchMove(3, 606.59, 420.93);
                usleep(16664.54);
                touchMove(3, 611.73, 420.93);
                usleep(16848.75);
                touchMove(3, 615.83, 420.93);
                usleep(16460.50);
                touchMove(3, 619.94, 420.93);
                usleep(16810.50);
                touchMove(3, 623.02, 420.93);
                usleep(16653.50);
                touchMove(3, 627.12, 420.93);
                usleep(16680.79);
                touchMove(3, 630.20, 420.93);
                usleep(16562.62);
                touchMove(3, 634.31, 419.91);
                usleep(16852.71);
                touchMove(3, 636.36, 419.91);
                usleep(16614.21);
                touchMove(3, 639.44, 419.91);
                usleep(16542.08);
                touchMove(3, 642.52, 419.91);
                usleep(16840.58);
                touchMove(3, 644.58, 419.91);
                usleep(16554.92);
                touchMove(3, 646.63, 418.89);
                usleep(16622.17);
                touchMove(3, 648.67, 418.89);
                usleep(16801.12);
                touchMove(3, 649.70, 418.89);
                usleep(16510.04);
                touchMove(3, 651.76, 418.89);
                usleep(16671.75);
                touchMove(3, 653.81, 417.87);
                usleep(16882.54);
                touchMove(3, 655.86, 417.87);
                usleep(16589.58);
                touchMove(3, 656.89, 417.87);
                usleep(16659.79);
                touchMove(3, 658.94, 417.87);
                usleep(16702.83);
                touchMove(3, 659.97, 417.87);
                usleep(16534.71);
                touchMove(3, 661.00, 417.87);
                usleep(16757.54);
                touchMove(3, 662.02, 417.87);
                usleep(16771.88);
                touchMove(3, 663.05, 417.87);
                usleep(16534.67);
                touchMove(3, 664.08, 417.87);
                usleep(16570.62);
                touchMove(3, 665.11, 417.87);
                usleep(16918.00);
                touchMove(3, 666.13, 417.87);
                usleep(16505.00);
                touchMove(3, 667.16, 417.87);
                usleep(16652.62);
                touchMove(3, 668.19, 417.87);
                usleep(16803.33);
                touchMove(3, 669.20, 417.87);
                usleep(16483.67);
                touchMove(3, 670.23, 417.87);
                usleep(16640.21);
                touchMove(3, 671.26, 417.87);
                usleep(16715.25);
                touchMove(3, 672.28, 417.87);
                usleep(16707.62);
                touchMove(3, 673.31, 417.87);
                usleep(16572.88);
                touchMove(3, 674.34, 417.87);
                usleep(16760.54);
                touchMove(3, 675.36, 417.87);
                usleep(16618.33);
                touchMove(3, 676.39, 417.87);
                usleep(16647.00);
                touchMove(3, 678.44, 417.87);
                usleep(16803.33);
                touchMove(3, 682.55, 417.87);
                usleep(16220.38);
                touchMove(3, 687.69, 417.87);
                usleep(16727.17);
                touchMove(3, 692.81, 417.87);
                usleep(16696.54);
                touchMove(3, 696.92, 417.87);
                usleep(16624.88);
                touchMove(3, 701.03, 417.87);
                usleep(16673.04);
                touchMove(3, 704.11, 417.87);
                usleep(16702.12);
                touchMove(3, 707.19, 417.87);
                usleep(16585.83);
                touchMove(3, 708.21, 417.87);
                usleep(16699.38);
                touchMove(3, 709.24, 417.87);
                usleep(16744.42);
                touchMove(3, 710.27, 417.87);
                usleep(16609.96);
                touchMove(3, 711.28, 417.87);
                usleep(16647.42);
                touchMove(3, 712.31, 417.87);
                usleep(33355.96);
                touchMove(3, 713.34, 417.87);
                usleep(16590.00);
                touchMove(3, 714.37, 417.87);
                usleep(50069.21);
                touchMove(3, 715.39, 417.87);
                usleep(33343.79);
                touchMove(3, 716.42, 417.87);
                usleep(33430.96);
                touchMove(3, 717.45, 417.87);
                usleep(50012.96);
                touchMove(3, 718.47, 417.87);
                usleep(33334.79);
                touchMove(3, 719.50, 417.87);
                usleep(49934.83);
                touchMove(3, 720.53, 417.87);
                usleep(183357.46);
                touchMove(3, 721.55, 417.87);
                usleep(99943.38);
                touchMove(3, 722.58, 417.87);
                usleep(249921.79);
                touchMove(3, 723.61, 417.87);
                usleep(16751.29);
                touchUp(3, 731.82, 404.64);
                break;
        }
    }

    checkTruotDangNhapFullMode() {
        for (var i = 0; i < 10; i++) {
            at.usleep(3000000);
            const [result1, error1] = at.getColors([
                { x: 61, y: 349 },
                { x: 59, y: 360 },
            ])

            if (result1[0] == 1229718) {
                this.thongBao("Ok day");

                this.truotTheoHanhViRandom();
                this.delayCus(7);
            }
            else {
                this.thongBao("Mau tai cac o do " + result1[0]);
                break;
            }
        }
    }
    checkTruotDangNhapNoFullMode() {
        for (var i = 0; i < 10; i++) {
            at.usleep(3000000);
            const [result1, error1] = at.getColors([
                { x: 61, y: 349 },
                { x: 59, y: 360 },
            ])

            if (result1[0] == 1229718) {
                this.thongBao("Ok day");

                this.truotTheoHanhViNoFull();
                this.delayCus(7);
            }
            else {
                this.thongBao("Mau tai cac o do " + result1[0]);
                break;
            }
        }
    }

    checkTruotDangNhapSafari() {
        for (var i = 0; i < 10; i++) {
            at.usleep(2000000);
            const [result1, error1] = at.getColors([
                { x: 58, y: 664 },
                { x: 105, y: 663 },
            ])

            if (result1[0] == 1229718) {
                this.thongBao("Ok day");

                this.truotSafari();
                this.delayCus(7);
            }
            else {
                this.thongBao("Mau tai cac o do " + result1[0]);
                break;
            }
        }
    }
    getCodeLZDGmail() {
        this.thongBao("Mo App Safari");
        at.appRun("com.apple.mobilesafari");
        this.delayCus(3);

        this.thongBao("Open Link Reg Gmail");
        this.inputURLCus(`https://mail.google.com/mail/`);
        this.delayCus(7);

        const optionCheckReg = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 13972781, x: 0, y: 0 },
                { color: 16777215, x: 2, y: 11 },
                { color: 16777215, x: 8, y: 10 },
                { color: 13907245, x: 3, y: 1 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 652.82, y: 146.83, width: 92.96, height: 71.83 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }
        const find_checkReg = this.findToaDo(optionCheckReg, 3);
        if (find_checkReg.success == true) {
            this.thongBao("Da dang nhap");
            at.usleep(1000000);

            this.thongBao("Click mail dau tien");
            at.tap(168, 401);
            this.delayCus(3);


            const optionCheckIconLZD = {
                colors: [ // REQUIRED, colors and their relative positions
                    { color: 16459177, x: 0, y: 0 },
                    { color: 16522684, x: 4, y: 0 },
                    { color: 16459177, x: 0, y: 3 },
                    { color: 16522176, x: 5, y: 3 },
                    { color: 16458162, x: 2, y: 1 }
                ],
                count: 3, // OPTIONAL, default is 0, 0 means no limitation
                region: { x: 240.85, y: 638.03, width: 265.14, height: 95.07 }, // OPTIONAL, default is null, null means the whole screen
                debug: false,
            }
            const find_optionCheckIconLZD = this.findToaDo(optionCheckIconLZD, 3);
            if (find_optionCheckIconLZD.success == true) {
                touchDown(1, 201.16, 915.74);
                usleep(83072.83);
                touchMove(1, 197.07, 900.47);
                usleep(16674.17);
                touchMove(1, 197.07, 886.23);
                usleep(16634.33);
                touchMove(1, 197.07, 868.90);
                usleep(16646.92);
                touchMove(1, 197.07, 849.57);
                usleep(16789.58);
                touchMove(1, 196.04, 831.25);
                usleep(16508.29);
                touchMove(1, 193.99, 818.02);
                usleep(16696.42);
                touchMove(1, 190.91, 802.73);
                usleep(16696.75);
                touchMove(1, 184.74, 786.44);
                usleep(15335.29);
                touchUp(1, 180.64, 782.37);
                usleep(1083751.17);

                touchDown(5, 172.43, 918.79);
                usleep(117621.96);
                touchMove(5, 170.38, 877.07);
                usleep(16726.42);
                touchMove(5, 170.38, 855.67);
                usleep(16661.54);
                touchMove(5, 170.38, 834.30);
                usleep(16613.29);
                touchMove(5, 170.38, 814.96);
                usleep(16719.71);
                touchMove(5, 169.35, 795.60);
                usleep(16896.46);
                touchMove(5, 167.30, 784.41);
                usleep(16399.33);
                touchMove(5, 165.24, 772.20);
                usleep(16697.50);
                touchMove(5, 163.19, 761.00);
                usleep(16714.42);
                touchMove(5, 162.16, 751.82);
                usleep(16589.83);
                touchMove(5, 162.16, 746.73);
                usleep(16647.12);
                touchMove(5, 162.16, 744.70);
                usleep(16792.29);
                touchMove(5, 162.16, 743.68);
                usleep(16569.17);
                touchMove(5, 162.16, 742.66);
                usleep(16886.46);
                touchMove(5, 161.14, 742.66);
                usleep(16532.17);
                touchMove(5, 160.11, 741.64);
                usleep(16643.38);
                touchMove(5, 158.05, 739.61);
                usleep(16614.29);
                touchMove(5, 156.01, 737.57);
                usleep(16962.17);
                touchMove(5, 154.98, 735.54);
                usleep(16405.08);
                touchMove(5, 153.96, 734.52);
                usleep(16655.04);
                touchMove(5, 152.93, 732.48);
                usleep(16756.92);
                touchMove(5, 152.93, 731.46);
                usleep(16548.50);
                touchMove(5, 151.90, 730.45);
                usleep(16726.88);
                touchMove(5, 151.90, 729.43);
                usleep(16696.79);
                touchMove(5, 151.90, 728.41);
                usleep(16743.50);
                touchMove(5, 151.90, 727.39);
                usleep(283390.75);
                touchUp(5, 147.80, 725.36);

                this.delayCus(2);
                const optionsFindGmailCode = {
                    region: { x: 208.10, y: 682.39, width: 323.24, height: 246.13 },
                    debug: false
                }
                this.timCodeGmail(optionsFindGmailCode);

                const codeGmailLZD = at.clipText();

                if (codeGmailLZD.length == 6) {
                    //open lai lzd
                    //input code
                    this.thongBao("Code: " + codeGmailLZD);
                    this.delayCus(2);
                    this.thongBao('run App LZD');
                    at.appRun("com.LazadaSEA.Lazada");
                    this.delayCus(8);
                }
                else {
                    this.thongBao("Khong lay duoc ma code");
                    at.stop();
                }
            }
            else {

            }


        }
        else {
            at.stop();
        }
    }

    getCodeLZDBySafari() {
        this.thongBao("Mo App Safari");
        at.appRun("com.apple.mobilesafari");
        at.usleep(1000000);

        this.thongBao("Open Link Gmail");
        this.inputURLCus(`https://mail.google.com/mail/`);
        this.delayCus(5);

        const optionCheckReg = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 13972781, x: 0, y: 0 },
                { color: 16777215, x: 2, y: 11 },
                { color: 16777215, x: 8, y: 10 },
                { color: 13907245, x: 3, y: 1 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 652.82, y: 146.83, width: 92.96, height: 71.83 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }
        const find_checkReg = this.findToaDo(optionCheckReg, 3);
        if (find_checkReg.success == true) {
            this.thongBao("Da dang nhap");
            at.usleep(1000000);

            this.thongBao("Click mail dau tien");
            at.tap(168, 401);
            this.delayCus(3);


            const optionCheckIconLZD = {
                colors: [ // REQUIRED, colors and their relative positions
                    { color: 16459177, x: 0, y: 0 },
                    { color: 16522684, x: 4, y: 0 },
                    { color: 16459177, x: 0, y: 3 },
                    { color: 16522176, x: 5, y: 3 },
                    { color: 16458162, x: 2, y: 1 }
                ],
                count: 3, // OPTIONAL, default is 0, 0 means no limitation
                region: { x: 240.85, y: 638.03, width: 265.14, height: 95.07 }, // OPTIONAL, default is null, null means the whole screen
                debug: false,
            }
            const find_optionCheckIconLZD = this.findToaDo(optionCheckIconLZD, 3);
            if (find_optionCheckIconLZD.success == true) {
                touchDown(1, 201.16, 915.74);
                usleep(83072.83);
                touchMove(1, 197.07, 900.47);
                usleep(16674.17);
                touchMove(1, 197.07, 886.23);
                usleep(16634.33);
                touchMove(1, 197.07, 868.90);
                usleep(16646.92);
                touchMove(1, 197.07, 849.57);
                usleep(16789.58);
                touchMove(1, 196.04, 831.25);
                usleep(16508.29);
                touchMove(1, 193.99, 818.02);
                usleep(16696.42);
                touchMove(1, 190.91, 802.73);
                usleep(16696.75);
                touchMove(1, 184.74, 786.44);
                usleep(15335.29);
                touchUp(1, 180.64, 782.37);
                usleep(1083751.17);

                touchDown(5, 172.43, 918.79);
                usleep(117621.96);
                touchMove(5, 170.38, 877.07);
                usleep(16726.42);
                touchMove(5, 170.38, 855.67);
                usleep(16661.54);
                touchMove(5, 170.38, 834.30);
                usleep(16613.29);
                touchMove(5, 170.38, 814.96);
                usleep(16719.71);
                touchMove(5, 169.35, 795.60);
                usleep(16896.46);
                touchMove(5, 167.30, 784.41);
                usleep(16399.33);
                touchMove(5, 165.24, 772.20);
                usleep(16697.50);
                touchMove(5, 163.19, 761.00);
                usleep(16714.42);
                touchMove(5, 162.16, 751.82);
                usleep(16589.83);
                touchMove(5, 162.16, 746.73);
                usleep(16647.12);
                touchMove(5, 162.16, 744.70);
                usleep(16792.29);
                touchMove(5, 162.16, 743.68);
                usleep(16569.17);
                touchMove(5, 162.16, 742.66);
                usleep(16886.46);
                touchMove(5, 161.14, 742.66);
                usleep(16532.17);
                touchMove(5, 160.11, 741.64);
                usleep(16643.38);
                touchMove(5, 158.05, 739.61);
                usleep(16614.29);
                touchMove(5, 156.01, 737.57);
                usleep(16962.17);
                touchMove(5, 154.98, 735.54);
                usleep(16405.08);
                touchMove(5, 153.96, 734.52);
                usleep(16655.04);
                touchMove(5, 152.93, 732.48);
                usleep(16756.92);
                touchMove(5, 152.93, 731.46);
                usleep(16548.50);
                touchMove(5, 151.90, 730.45);
                usleep(16726.88);
                touchMove(5, 151.90, 729.43);
                usleep(16696.79);
                touchMove(5, 151.90, 728.41);
                usleep(16743.50);
                touchMove(5, 151.90, 727.39);
                usleep(283390.75);
                touchUp(5, 147.80, 725.36);

                this.delayCus(2);
                const optionsFindGmailCode = {
                    region: { x: 208.10, y: 682.39, width: 323.24, height: 246.13 },
                    debug: false
                }
                this.timCodeGmail(optionsFindGmailCode);

            }
            else {

            }


        }
        else {
            at.stop();
        }
    }

    getCodeGmailLan2() {
        this.thongBao("Mo App Safari");
        at.appRun("com.apple.mobilesafari");
        this.delayCus(3);

        this.thongBao("Open Link Reg Gmail");
        at.openURL(`https://mail.google.com/mail/`);
        this.delayCus(8);

        const optionCheckReg = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 13972781, x: 0, y: 0 },
                { color: 16777215, x: 2, y: 11 },
                { color: 16777215, x: 8, y: 10 },
                { color: 13907245, x: 3, y: 1 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 652.82, y: 146.83, width: 92.96, height: 71.83 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }
        const find_checkReg = this.findToaDo(optionCheckReg, 3);
        if (find_checkReg.success == true) {
            this.thongBao("Da dang nhap");
            at.usleep(1000000);

            this.thongBao("Click mail dau tien");
            at.tap(168, 401);
            this.delayCus(3);

            this.delayCus(2);
            // const optionsFindGmailCode = {
            //     region: { x: 32, y: 1038, width: 244.01, height:300 },
            //     debug: false
            // }

            const optionsFindGmailCode = {
                region: { x: 219, y: 1010, width: 244.01, height: 250 },
                debug: false
            }
            this.timCodeGmail(optionsFindGmailCode);;

            const codeGmailLZD = at.clipText();

            if (codeGmailLZD.length == 6) {
                //open lai lzd
                //input code
                this.thongBao("Code: " + codeGmailLZD);
                this.delayCus(2);
                this.thongBao('run App LZD');
                at.appRun("com.LazadaSEA.Lazada");
                this.delayCus(8);
            }
            else {
                this.thongBao("Khong lay duoc ma code");
                at.stop();
            }



        }
        else {
            at.stop();
        }
    }

    testPhat() {

    }

    choiceGenderLZD() {
        const randGender = this.getRandom(1, 2);

        switch (randGender) {
            case 1:
                this.thongBao("Gender: Nam");
                at.usleep(2000000);

                touchDown(1, 632.25, 602.17);
                usleep(183383.96);
                touchUp(1, 632.25, 602.17);
                usleep(2233513.62);

                touchDown(4, 441.34, 1084.75);
                usleep(117828.88);
                touchUp(4, 441.34, 1084.75);

                break;

            case 2:
                this.thongBao("Gender: Nu");
                at.usleep(2000000);

                touchDown(1, 625.08, 602.17);
                usleep(149995.96);
                touchUp(1, 625.08, 602.17);
                usleep(2284568.75);

                touchDown(3, 397.21, 1163.16);
                usleep(148893.29);
                touchUp(3, 397.21, 1163.16);
                break;
        }
    }

    choiceRandomNgaySinh() {
        const randNgaySinh = this.getRandom(1, 2);

        switch (randNgaySinh) {
            case 1:
                touchDown(2, 512.17, 700.91);
                usleep(100236.58);
                touchUp(2, 512.17, 700.91);
                usleep(1066911.62);

                touchDown(3, 164.22, 1125.48);
                usleep(51080.38);
                touchMove(3, 175.51, 1102.07);
                usleep(16516.50);
                touchMove(3, 189.88, 1056.25);
                usleep(16751.38);
                touchMove(3, 222.72, 988.04);
                usleep(16783.83);
                touchMove(3, 261.73, 918.79);
                usleep(15373.00);
                touchUp(3, 265.83, 914.72);
                usleep(2800082.38);

                touchDown(6, 364.37, 1120.39);
                usleep(68187.88);
                touchMove(6, 367.45, 1108.18);
                usleep(16334.08);
                touchMove(6, 367.45, 1095.97);
                usleep(16655.38);
                touchMove(6, 370.53, 1079.66);
                usleep(16779.04);
                touchMove(6, 379.76, 1055.24);
                usleep(16544.42);
                touchUp(6, 390.03, 1025.70);
                usleep(1549263.29);

                touchDown(1, 562.47, 1039.97);
                usleep(51239.67);
                touchMove(1, 557.33, 1072.54);
                usleep(16424.50);
                touchMove(1, 557.33, 1088.82);
                usleep(16698.21);
                touchMove(1, 555.28, 1111.23);
                usleep(16663.50);
                touchMove(1, 550.14, 1143.80);
                usleep(16680.75);
                touchMove(1, 546.04, 1177.41);
                usleep(15322.75);
                touchUp(1, 541.93, 1181.48);
                usleep(1784812.17);

                touchDown(4, 558.36, 1029.77);
                usleep(33091.58);
                touchMove(4, 554.25, 1053.20);
                usleep(16998.00);
                touchMove(4, 554.25, 1076.61);
                usleep(16473.46);
                touchMove(4, 549.12, 1105.13);
                usleep(16629.00);
                touchMove(4, 543.98, 1138.71);
                usleep(16738.88);
                touchMove(4, 538.86, 1164.18);
                usleep(15353.83);
                touchUp(4, 534.75, 1168.25);
                usleep(2966971.83);

                touchDown(5, 692.81, 833.28);
                usleep(67598.29);
                touchUp(5, 692.81, 833.28);

                break;

            case 2:
                touchDown(6, 593.25, 699.89);
                usleep(65415.67);
                touchUp(6, 593.25, 699.89);
                usleep(1683315.88);

                touchDown(1, 154.98, 1152.98);
                usleep(34777.33);
                touchMove(1, 161.14, 1118.36);
                usleep(16437.79);
                touchMove(1, 168.32, 1070.50);
                usleep(16765.25);
                touchMove(1, 198.09, 982.95);
                usleep(16744.71);
                touchMove(1, 243.26, 880.12);
                usleep(15218.92);
                touchUp(1, 247.35, 876.05);
                usleep(2368294.29);

                touchDown(3, 355.13, 1146.87);
                usleep(33104.08);
                touchMove(3, 368.48, 1103.09);
                usleep(16739.33);
                touchMove(3, 390.03, 1044.04);
                usleep(16690.08);
                touchMove(3, 426.98, 969.70);
                usleep(15400.42);
                touchUp(3, 431.09, 965.63);
                usleep(1616834.88);

                touchDown(4, 567.59, 1030.79);
                usleep(34565.12);
                touchMove(4, 563.48, 1047.09);
                usleep(16574.58);
                touchMove(4, 562.47, 1084.75);
                usleep(16741.96);
                touchMove(4, 552.20, 1156.03);
                usleep(16650.75);
                touchMove(4, 540.90, 1239.51);
                usleep(15270.38);
                touchUp(4, 536.80, 1243.58);
                usleep(3851575.88);

                touchDown(5, 715.39, 827.18);
                usleep(82298.75);
                touchUp(5, 715.39, 827.18);

                break;

        }
    }

    truotSafari() {
        const randTruot = this.getRandom(1, 5);
        this.thongBao("Truot truong hop: " + randTruot);
        at.usleep(1000000);

        switch (randTruot) {
            case 1:
                touchDown(1, 73.89, 657.15);
                usleep(134833.42);
                touchMove(1, 84.16, 662.24);
                usleep(16645.62);
                touchMove(1, 88.27, 662.24);
                usleep(16389.96);
                touchMove(1, 93.40, 662.24);
                usleep(16655.96);
                touchMove(1, 97.50, 662.24);
                usleep(16736.83);
                touchMove(1, 100.58, 662.24);
                usleep(16634.83);
                touchMove(1, 104.69, 662.24);
                usleep(16705.88);
                touchMove(1, 108.79, 662.24);
                usleep(16605.71);
                touchMove(1, 111.88, 662.24);
                usleep(16688.25);
                touchMove(1, 114.96, 662.24);
                usleep(16684.92);
                touchMove(1, 118.03, 662.24);
                usleep(16724.83);
                touchMove(1, 121.11, 662.24);
                usleep(16561.50);
                touchMove(1, 124.19, 662.24);
                usleep(16852.75);
                touchMove(1, 127.27, 662.24);
                usleep(16509.08);
                touchMove(1, 129.32, 662.24);
                usleep(16726.00);
                touchMove(1, 132.40, 662.24);
                usleep(16687.04);
                touchMove(1, 134.46, 662.24);
                usleep(16669.79);
                touchMove(1, 137.54, 662.24);
                usleep(16620.46);
                touchMove(1, 140.61, 662.24);
                usleep(16730.67);
                touchMove(1, 145.74, 662.24);
                usleep(16601.00);
                touchMove(1, 149.85, 662.24);
                usleep(16661.08);
                touchMove(1, 153.96, 662.24);
                usleep(16733.83);
                touchMove(1, 160.11, 662.24);
                usleep(16601.79);
                touchMove(1, 165.24, 662.24);
                usleep(16650.42);
                touchMove(1, 170.38, 662.24);
                usleep(16887.08);
                touchMove(1, 176.54, 662.24);
                usleep(16482.21);
                touchMove(1, 181.66, 662.24);
                usleep(16618.38);
                touchMove(1, 186.80, 662.24);
                usleep(16824.12);
                touchMove(1, 191.93, 662.24);
                usleep(16544.62);
                touchMove(1, 198.09, 663.25);
                usleep(16709.08);
                touchMove(1, 205.27, 664.27);
                usleep(16665.75);
                touchMove(1, 211.43, 665.29);
                usleep(16777.62);
                touchMove(1, 218.62, 666.31);
                usleep(16545.46);
                touchMove(1, 225.80, 667.33);
                usleep(16812.79);
                touchMove(1, 234.01, 668.34);
                usleep(16429.04);
                touchMove(1, 242.23, 669.36);
                usleep(16706.17);
                touchMove(1, 250.43, 670.38);
                usleep(16821.17);
                touchMove(1, 259.68, 671.40);
                usleep(16697.54);
                touchMove(1, 268.91, 672.41);
                usleep(16464.29);
                touchMove(1, 280.20, 673.43);
                usleep(16836.42);
                touchMove(1, 290.46, 674.45);
                usleep(16614.83);
                touchMove(1, 302.79, 675.47);
                usleep(16659.54);
                touchMove(1, 314.07, 675.47);
                usleep(16642.67);
                touchMove(1, 324.34, 675.47);
                usleep(16680.67);
                touchMove(1, 334.60, 675.47);
                usleep(16637.83);
                touchMove(1, 343.84, 676.49);
                usleep(16703.75);
                touchMove(1, 351.02, 676.49);
                usleep(16683.54);
                touchMove(1, 357.18, 676.49);
                usleep(16676.42);
                touchMove(1, 363.34, 677.50);
                usleep(16612.96);
                touchMove(1, 368.48, 677.50);
                usleep(16724.42);
                touchMove(1, 374.63, 677.50);
                usleep(16746.58);
                touchMove(1, 379.76, 678.52);
                usleep(16572.62);
                touchMove(1, 386.95, 678.52);
                usleep(16688.75);
                touchMove(1, 394.13, 679.54);
                usleep(16625.50);
                touchMove(1, 402.34, 679.54);
                usleep(16706.46);
                touchMove(1, 411.58, 679.54);
                usleep(16714.04);
                touchMove(1, 420.82, 679.54);
                usleep(16565.92);
                touchMove(1, 429.03, 679.54);
                usleep(16872.54);
                touchMove(1, 438.26, 679.54);
                usleep(16450.33);
                touchMove(1, 448.53, 679.54);
                usleep(16719.46);
                touchMove(1, 459.82, 679.54);
                usleep(16767.42);
                touchMove(1, 472.14, 679.54);
                usleep(16614.75);
                touchMove(1, 483.43, 679.54);
                usleep(16598.33);
                touchMove(1, 496.78, 679.54);
                usleep(16758.25);
                touchMove(1, 510.12, 679.54);
                usleep(16637.42);
                touchMove(1, 524.48, 679.54);
                usleep(16694.29);
                touchMove(1, 538.86, 679.54);
                usleep(16639.79);
                touchMove(1, 551.17, 679.54);
                usleep(16705.71);
                touchMove(1, 563.48, 679.54);
                usleep(16750.58);
                touchMove(1, 574.78, 679.54);
                usleep(16553.12);
                touchMove(1, 586.07, 679.54);
                usleep(16748.08);
                touchMove(1, 597.36, 679.54);
                usleep(16532.67);
                touchMove(1, 607.62, 678.52);
                usleep(16796.71);
                touchMove(1, 617.89, 677.50);
                usleep(16634.50);
                touchMove(1, 626.09, 675.47);
                usleep(16631.50);
                touchMove(1, 634.31, 673.43);
                usleep(16638.88);
                touchMove(1, 641.50, 671.40);
                usleep(16672.46);
                touchMove(1, 648.67, 669.36);
                usleep(16495.96);
                touchMove(1, 655.86, 667.33);
                usleep(16777.04);
                touchMove(1, 663.05, 664.27);
                usleep(16637.79);
                touchMove(1, 669.20, 662.24);
                usleep(16526.46);
                touchMove(1, 675.36, 660.20);
                usleep(16845.62);
                touchMove(1, 681.53, 659.18);
                usleep(16324.29);
                touchMove(1, 686.66, 658.17);
                usleep(16567.75);
                touchMove(1, 691.78, 657.15);
                usleep(16867.08);
                touchMove(1, 695.89, 657.15);
                usleep(16584.79);
                touchMove(1, 700.00, 656.13);
                usleep(16681.83);
                touchMove(1, 704.11, 655.11);
                usleep(16555.96);
                touchMove(1, 707.19, 655.11);
                usleep(16670.88);
                touchMove(1, 709.24, 654.09);
                usleep(16666.67);
                touchMove(1, 711.28, 654.09);
                usleep(16676.96);
                touchMove(1, 713.34, 653.08);
                usleep(16684.79);
                touchMove(1, 715.39, 653.08);
                usleep(16590.42);
                touchUp(1, 716.42, 648.99);
                break;
            case 2:
                touchDown(6, 89.29, 659.18);
                usleep(66244.88);
                touchMove(6, 99.55, 660.20);
                usleep(16719.12);
                touchMove(6, 106.74, 660.20);
                usleep(16735.54);
                touchMove(6, 115.97, 660.20);
                usleep(16671.21);
                touchMove(6, 127.27, 660.20);
                usleep(16765.75);
                touchMove(6, 140.61, 660.20);
                usleep(16580.50);
                touchMove(6, 157.04, 660.20);
                usleep(16691.12);
                touchMove(6, 170.38, 659.18);
                usleep(16663.79);
                touchMove(6, 187.82, 657.15);
                usleep(16576.71);
                touchMove(6, 206.30, 655.11);
                usleep(16691.42);
                touchMove(6, 228.88, 654.09);
                usleep(16730.46);
                touchMove(6, 252.49, 654.09);
                usleep(16605.67);
                touchMove(6, 283.28, 654.09);
                usleep(16573.54);
                touchMove(6, 315.10, 654.09);
                usleep(16790.62);
                touchMove(6, 351.02, 654.09);
                usleep(16574.50);
                touchMove(6, 397.21, 648.99);
                usleep(16725.00);
                touchMove(6, 442.37, 642.88);
                usleep(16697.12);
                touchMove(6, 478.29, 640.84);
                usleep(16645.12);
                touchMove(6, 516.28, 638.81);
                usleep(16604.38);
                touchMove(6, 549.12, 638.81);
                usleep(16806.33);
                touchMove(6, 578.89, 638.81);
                usleep(16531.75);
                touchMove(6, 604.55, 638.81);
                usleep(16700.67);
                touchMove(6, 634.31, 638.81);
                usleep(16826.04);
                touchMove(6, 659.97, 638.81);
                usleep(16233.29);
                touchMove(6, 687.69, 638.81);
                usleep(16707.25);
                touchMove(6, 708.21, 638.81);
                usleep(16720.38);
                touchMove(6, 722.58, 638.81);
                usleep(16402.42);
                touchMove(6, 732.85, 638.81);
                usleep(15771.08);
                touchUp(6, 736.95, 639.83);
                break;
            case 3:
                touchDown(2, 70.82, 656.13);
                usleep(200049.00);
                touchMove(2, 73.89, 657.15);
                usleep(16508.88);
                touchMove(2, 76.97, 657.15);
                usleep(16624.50);
                touchMove(2, 80.05, 657.15);
                usleep(16687.33);
                touchMove(2, 82.11, 657.15);
                usleep(16626.92);
                touchMove(2, 85.19, 657.15);
                usleep(16769.79);
                touchMove(2, 89.29, 657.15);
                usleep(16690.75);
                touchMove(2, 92.37, 657.15);
                usleep(16537.04);
                touchMove(2, 97.50, 657.15);
                usleep(16778.79);
                touchMove(2, 101.61, 657.15);
                usleep(16662.17);
                touchMove(2, 104.69, 657.15);
                usleep(16549.38);
                touchMove(2, 108.79, 657.15);
                usleep(16615.17);
                touchMove(2, 111.88, 657.15);
                usleep(16844.92);
                touchMove(2, 115.97, 657.15);
                usleep(16556.71);
                touchMove(2, 118.03, 657.15);
                usleep(16699.88);
                touchMove(2, 121.11, 657.15);
                usleep(16704.83);
                touchMove(2, 124.19, 657.15);
                usleep(16595.12);
                touchMove(2, 128.30, 657.15);
                usleep(16668.83);
                touchMove(2, 131.38, 657.15);
                usleep(16805.79);
                touchMove(2, 135.48, 657.15);
                usleep(16604.92);
                touchMove(2, 139.58, 657.15);
                usleep(16602.08);
                touchMove(2, 142.66, 657.15);
                usleep(17005.67);
                touchMove(2, 146.77, 657.15);
                usleep(16242.21);
                touchMove(2, 150.88, 657.15);
                usleep(16747.12);
                touchMove(2, 154.98, 657.15);
                usleep(16704.21);
                touchMove(2, 160.11, 657.15);
                usleep(16583.79);
                touchMove(2, 166.27, 657.15);
                usleep(16727.08);
                touchMove(2, 172.43, 657.15);
                usleep(16728.04);
                touchMove(2, 178.59, 657.15);
                usleep(16603.96);
                touchMove(2, 183.72, 657.15);
                usleep(16683.29);
                touchMove(2, 188.85, 657.15);
                usleep(16762.54);
                touchMove(2, 193.99, 657.15);
                usleep(16610.25);
                touchMove(2, 198.09, 657.15);
                usleep(16669.08);
                touchMove(2, 203.22, 657.15);
                usleep(16682.96);
                touchMove(2, 207.33, 657.15);
                usleep(16606.29);
                touchMove(2, 212.46, 657.15);
                usleep(16546.00);
                touchMove(2, 216.57, 657.15);
                usleep(16845.04);
                touchMove(2, 221.69, 657.15);
                usleep(16641.92);
                touchMove(2, 226.83, 657.15);
                usleep(16674.12);
                touchMove(2, 232.99, 657.15);
                usleep(16611.04);
                touchMove(2, 238.12, 657.15);
                usleep(16648.17);
                touchMove(2, 243.26, 658.17);
                usleep(16688.50);
                touchMove(2, 248.38, 659.18);
                usleep(16804.92);
                touchMove(2, 253.52, 660.20);
                usleep(16486.42);
                touchMove(2, 258.65, 661.22);
                usleep(16724.88);
                touchMove(2, 263.77, 662.24);
                usleep(16698.71);
                touchMove(2, 268.91, 662.24);
                usleep(16702.96);
                touchMove(2, 275.07, 663.25);
                usleep(16610.42);
                touchMove(2, 281.23, 663.25);
                usleep(16702.79);
                touchMove(2, 287.38, 663.25);
                usleep(16605.58);
                touchMove(2, 293.54, 663.25);
                usleep(16651.42);
                touchMove(2, 300.73, 664.27);
                usleep(16766.50);
                touchMove(2, 306.88, 665.29);
                usleep(16566.33);
                touchMove(2, 314.07, 666.31);
                usleep(16701.58);
                touchMove(2, 320.23, 667.33);
                usleep(16713.75);
                touchMove(2, 326.39, 668.34);
                usleep(16627.96);
                touchMove(2, 332.55, 669.36);
                usleep(16651.25);
                touchMove(2, 338.71, 670.38);
                usleep(16738.62);
                touchMove(2, 345.89, 671.40);
                usleep(16643.96);
                touchMove(2, 353.07, 671.40);
                usleep(16706.75);
                touchMove(2, 360.26, 671.40);
                usleep(16662.00);
                touchMove(2, 366.42, 671.40);
                usleep(16693.38);
                touchMove(2, 373.60, 671.40);
                usleep(16552.75);
                touchMove(2, 379.76, 671.40);
                usleep(16731.75);
                touchMove(2, 385.92, 671.40);
                usleep(16537.50);
                touchMove(2, 393.10, 672.41);
                usleep(16761.83);
                touchMove(2, 400.29, 672.41);
                usleep(16924.88);
                touchMove(2, 407.48, 673.43);
                usleep(16346.71);
                touchMove(2, 415.68, 673.43);
                usleep(16735.83);
                touchMove(2, 424.92, 674.45);
                usleep(16755.33);
                touchMove(2, 434.17, 674.45);
                usleep(16525.54);
                touchMove(2, 442.37, 674.45);
                usleep(16709.42);
                touchMove(2, 451.61, 674.45);
                usleep(16796.62);
                touchMove(2, 460.85, 674.45);
                usleep(16571.29);
                touchMove(2, 471.11, 674.45);
                usleep(16601.33);
                touchMove(2, 480.35, 674.45);
                usleep(16802.12);
                touchMove(2, 490.61, 674.45);
                usleep(16591.12);
                touchMove(2, 500.87, 674.45);
                usleep(16648.67);
                touchMove(2, 512.17, 674.45);
                usleep(16807.21);
                touchMove(2, 522.43, 674.45);
                usleep(16542.75);
                touchMove(2, 532.70, 674.45);
                usleep(16599.04);
                touchMove(2, 542.96, 674.45);
                usleep(16810.08);
                touchMove(2, 552.20, 674.45);
                usleep(16551.42);
                touchMove(2, 561.44, 674.45);
                usleep(16874.25);
                touchMove(2, 570.67, 674.45);
                usleep(16595.17);
                touchMove(2, 578.89, 674.45);
                usleep(16687.58);
                touchMove(2, 587.09, 674.45);
                usleep(16607.17);
                touchMove(2, 596.33, 674.45);
                usleep(16666.67);
                touchMove(2, 605.58, 674.45);
                usleep(16641.67);
                touchMove(2, 614.81, 674.45);
                usleep(16602.38);
                touchMove(2, 624.05, 674.45);
                usleep(16772.17);
                touchMove(2, 634.31, 673.43);
                usleep(16669.50);
                touchMove(2, 644.58, 673.43);
                usleep(16568.96);
                touchMove(2, 654.84, 672.41);
                usleep(16819.88);
                touchMove(2, 665.11, 672.41);
                usleep(16503.38);
                touchMove(2, 675.36, 672.41);
                usleep(16299.29);
                touchMove(2, 685.63, 672.41);
                usleep(16742.29);
                touchMove(2, 693.84, 672.41);
                usleep(16578.75);
                touchMove(2, 700.00, 672.41);
                usleep(16669.88);
                touchMove(2, 705.13, 672.41);
                usleep(16724.29);
                touchMove(2, 710.27, 672.41);
                usleep(16745.12);
                touchMove(2, 714.37, 672.41);
                usleep(16671.25);
                touchMove(2, 717.45, 672.41);
                usleep(16747.75);
                touchMove(2, 719.50, 672.41);
                usleep(16517.67);
                touchMove(2, 720.53, 672.41);
                usleep(16673.25);
                touchMove(2, 721.55, 672.41);
                usleep(16740.88);
                touchMove(2, 722.58, 672.41);
                usleep(465740.75);
                touchUp(2, 725.66, 669.36);
                break;
            case 4:
                touchDown(4, 75.94, 663.25);
                usleep(216704.50);
                touchMove(4, 88.27, 665.29);
                usleep(16648.92);
                touchMove(4, 92.37, 665.29);
                usleep(16754.33);
                touchMove(4, 98.53, 665.29);
                usleep(16685.88);
                touchMove(4, 104.69, 665.29);
                usleep(16551.58);
                touchMove(4, 110.85, 665.29);
                usleep(16897.08);
                touchMove(4, 118.03, 665.29);
                usleep(16611.25);
                touchMove(4, 124.19, 665.29);
                usleep(16586.17);
                touchMove(4, 131.38, 665.29);
                usleep(16720.29);
                touchMove(4, 137.54, 665.29);
                usleep(16639.50);
                touchMove(4, 142.66, 665.29);
                usleep(16616.54);
                touchMove(4, 147.80, 665.29);
                usleep(16741.04);
                touchMove(4, 151.90, 665.29);
                usleep(16847.21);
                touchMove(4, 157.04, 665.29);
                usleep(16348.88);
                touchMove(4, 163.19, 665.29);
                usleep(16813.88);
                touchMove(4, 170.38, 665.29);
                usleep(16534.50);
                touchMove(4, 178.59, 665.29);
                usleep(16659.92);
                touchMove(4, 187.82, 666.31);
                usleep(16707.54);
                touchMove(4, 199.12, 668.34);
                usleep(16642.33);
                touchMove(4, 212.46, 670.38);
                usleep(16564.96);
                touchMove(4, 227.85, 674.45);
                usleep(16875.50);
                touchMove(4, 244.27, 677.50);
                usleep(16607.75);
                touchMove(4, 257.62, 678.52);
                usleep(16626.50);
                touchMove(4, 276.10, 679.54);
                usleep(16702.58);
                touchMove(4, 291.49, 679.54);
                usleep(16614.04);
                touchMove(4, 307.91, 679.54);
                usleep(16621.04);
                touchMove(4, 324.34, 679.54);
                usleep(16721.04);
                touchMove(4, 341.79, 679.54);
                usleep(16737.25);
                touchMove(4, 360.26, 679.54);
                usleep(16591.79);
                touchMove(4, 380.79, 680.56);
                usleep(16797.54);
                touchMove(4, 404.40, 682.59);
                usleep(16585.08);
                touchMove(4, 422.87, 685.65);
                usleep(16623.67);
                touchMove(4, 444.43, 686.66);
                usleep(16644.58);
                touchMove(4, 464.95, 687.68);
                usleep(16703.00);
                touchMove(4, 484.45, 687.68);
                usleep(16648.17);
                touchMove(4, 502.93, 687.68);
                usleep(16637.92);
                touchMove(4, 519.36, 683.61);
                usleep(16680.12);
                touchMove(4, 532.70, 679.54);
                usleep(16620.96);
                touchMove(4, 546.04, 674.45);
                usleep(16698.17);
                touchMove(4, 556.31, 670.38);
                usleep(16612.29);
                touchMove(4, 565.54, 667.33);
                usleep(16665.58);
                touchMove(4, 574.78, 665.29);
                usleep(16747.00);
                touchMove(4, 581.97, 664.27);
                usleep(16603.08);
                touchMove(4, 589.15, 664.27);
                usleep(16651.88);
                touchMove(4, 596.33, 664.27);
                usleep(16774.21);
                touchMove(4, 604.55, 664.27);
                usleep(16686.46);
                touchMove(4, 611.73, 664.27);
                usleep(16648.17);
                touchMove(4, 618.92, 664.27);
                usleep(16694.58);
                touchMove(4, 626.09, 664.27);
                usleep(16737.33);
                touchMove(4, 632.25, 664.27);
                usleep(16556.92);
                touchMove(4, 640.47, 664.27);
                usleep(16695.62);
                touchMove(4, 648.67, 664.27);
                usleep(16595.88);
                touchMove(4, 658.94, 664.27);
                usleep(16688.71);
                touchMove(4, 669.20, 664.27);
                usleep(16617.71);
                touchMove(4, 684.61, 665.29);
                usleep(16326.54);
                touchMove(4, 702.05, 665.29);
                usleep(16705.17);
                touchMove(4, 718.47, 665.29);
                usleep(16795.83);
                touchMove(4, 731.82, 665.29);
                usleep(16452.79);
                touchMove(4, 741.05, 666.31);
                usleep(15914.62);
                touchUp(4, 745.16, 669.36);
                usleep(2983741.92);

                touchDown(5, 609.67, 814.96);
                usleep(34389.67);
                touchUp(5, 609.67, 814.96);
                break;
            case 5:
                touchDown(6, 84.16, 663.25);
                usleep(118040.25);
                touchMove(6, 96.47, 664.27);
                usleep(16626.38);
                touchMove(6, 100.58, 664.27);
                usleep(16630.83);
                touchMove(6, 104.69, 664.27);
                usleep(16700.58);
                touchMove(6, 108.79, 664.27);
                usleep(16603.38);
                touchMove(6, 112.90, 664.27);
                usleep(16829.29);
                touchMove(6, 117.00, 664.27);
                usleep(16597.71);
                touchMove(6, 121.11, 664.27);
                usleep(16640.38);
                touchMove(6, 124.19, 664.27);
                usleep(16596.25);
                touchMove(6, 127.27, 664.27);
                usleep(16778.38);
                touchMove(6, 130.35, 664.27);
                usleep(16617.25);
                touchMove(6, 133.43, 664.27);
                usleep(16632.79);
                touchMove(6, 137.54, 664.27);
                usleep(16894.67);
                touchMove(6, 140.61, 664.27);
                usleep(16534.25);
                touchMove(6, 144.72, 664.27);
                usleep(16660.12);
                touchMove(6, 148.82, 664.27);
                usleep(16735.04);
                touchMove(6, 153.96, 664.27);
                usleep(16623.96);
                touchMove(6, 160.11, 664.27);
                usleep(16552.08);
                touchMove(6, 167.30, 664.27);
                usleep(16928.00);
                touchMove(6, 173.46, 664.27);
                usleep(16491.71);
                touchMove(6, 181.66, 664.27);
                usleep(16565.92);
                touchMove(6, 188.85, 664.27);
                usleep(16736.42);
                touchMove(6, 197.07, 664.27);
                usleep(16734.04);
                touchMove(6, 206.30, 664.27);
                usleep(16605.79);
                touchMove(6, 216.57, 664.27);
                usleep(16647.33);
                touchMove(6, 226.83, 664.27);
                usleep(16618.50);
                touchMove(6, 238.12, 664.27);
                usleep(16709.25);
                touchMove(6, 249.41, 664.27);
                usleep(16979.17);
                touchMove(6, 262.76, 664.27);
                usleep(16391.71);
                touchMove(6, 275.07, 664.27);
                usleep(16665.88);
                touchMove(6, 288.41, 664.27);
                usleep(16702.54);
                touchMove(6, 301.76, 664.27);
                usleep(16800.58);
                touchMove(6, 315.10, 664.27);
                usleep(16589.50);
                touchMove(6, 331.52, 664.27);
                usleep(16708.29);
                touchMove(6, 346.92, 664.27);
                usleep(16629.96);
                touchMove(6, 361.29, 664.27);
                usleep(16617.46);
                touchMove(6, 376.68, 664.27);
                usleep(16586.46);
                touchMove(6, 394.13, 664.27);
                usleep(16608.21);
                touchMove(6, 410.56, 664.27);
                usleep(16856.00);
                touchMove(6, 425.95, 664.27);
                usleep(16674.00);
                touchMove(6, 443.40, 664.27);
                usleep(16555.21);
                touchMove(6, 460.85, 664.27);
                usleep(16671.29);
                touchMove(6, 477.28, 664.27);
                usleep(16715.21);
                touchMove(6, 493.70, 664.27);
                usleep(16529.00);
                touchMove(6, 509.09, 664.27);
                usleep(16891.75);
                touchMove(6, 523.46, 664.27);
                usleep(16639.08);
                touchMove(6, 537.83, 664.27);
                usleep(16653.58);
                touchMove(6, 552.20, 664.27);
                usleep(16623.75);
                touchMove(6, 565.54, 664.27);
                usleep(16806.46);
                touchMove(6, 578.89, 664.27);
                usleep(16451.71);
                touchMove(6, 593.25, 664.27);
                usleep(16737.58);
                touchMove(6, 605.58, 663.25);
                usleep(16814.67);
                touchMove(6, 617.89, 663.25);
                usleep(16549.29);
                touchMove(6, 631.23, 663.25);
                usleep(16684.42);
                touchMove(6, 644.58, 661.22);
                usleep(16626.25);
                touchMove(6, 657.92, 658.17);
                usleep(16600.21);
                touchMove(6, 670.23, 656.13);
                usleep(16495.54);
                touchMove(6, 682.55, 655.11);
                usleep(16630.21);
                touchMove(6, 695.89, 654.09);
                usleep(16455.67);
                touchMove(6, 707.19, 654.09);
                usleep(16659.92);
                touchMove(6, 717.45, 654.09);
                usleep(16713.04);
                touchMove(6, 725.66, 654.09);
                usleep(16673.75);
                touchMove(6, 732.85, 654.09);
                usleep(16611.88);
                touchMove(6, 737.97, 654.09);
                usleep(16729.29);
                touchMove(6, 741.05, 654.09);
                usleep(16754.79);
                touchMove(6, 743.11, 654.09);
                usleep(16583.58);
                touchMove(6, 744.14, 654.09);
                usleep(16731.79);
                touchMove(6, 745.16, 654.09);
                usleep(250062.58);
                touchUp(6, 749.27, 651.04);
                break;
        }
    }
    clickEnter() {
        this.thongBao("Enter");
        at.tap(676.39, 1291.44);
        this.delayCus(2);
    }

    inputURLCus(url) {
        at.toast("Click input url", "bottom", 2);
        at.usleep(2000000);
        at.tap(285, 100);
        at.usleep(2000000);

        at.inputText(url);
        at.usleep(2000000);

        this.thongBao("Enter");
        at.tap(676.39, 1291.44);
        this.delayCus(5);

    }

    inputRefresh() {
        this.thongBao("Click refresh f5");
        at.usleep(1000000);

        at.tap(697, 84);
        this.delayCus(10);
    }

    inputNewTab() {
        this.thongBao("New tab");
        at.usleep(1000000);

        touchDown(3, 685.63, 1291.44);
        usleep(99965.67);
        touchUp(3, 685.63, 1291.44);
        usleep(2066901.62);

        touchDown(2, 369.50, 1291.44);
        usleep(66720.33);
        touchUp(2, 369.50, 1291.44);

    }

    inputOpenTab(index) {

        switch (index) {
            case 1:
                this.thongBao("Open tab " + index);
                at.usleep(1000000);

                touchDown(3, 674.34, 1297.54);
                usleep(66702.33);
                touchUp(3, 674.34, 1297.54);
                usleep(1816660.25);

                touchDown(4, 523.46, 454.53);
                usleep(100241.96);
                touchUp(4, 523.46, 454.53);

                break;
            case 2:
                this.thongBao("Open tab " + index);
                at.usleep(1000000);
                touchDown(3, 683.58, 1300.60);
                usleep(99901.67);
                touchUp(3, 683.58, 1300.60);
                usleep(1900104.88);

                touchDown(4, 570.67, 1099.02);
                usleep(84685.58);
                touchUp(4, 570.67, 1099.02);
                break;
        }

    }

    kichBanQuan10Phuong13() {
        touchDown(6, 467.01, 600.13);
        usleep(98687.92);
        touchUp(6, 467.01, 600.13);
        usleep(2333474.46);

        touchDown(1, 356.15, 253.95);
        usleep(151273.79);
        touchUp(1, 356.15, 253.95);
        usleep(2333474.46);

        touchDown(4, 407.48, 972.76);
        usleep(101321.58);
        touchMove(4, 414.67, 955.45);
        usleep(16632.58);
        touchMove(4, 415.68, 942.22);
        usleep(16640.88);
        touchMove(4, 418.76, 925.94);
        usleep(16565.50);
        touchMove(4, 421.84, 908.62);
        usleep(16736.88);
        touchMove(4, 424.92, 895.39);
        usleep(16803.79);
        touchMove(4, 426.98, 880.12);
        usleep(16504.38);
        touchMove(4, 429.03, 865.85);
        usleep(16643.33);
        touchMove(4, 431.09, 853.64);
        usleep(16755.67);
        touchMove(4, 434.17, 838.37);
        usleep(16797.71);
        touchMove(4, 438.26, 820.05);
        usleep(15132.92);
        touchUp(4, 442.37, 815.98);
        usleep(1118194.62);

        touchDown(3, 393.10, 1062.36);
        usleep(50034.96);
        touchMove(3, 399.26, 1031.81);
        usleep(16971.25);
        touchMove(3, 404.40, 1002.29);
        usleep(16408.17);
        touchMove(3, 417.74, 955.45);
        usleep(16452.12);
        touchMove(3, 431.09, 904.55);
        usleep(16749.38);
        touchMove(3, 452.64, 833.28);
        usleep(16570.12);
        touchMove(3, 481.37, 752.84);
        usleep(16651.38);
        touchUp(3, 509.09, 692.77);
        usleep(2365710.29);

        touchDown(2, 520.37, 366.96);
        usleep(84653.54);
        touchUp(2, 520.37, 366.96);
        usleep(1599094.25);

        touchDown(4, 421.84, 874.01);
        usleep(101038.67);
        touchMove(4, 428.01, 855.67);
        usleep(16515.50);
        touchMove(4, 428.01, 840.41);
        usleep(16832.38);
        touchMove(4, 430.06, 829.21);
        usleep(16646.38);
        touchMove(4, 433.14, 815.98);
        usleep(16650.83);
        touchMove(4, 436.21, 802.73);
        usleep(16781.67);
        touchMove(4, 442.37, 780.34);
        usleep(16480.83);
        touchUp(4, 453.67, 755.89);
        usleep(1065563.92);

        touchDown(5, 433.14, 917.78);
        usleep(67879.33);
        touchMove(5, 440.32, 890.30);
        usleep(16967.71);
        touchMove(5, 442.37, 867.89);
        usleep(16254.62);
        touchMove(5, 450.59, 834.30);
        usleep(16667.04);
        touchMove(5, 460.85, 798.66);
        usleep(16994.38);
        touchMove(5, 476.25, 748.77);
        usleep(16523.58);
        touchMove(5, 493.70, 702.95);
        usleep(15445.79);
        touchUp(5, 497.80, 698.88);
        usleep(2501295.62);

        touchDown(6, 295.60, 1085.77);
        usleep(133302.83);
        touchUp(6, 295.60, 1085.77);

    }

    kichBanLuotSDT() {
        touchDown(1, 476.25, 716.20);
        usleep(83155.00);
        touchMove(1, 483.43, 703.97);
        usleep(16741.83);
        touchMove(1, 483.43, 691.75);
        usleep(16509.04);
        touchMove(1, 488.56, 676.49);
        usleep(16644.75);
        touchMove(1, 492.67, 664.27);
        usleep(16750.33);
        touchMove(1, 497.80, 648.99);
        usleep(16808.71);
        touchMove(1, 502.93, 635.75);
        usleep(16704.58);
        touchMove(1, 507.04, 622.52);
        usleep(16480.38);
        touchMove(1, 512.17, 610.31);
        usleep(16783.79);
        touchMove(1, 518.33, 594.01);
        usleep(16478.00);
        touchMove(1, 524.48, 578.74);
        usleep(15741.62);
        touchUp(1, 528.59, 574.67);
        usleep(484424.88);

        touchDown(2, 487.53, 687.68);
        usleep(33175.58);
        touchMove(2, 497.80, 662.24);
        usleep(16711.58);
        touchMove(2, 498.83, 640.84);
        usleep(16650.79);
        touchMove(2, 506.01, 618.45);
        usleep(16706.38);
        touchMove(2, 515.25, 594.01);
        usleep(16672.08);
        touchMove(2, 527.56, 560.42);
        usleep(16909.50);
        touchMove(2, 543.98, 516.64);
        usleep(16469.00);
        touchMove(2, 559.39, 480.99);
        usleep(15358.58);
        touchUp(2, 563.48, 476.92);
        usleep(2766934.71);

        touchDown(6, 670.23, 585.86);
        usleep(66762.71);
        touchUp(6, 670.23, 585.86);
        usleep(768236.96);

        touchDown(5, 663.05, 686.66);
        usleep(49794.96);
        touchUp(5, 663.05, 686.66);

    }

    vuotXuongAppManager() {
        touchDown(6, 511.14, 1035.90);
        usleep(49751.67);
        touchMove(6, 516.28, 1026.72);
        usleep(16626.54);
        touchMove(6, 517.30, 1015.52);
        usleep(16829.38);
        touchMove(6, 522.43, 1001.27);
        usleep(16357.38);
        touchMove(6, 532.70, 975.81);
        usleep(16845.17);
        touchMove(6, 548.09, 941.21);
        usleep(16536.79);
        touchMove(6, 562.47, 904.55);
        usleep(16693.67);
        touchMove(6, 576.83, 874.01);
        usleep(16684.38);
        touchMove(6, 589.15, 850.58);
        usleep(16540.54);
        touchUp(6, 605.58, 824.12);
        usleep(1332510.71);

        touchDown(4, 493.70, 1089.84);
        usleep(34611.92);
        touchMove(4, 498.83, 1079.66);
        usleep(16655.21);
        touchMove(4, 500.87, 1059.31);
        usleep(16482.17);
        touchMove(4, 511.14, 1030.79);
        usleep(16732.54);
        touchMove(4, 524.48, 996.18);
        usleep(16687.50);
        touchMove(4, 539.89, 958.51);
        usleep(16652.54);
        touchMove(4, 559.39, 913.71);
        usleep(16803.08);
        touchMove(4, 574.78, 882.15);
        usleep(15420.58);
        touchUp(4, 578.89, 878.08);

    }

}


module.exports = ATHelper;