const axios = require('axios');
const AtHelper = require('./Utils.js');
const { touchDown, touchMove, touchUp, usleep, appActivate, keyDown, keyUp } = at

class DataAccountModel {
    constructor() {
        this.fullName = '';
        this.phoneNumber = '';
        this.address = '';
        this.deviceName = '';
        this.username = '';
        this.password = '';

        this.otp = '';
        this.session = '';

        this.AtHelper = new AtHelper();

    }

    axiosGet(url) {
        return axios.get(encodeURI(url)).then(function (response) {
            return response.data;
        })
            .catch(function (error) {
                console.log(error);
            })
    }

    resetProxy(ip, port) {
        at.toast("Reset IP Proxy: " + port);
        const url = `http://${ip}:10000/reset?proxy=${ip}:${port}`;

        this.axiosGet(url).then((returlVal) => {
            return returlVal;
        })

        this.AtHelper.thongBao("Dang Change IP Port: " + port);
        this.AtHelper.delayCus(6);
    }

    setPhoneNumber(phoneNumber, deviceName) {
        const url = `http://reglzd.herokuapp.com/api/setinfo`;
        const data = {
            phoneNumber: phoneNumber,
            deviceName: deviceName
        }

        return axios.post(encodeURI(url), data).then(resp => {
            console.log(resp.data);
        })
    }


    getData(deviceName) {
        const url = `http://reglzd.herokuapp.com/api/getinfo&devicename=${deviceName}`;

        this.axiosGet(url).then((returlVal) => {


            this.fullName = returlVal.data.fullName;
            this.phoneNumber = returlVal.data.phoneNumber;
            this.address = returlVal.data.address;
            this.deviceName = returlVal.data.deviceName;
            this.username = returlVal.data.username;
            this.password = returlVal.data.password;
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    createService(serviceID) {
        const url = `http://otpsim.com/api/phones/request?token=2d4ce1a541eba73f1565d2aebe385026&service=${serviceID}`;

        this.axiosGet(url).then((returlVal) => {
            this.phoneNumber = returlVal.data.phone_number;
            this.session = returlVal.data.session;
        });

        at.usleep(2000000);
    }

    getCode(session) {
        const url = `http://otpsim.com/api/sessions/${session}?token=2d4ce1a541eba73f1565d2aebe385026`;

        this.axiosGet(url).then((returlVal) => {
            if (returlVal.success) {
                this.otp = returlVal.data.messages[0].otp;
                console.log(returlVal.data.messages[0].otp);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    loopGetCode() {
        for (var i = 0; i < 6; i++) {
            if (this.session != '') {
                if (this.otp != '') {
                    at.toast('OTP Code: ' + this.otp);
                    break;
                }
                if (this.otp == '') {
                    at.toast(`Cho get code lan ${i + 1}: ` + this.session);
                    this.getCode(this.session);
                    at.usleep(7000000);
                    console.log(this.otp);
                }
            }
        }
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
            at.toast(`Find mau lan ${i + 1}`, 1);
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

    resetAndRunZalo() {
        //run app
        this.AtHelper.thongBao('run App Manager');
        at.appRun("com.tigisoftware.ADManager");
        at.usleep(3000000);

        at.tap(317, 285);
        at.usleep(2000000);

        at.touchDown(5, 691.78, 1170.28);
        at.usleep(1000000);
        at.touchUp(5, 691.78, 1170.28);

        this.AtHelper.thongBao("Keyword: Zalo");
        this.AtHelper.inputTextCustom("Zalo");
        at.usleep(2000000);

        //check icon Zalo
        const optionIconZalo = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 26879, x: 0, y: 0 },
                { color: 26879, x: 3, y: 32 },
                { color: 16777215, x: 43, y: 30 },
                { color: 16777215, x: 43, y: 1 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 27.46, y: 152.11, width: 75.00, height: 88.73 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }
        const find_optionIconZalo = this.AtHelper.findToaDo(optionIconZalo, 2);
        if (find_optionIconZalo.success == true) {
            at.usleep(1000000);
            at.tap(find_optionIconZalo.data.x, find_optionIconZalo.data.y);
        }
        else {
            at.usleep(1000000);
            at.tap(319, 198);
        }

        //thuc hien vuot va click Xoa
        at.usleep(1000000);
        this.AtHelper.thongBao("Vuot xuong");
        this.AtHelper.vuotXuongAppManager();
        at.usleep(1000000);

        //check button Xoa
        const findTextXoa1 = this.findMau(43, 1146, 16711680, 3);

        if (findTextXoa1.success == true) {
            at.toast("Click button Xoa 1");

            at.usleep(1000000);
            at.touchDown(0, findTextXoa1.data.x, findTextXoa1.data.y)
            at.usleep(50000)
            at.touchUp(0, findTextXoa1.data.x, findTextXoa1.data.y)
        }
        else {
            at.toast("Click button Xoa 2");

            at.usleep(1000000);
            at.touchDown(0, 346, 1144)
            at.usleep(50000)
            at.touchUp(0, 346, 1144)
        }

        //Click Xoa Du Lieu
        at.usleep(1000000);

        at.touchDown(0, 346, 1144)
        at.usleep(50000)
        at.touchUp(0, 346, 1144)

        //goBack
        at.toast("Quay ve ung dung");
        at.usleep(2000000);
        at.touchDown(0, 112, 84)
        at.usleep(50000)
        at.touchUp(0, 112, 84)

        //thuc hien xoa ZaloPay
        at.usleep(1000000);
        this.AtHelper.thongBao("Thuc hien xoa ZaloPay");


        const optionIconZaloPay = {
            colors: [ // REQUIRED, colors and their relative positions
                { color: 36837, x: 0, y: 0 },
                { color: 36837, x: 4, y: 22 },
                { color: 16777215, x: 33, y: 22 },
                { color: 113921, x: 30, y: 3 },
                { color: 310788, x: 21, y: 15 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: { x: 28.52, y: 251.41, width: 75.00, height: 90.85 }, // OPTIONAL, default is null, null means the whole screen
            debug: false,
        }
        const find_optionIconZaloPay = this.AtHelper.findToaDo(optionIconZaloPay, 2);
        if (find_optionIconZaloPay.success == true) {
            at.usleep(1000000);
            at.tap(find_optionIconZaloPay.data.x, find_optionIconZaloPay.data.y);
        }
        else {
            at.touchDown(0, 344, 295)
            at.usleep(50000)
            at.touchUp(0, 344, 295)
        }

        //thuc hien vuot va click Xoa
        at.usleep(1000000);
        this.AtHelper.thongBao("Vuot xuong");
        this.AtHelper.vuotXuongAppManager();
        at.usleep(1000000);

        //check button Xoa
        const findTextXoa2 = this.findMau(43, 1146, 16711680, 3);

        if (findTextXoa2.success == true) {
            at.toast("Click button Xoa 1");

            at.usleep(1000000);
            at.touchDown(0, findTextXoa2.data.x, findTextXoa2.data.y)
            at.usleep(50000)
            at.touchUp(0, findTextXoa2.data.x, findTextXoa2.data.y)
        }
        else {
            at.toast("Click button Xoa 2");

            at.touchDown(0, 346, 1144)
            at.usleep(50000)
            at.touchUp(0, 346, 1144)
        }

        //Click Xoa Du Lieu
        at.usleep(1000000);

        at.touchDown(0, 346, 1144)
        at.usleep(50000)
        at.touchUp(0, 346, 1144);

        at.usleep(2000000);
        this.AtHelper.keyPress(KEY_TYPE.HOME_BUTTON);
        at.usleep(1000000);



    }

    runZalo() {
        this.AtHelper.thongBao("Run App Zalo");
        at.appRun("vn.com.vng.zingalo");
        this.AtHelper.delayCus(3);

        //check button DangKi
        const findBtnDangKi = this.findMau(358, 1156, 2236962, 3);
        at.usleep(1000000);

        if (findBtnDangKi.success == true) {
            at.toast("Click button Dang Ki");

            at.usleep(1000000);
            at.touchDown(0, findBtnDangKi.data.x, findBtnDangKi.data.y)
            at.usleep(50000)
            at.touchUp(0, findBtnDangKi.data.x, findBtnDangKi.data.y)
        }
        else {
            at.toast("Click button Xoa 2");

            at.touchDown(0, 395, 1153)
            at.usleep(50000)
            at.touchUp(0, 395, 1153)
        }

        at.usleep(2000000);
        this.AtHelper.thongBao("Input FullName: " + this.fullName);
        this.AtHelper.inputTextCustom(this.fullName);
        at.usleep(2000000);

        //click bnt TiepTuc
        at.touchDown(0, 384, 454)
        at.usleep(50000)
        at.touchUp(0, 384, 454)

        //input SDT
        this.AtHelper.thongBao("Input SDT: " + this.phoneNumber);
        at.usleep(2000000);
        this.AtHelper.inputTextCustom(this.phoneNumber);

        at.usleep(2000000);
        //check button DangKi
        const findBtnTiepTuc = this.findMau(383, 453, 39167, 3);
        at.usleep(1000000);

        if (findBtnTiepTuc.success == true) {
            at.toast("Click button Tiep Tuc");

            at.usleep(1000000);
            at.touchDown(0, findBtnTiepTuc.data.x, findBtnTiepTuc.data.y)
            at.usleep(50000)
            at.touchUp(0, findBtnTiepTuc.data.x, findBtnTiepTuc.data.y)
        }
        else {
            at.toast("Click Tiep Tuc 2");

            at.touchDown(0, 383, 453)
            at.usleep(50000)
            at.touchUp(0, 383, 453)
        }

        at.usleep(2000000);

        at.touchDown(0, 503, 781);
        at.usleep(50000);
        at.touchUp(0, 503, 781);

    }

    runZaloPay() {
        this.AtHelper.thongBao("Run App Zalo Pay");
        at.appRun("vn.com.vng.zalopay");
        this.AtHelper.delayCus(3);

        //click btn TiepTuc
        at.touchDown(0, 385, 1009)
        at.usleep(50000)
        at.touchUp(0, 385, 1009)

        this.AtHelper.delayCus(2);

        //check button DangNhapZalo
        const findBtnDangNhapZalo = this.findMau(377, 1022, 28159, 3);
        at.usleep(1000000);

        if (findBtnDangNhapZalo.success == true) {
            at.toast("Click button Dang Nhap Voi Zalo");

            at.usleep(1000000);
            at.touchDown(0, findBtnDangNhapZalo.data.x, findBtnDangNhapZalo.data.y)
            at.usleep(50000)
            at.touchUp(0, findBtnDangNhapZalo.data.x, findBtnDangNhapZalo.data.y)
        }
        else {
            at.toast("Click button Dang Nhap Voi Zalo 2");

            at.touchDown(0, 361, 1023)
            at.usleep(50000)
            at.touchUp(0, 361, 1023)
        }

        //input phoneNumber
        at.usleep(1000000);
        this.AtHelper.thongBao("Input phoneNumber: " + this.phoneNumber);
        at.usleep(2000000);
        this.AtHelper.inputTextCustom(this.phoneNumber);
        at.usleep(1000000);

    }

    guiSDTNapTien() {
        const url = `http://reglzd.herokuapp.com/api/setNapTien`;
        const data = {
            phoneNumber: this.phoneNumber,
            deviceName: this.deviceName
        }

        return axios.post(encodeURI(url), data).then(resp => {
            console.log(resp.data);
        })
    }

    dienDiaChiLZD() {
        // //input fullname
        // this.AtHelper.thongBao("Input fullname: " + this.fullName);

        // at.touchDown(0, 242, 173)
        // at.usleep(50000)
        // at.touchUp(0, 242, 173)
        // at.usleep(2000000);

        // this.AtHelper.inputTextCustom(this.fullName + " MM");
        // at.usleep(2000000);

        // //input sdt
        // this.AtHelper.thongBao("Input sdt: " + this.phoneNumber);

        // at.touchDown(0, 253, 281)
        // at.usleep(50000)
        // at.touchUp(0, 253, 281)
        // at.usleep(2000000);

        // this.AtHelper.inputTextCustom(this.phoneNumber);
        // at.usleep(2000000);

        // //input dia chi
        // this.AtHelper.thongBao("Input dia chi: " + this.address);

        // at.touchDown(0, 273, 511)
        // at.usleep(50000)
        // at.touchUp(0, 273, 511)
        // at.usleep(2000000);

        // this.AtHelper.inputTextCustom(this.address);
        // at.usleep(2000000);

        //input fullname
        this.AtHelper.thongBao("Input fullname: " + this.fullName);

        at.touchDown(0, 159, 285)
        at.usleep(50000)
        at.touchUp(0, 159, 285)
        at.usleep(2000000);

        this.AtHelper.inputTextCustom(this.fullName + " MM");
        at.usleep(2000000);

        //input dia chi
        this.AtHelper.thongBao("Input dia chi: " + this.address);

        at.touchDown(0, 171, 447)
        at.usleep(50000)
        at.touchUp(0, 171, 447)
        at.usleep(2000000);

        this.AtHelper.inputTextCustom(this.address);
        at.usleep(2000000);


        touchDown(2, 15.39, 529.87);
        usleep(116645.54);
        touchMove(2, 34.89, 526.81);
        usleep(16511.25);
        touchMove(2, 44.13, 526.81);
        usleep(16902.67);
        touchMove(2, 58.50, 526.81);
        usleep(16724.92);
        touchMove(2, 73.89, 526.81);
        usleep(16650.83);
        touchMove(2, 90.32, 526.81);
        usleep(16656.54);
        touchMove(2, 107.77, 526.81);
        usleep(16810.71);
        touchMove(2, 126.24, 525.80);
        usleep(16669.92);
        touchMove(2, 144.72, 525.80);
        usleep(16492.33);
        touchMove(2, 164.22, 524.78);
        usleep(16705.17);
        touchMove(2, 184.74, 524.78);
        usleep(16773.25);
        touchMove(2, 205.27, 523.76);
        usleep(16596.96);
        touchMove(2, 223.75, 523.76);
        usleep(16639.75);
        touchMove(2, 241.20, 523.76);
        usleep(16698.79);
        touchMove(2, 257.62, 523.76);
        usleep(16546.71);
        touchMove(2, 279.18, 523.76);
        usleep(16697.71);
        touchMove(2, 302.79, 523.76);
        usleep(16950.71);
        touchMove(2, 327.42, 523.76);
        usleep(16399.17);
        touchMove(2, 353.07, 523.76);
        usleep(16622.04);
        touchMove(2, 378.73, 523.76);
        usleep(16779.08);
        touchMove(2, 405.42, 523.76);
        usleep(16472.58);
        touchMove(2, 433.14, 523.76);
        usleep(16669.25);
        touchMove(2, 460.85, 523.76);
        usleep(16908.46);
        touchMove(2, 497.80, 523.76);
        usleep(16597.96);
        touchMove(2, 535.78, 526.81);
        usleep(16782.12);
        touchMove(2, 575.81, 532.92);
        usleep(16564.38);
        touchMove(2, 623.02, 539.03);
        usleep(16535.04);
        touchMove(2, 654.84, 541.08);
        usleep(16343.46);
        touchMove(2, 701.03, 545.15);
        usleep(16753.50);
        touchUp(2, 727.71, 548.21);
        at.usleep(1000000);

        //input sdt
        this.AtHelper.thongBao("Input sdt: " + this.phoneNumber);

        at.touchDown(0, 167, 1058)
        at.usleep(50000)
        at.touchUp(0, 167, 1058)
        at.usleep(2000000);

        this.AtHelper.inputTextCustom(this.phoneNumber);
        at.usleep(2000000);


    }

    dienDiaChiTH2() {
        const find_colorBtnDangNhap = this.findMau(388, 1270, 16735030, 2);

        if (find_colorBtnDangNhap.success == true) {
            this.AtHelper.thongBao("Truong hop 1");
            //input fullname
            this.AtHelper.thongBao("Input fullname: " + this.fullName);
            at.touchDown(0, 154, 210)
            at.usleep(50000)
            at.touchUp(0, 154, 210)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.fullName + " MM");
            at.usleep(1000000);

            //input dia chi
            this.AtHelper.thongBao("Input dia chi: " + this.address);

            at.touchDown(0, 141, 361)
            at.usleep(50000)
            at.touchUp(0, 141, 361)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.address);
            at.usleep(1000000);


            // appActivate("com.LazadaSEA.Lazada");


            // touchDown(1, 510.12, 502.39);
            // usleep(133292.62);
            // touchUp(1, 510.12, 502.39);
            // usleep(4151613.12);

            // touchDown(2, 329.46, 89.01);
            // usleep(131999.12);
            // touchUp(2, 329.46, 89.01);
            // usleep(1833480.71);

            // touchDown(5, 448.53, 990.08);
            // usleep(84669.21);
            // touchMove(5, 450.59, 971.74);
            // usleep(16902.83);
            // touchMove(5, 450.59, 963.60);
            // usleep(16299.96);
            // touchMove(5, 450.59, 956.47);
            // usleep(16613.92);
            // touchMove(5, 451.61, 947.31);
            // usleep(16660.42);
            // touchMove(5, 452.64, 940.19);
            // usleep(16783.62);
            // touchMove(5, 453.67, 933.06);
            // usleep(16561.00);
            // touchMove(5, 454.69, 926.96);
            // usleep(16624.29);
            // touchMove(5, 455.72, 921.85);
            // usleep(16761.71);
            // touchMove(5, 455.72, 917.78);
            // usleep(16635.83);
            // touchMove(5, 456.75, 913.71);
            // usleep(16750.25);
            // touchMove(5, 457.76, 909.63);
            // usleep(16643.25);
            // touchMove(5, 458.79, 905.56);
            // usleep(16595.21);
            // touchMove(5, 459.82, 901.49);
            // usleep(16706.04);
            // touchMove(5, 460.85, 897.42);
            // usleep(16670.62);
            // touchMove(5, 461.87, 893.35);
            // usleep(16673.62);
            // touchMove(5, 462.90, 888.26);
            // usleep(16603.38);
            // touchMove(5, 463.93, 884.19);
            // usleep(16764.12);
            // touchMove(5, 464.95, 880.12);
            // usleep(16548.00);
            // touchMove(5, 465.98, 876.05);
            // usleep(16689.33);
            // touchMove(5, 467.01, 870.96);
            // usleep(16746.92);
            // touchMove(5, 468.03, 865.85);
            // usleep(16622.79);
            // touchMove(5, 470.09, 860.76);
            // usleep(16672.42);
            // touchMove(5, 471.11, 854.65);
            // usleep(16710.08);
            // touchMove(5, 472.14, 850.58);
            // usleep(16599.33);
            // touchMove(5, 474.19, 845.49);
            // usleep(16684.58);
            // touchMove(5, 476.25, 840.41);
            // usleep(16773.42);
            // touchMove(5, 477.28, 836.34);
            // usleep(16553.88);
            // touchMove(5, 478.29, 833.28);
            // usleep(16852.21);
            // touchMove(5, 479.32, 830.23);
            // usleep(16476.46);
            // touchMove(5, 480.35, 825.14);
            // usleep(16642.00);
            // touchMove(5, 481.37, 821.07);
            // usleep(16743.42);
            // touchMove(5, 482.40, 817.00);
            // usleep(16716.62);
            // touchMove(5, 484.45, 811.89);
            // usleep(16572.96);
            // touchMove(5, 485.48, 807.82);
            // usleep(16668.00);
            // touchMove(5, 487.53, 802.73);
            // usleep(16698.38);
            // touchMove(5, 488.56, 797.64);
            // usleep(16715.33);
            // touchMove(5, 490.61, 793.57);
            // usleep(16574.96);
            // touchMove(5, 491.64, 789.50);
            // usleep(16771.71);
            // touchMove(5, 492.67, 785.43);
            // usleep(16595.38);
            // touchMove(5, 493.70, 781.36);
            // usleep(16643.17);
            // touchMove(5, 494.72, 777.28);
            // usleep(16732.92);
            // touchMove(5, 495.75, 772.20);
            // usleep(16688.25);
            // touchMove(5, 496.78, 768.12);
            // usleep(16585.62);
            // touchMove(5, 498.83, 764.05);
            // usleep(16755.04);
            // touchMove(5, 499.86, 761.00);
            // usleep(16594.79);
            // touchMove(5, 501.90, 755.89);
            // usleep(16758.92);
            // touchMove(5, 503.95, 751.82);
            // usleep(16617.33);
            // touchMove(5, 504.98, 747.75);
            // usleep(16662.67);
            // touchMove(5, 506.01, 744.70);
            // usleep(16643.04);
            // touchMove(5, 507.04, 739.61);
            // usleep(16771.54);
            // touchMove(5, 508.06, 736.55);
            // usleep(16578.00);
            // touchMove(5, 509.09, 733.50);
            // usleep(16701.46);
            // touchMove(5, 510.12, 730.45);
            // usleep(16676.83);
            // touchMove(5, 511.14, 728.41);
            // usleep(16816.67);
            // touchMove(5, 512.17, 725.36);
            // usleep(16474.83);
            // touchMove(5, 513.20, 722.31);
            // usleep(16711.88);
            // touchMove(5, 514.22, 719.25);
            // usleep(16599.67);
            // touchMove(5, 515.25, 716.20);
            // usleep(16744.12);
            // touchMove(5, 516.28, 712.13);
            // usleep(16672.46);
            // touchMove(5, 518.33, 708.06);
            // usleep(16601.58);
            // touchMove(5, 520.37, 705.00);
            // usleep(16752.29);
            // touchMove(5, 521.40, 701.93);
            // usleep(16666.42);
            // touchMove(5, 523.46, 698.88);
            // usleep(16653.42);
            // touchMove(5, 524.48, 696.84);
            // usleep(16634.71);
            // touchMove(5, 525.51, 695.82);
            // usleep(16701.25);
            // touchMove(5, 526.54, 693.79);
            // usleep(16595.67);
            // touchMove(5, 526.54, 692.77);
            // usleep(16739.79);
            // touchMove(5, 527.56, 690.73);
            // usleep(16673.62);
            // touchMove(5, 527.56, 689.72);
            // usleep(16615.38);
            // touchMove(5, 528.59, 688.70);
            // usleep(16801.88);
            // touchMove(5, 529.62, 686.66);
            // usleep(16668.75);
            // touchMove(5, 530.64, 684.63);
            // usleep(16639.04);
            // touchMove(5, 530.64, 682.59);
            // usleep(16602.21);
            // touchMove(5, 531.67, 680.56);
            // usleep(16632.50);
            // touchMove(5, 532.70, 679.54);
            // usleep(17074.96);
            // touchMove(5, 533.72, 678.52);
            // usleep(16261.96);
            // touchMove(5, 533.72, 677.50);
            // usleep(16803.00);
            // touchMove(5, 534.75, 676.49);
            // usleep(16562.38);
            // touchMove(5, 534.75, 675.47);
            // usleep(50074.21);
            // touchMove(5, 534.75, 674.45);
            // usleep(183506.17);
            // touchMove(5, 534.75, 673.43);
            // usleep(299955.75);
            // touchMove(5, 534.75, 672.41);
            // usleep(166642.04);
            // touchMove(5, 534.75, 671.40);
            // usleep(149952.38);
            // touchMove(5, 534.75, 670.38);
            // usleep(48764.54);
            // touchUp(5, 536.80, 669.36);
            // usleep(1784745.88);

            // touchDown(3, 208.35, 1233.40);
            // usleep(115172.00);
            // touchUp(3, 208.35, 1233.40);
            // usleep(1518193.04);

            // touchDown(6, 354.10, 1164.18);
            // usleep(100048.71);
            // touchMove(6, 358.21, 1146.87);
            // usleep(16751.17);
            // touchMove(6, 358.21, 1140.75);
            // usleep(16476.42);
            // touchMove(6, 358.21, 1135.66);
            // usleep(16568.92);
            // touchMove(6, 358.21, 1130.57);
            // usleep(16675.08);
            // touchMove(6, 358.21, 1126.50);
            // usleep(16734.33);
            // touchMove(6, 359.23, 1122.43);
            // usleep(16626.83);
            // touchMove(6, 360.26, 1118.36);
            // usleep(16620.21);
            // touchMove(6, 361.29, 1115.30);
            // usleep(16753.71);
            // touchMove(6, 362.31, 1111.23);
            // usleep(16605.00);
            // touchMove(6, 363.34, 1107.16);
            // usleep(16574.21);
            // touchMove(6, 364.37, 1102.07);
            // usleep(16852.67);
            // touchMove(6, 365.40, 1099.02);
            // usleep(16628.50);
            // touchMove(6, 365.40, 1093.93);
            // usleep(16594.00);
            // touchMove(6, 366.42, 1088.82);
            // usleep(16831.33);
            // touchMove(6, 367.45, 1084.75);
            // usleep(16527.67);
            // touchMove(6, 368.48, 1079.66);
            // usleep(16637.04);
            // touchMove(6, 369.50, 1074.57);
            // usleep(16809.46);
            // touchMove(6, 370.53, 1069.48);
            // usleep(16540.58);
            // touchMove(6, 371.56, 1064.40);
            // usleep(16675.00);
            // touchMove(6, 372.57, 1060.32);
            // usleep(16760.17);
            // touchMove(6, 373.60, 1054.22);
            // usleep(16561.92);
            // touchMove(6, 374.63, 1050.15);
            // usleep(16688.21);
            // touchMove(6, 375.65, 1044.04);
            // usleep(16733.83);
            // touchMove(6, 377.71, 1037.93);
            // usleep(16648.25);
            // touchMove(6, 379.76, 1032.82);
            // usleep(16628.58);
            // touchMove(6, 380.79, 1028.75);
            // usleep(16723.67);
            // touchMove(6, 381.82, 1023.66);
            // usleep(16616.08);
            // touchMove(6, 382.84, 1019.59);
            // usleep(16672.92);
            // touchMove(6, 383.87, 1015.52);
            // usleep(16865.29);
            // touchMove(6, 384.90, 1010.43);
            // usleep(16455.29);
            // touchMove(6, 385.92, 1006.36);
            // usleep(16697.12);
            // touchMove(6, 386.95, 1002.29);
            // usleep(16715.42);
            // touchMove(6, 389.00, 998.22);
            // usleep(16591.17);
            // touchMove(6, 390.03, 994.15);
            // usleep(16699.50);
            // touchMove(6, 392.07, 991.10);
            // usleep(16676.08);
            // touchMove(6, 393.10, 987.02);
            // usleep(16658.21);
            // touchMove(6, 394.13, 984.99);
            // usleep(16656.38);
            // touchMove(6, 395.15, 981.94);
            // usleep(16761.46);
            // touchMove(6, 396.18, 978.86);
            // usleep(16562.83);
            // touchMove(6, 397.21, 975.81);
            // usleep(16677.83);
            // touchMove(6, 398.24, 973.77);
            // usleep(16892.58);
            // touchMove(6, 399.26, 971.74);
            // usleep(16459.88);
            // touchMove(6, 400.29, 970.72);
            // usleep(16628.88);
            // touchMove(6, 401.32, 968.68);
            // usleep(16752.38);
            // touchMove(6, 401.32, 967.67);
            // usleep(16724.00);
            // touchMove(6, 402.34, 966.65);
            // usleep(16596.08);
            // touchMove(6, 402.34, 965.63);
            // usleep(16709.71);
            // touchMove(6, 403.37, 964.61);
            // usleep(16584.38);
            // touchMove(6, 403.37, 963.60);
            // usleep(16644.79);
            // touchMove(6, 404.40, 963.60);
            // usleep(16860.25);
            // touchMove(6, 404.40, 962.58);
            // usleep(16504.62);
            // touchMove(6, 404.40, 961.56);
            // usleep(16682.00);
            // touchMove(6, 405.42, 960.54);
            // usleep(16686.25);
            // touchMove(6, 405.42, 958.51);
            // usleep(16623.83);
            // touchMove(6, 406.45, 957.49);
            // usleep(16683.08);
            // touchMove(6, 406.45, 955.45);
            // usleep(16707.83);
            // touchMove(6, 407.48, 953.42);
            // usleep(16756.83);
            // touchMove(6, 408.50, 952.40);
            // usleep(16632.46);
            // touchMove(6, 408.50, 951.38);
            // usleep(16594.58);
            // touchMove(6, 409.53, 950.37);
            // usleep(16631.79);
            // touchMove(6, 409.53, 949.35);
            // usleep(16669.50);
            // touchMove(6, 409.53, 948.33);
            // usleep(16711.21);
            // touchMove(6, 410.56, 947.31);
            // usleep(16678.25);
            // touchMove(6, 410.56, 946.29);
            // usleep(16596.21);
            // touchMove(6, 411.58, 945.28);
            // usleep(16734.29);
            // touchMove(6, 411.58, 943.24);
            // usleep(16690.58);
            // touchMove(6, 412.61, 942.22);
            // usleep(16574.67);
            // touchMove(6, 412.61, 940.19);
            // usleep(16774.42);
            // touchMove(6, 413.64, 939.17);
            // usleep(16610.79);
            // touchMove(6, 413.64, 938.15);
            // usleep(16645.96);
            // touchMove(6, 414.67, 936.12);
            // usleep(16713.04);
            // touchMove(6, 415.68, 934.08);
            // usleep(16624.08);
            // touchMove(6, 416.71, 931.03);
            // usleep(16790.79);
            // touchMove(6, 417.74, 928.99);
            // usleep(16625.67);
            // touchMove(6, 417.74, 926.96);
            // usleep(16645.29);
            // touchMove(6, 418.76, 923.88);
            // usleep(16601.25);
            // touchMove(6, 419.79, 921.85);
            // usleep(16742.54);
            // touchMove(6, 420.82, 919.81);
            // usleep(16570.00);
            // touchMove(6, 421.84, 917.78);
            // usleep(16702.50);
            // touchMove(6, 422.87, 915.74);
            // usleep(16714.71);
            // touchMove(6, 423.90, 912.69);
            // usleep(16650.79);
            // touchMove(6, 424.92, 910.65);
            // usleep(16622.33);
            // touchMove(6, 425.95, 907.60);
            // usleep(16715.75);
            // touchMove(6, 426.98, 905.56);
            // usleep(16623.42);
            // touchMove(6, 428.01, 903.53);
            // usleep(16692.79);
            // touchMove(6, 429.03, 901.49);
            // usleep(16686.08);
            // touchMove(6, 430.06, 900.47);
            // usleep(16612.54);
            // touchMove(6, 431.09, 898.44);
            // usleep(16677.58);
            // touchMove(6, 432.11, 896.40);
            // usleep(16734.67);
            // touchMove(6, 433.14, 895.39);
            // usleep(16618.88);
            // touchMove(6, 433.14, 893.35);
            // usleep(33349.21);
            // touchMove(6, 434.17, 892.33);
            // usleep(33501.17);
            // touchMove(6, 434.17, 891.31);
            // usleep(49988.42);
            // touchMove(6, 434.17, 890.30);
            // usleep(16558.46);
            // touchMove(6, 435.18, 890.30);
            // usleep(16605.67);
            // touchMove(6, 435.18, 889.28);
            // usleep(33323.88);
            // touchMove(6, 435.18, 888.26);
            // usleep(50246.71);
            // touchMove(6, 435.18, 887.24);
            // usleep(300032.67);
            // touchMove(6, 435.18, 886.23);
            // usleep(16576.71);
            // touchMove(6, 436.21, 883.17);
            // usleep(15316.25);
            // touchUp(6, 439.29, 879.10);
            // usleep(1451385.08);

            // touchDown(4, 244.27, 1090.88);
            // usleep(98583.29);
            // touchUp(4, 244.27, 1090.88);
            // usleep(3218445.83);

            // touchDown(1, 597.36, 640.84);
            // usleep(100261.96);
            // touchMove(1, 599.41, 624.56);
            // usleep(16230.46);
            // touchMove(1, 599.41, 617.44);
            // usleep(16690.25);
            // touchMove(1, 600.44, 609.29);
            // usleep(16687.46);
            // touchMove(1, 601.47, 601.15);
            // usleep(16548.29);
            // touchMove(1, 603.52, 594.01);
            // usleep(16754.88);
            // touchMove(1, 604.55, 585.86);
            // usleep(16797.92);
            // touchMove(1, 605.58, 577.72);
            // usleep(16504.38);
            // touchMove(1, 606.59, 568.56);
            // usleep(16733.12);
            // touchMove(1, 607.62, 561.44);
            // usleep(16574.29);
            // touchMove(1, 608.65, 553.30);
            // usleep(16651.62);
            // touchMove(1, 609.67, 546.17);
            // usleep(16757.50);
            // touchMove(1, 610.70, 538.01);
            // usleep(16611.67);
            // touchMove(1, 611.73, 530.88);
            // usleep(16680.83);
            // touchMove(1, 612.75, 524.78);
            // usleep(16678.38);
            // touchMove(1, 613.78, 517.65);
            // usleep(16620.33);
            // touchMove(1, 614.81, 509.51);
            // usleep(16688.17);
            // touchMove(1, 616.86, 501.37);
            // usleep(16701.33);
            // touchMove(1, 617.89, 492.21);
            // usleep(16625.04);
            // touchMove(1, 618.92, 482.01);
            // usleep(16712.17);
            // touchMove(1, 619.94, 471.83);
            // usleep(16667.50);
            // touchMove(1, 620.97, 460.64);
            // usleep(16760.25);
            // touchMove(1, 622.00, 448.43);
            // usleep(16551.00);
            // touchMove(1, 623.02, 437.23);
            // usleep(16812.92);
            // touchMove(1, 624.05, 425.00);
            // usleep(16501.88);
            // touchMove(1, 625.08, 413.80);
            // usleep(16692.21);
            // touchMove(1, 626.09, 402.61);
            // usleep(16724.67);
            // touchMove(1, 628.15, 390.39);
            // usleep(16704.67);
            // touchMove(1, 630.20, 380.22);
            // usleep(16639.04);
            // touchMove(1, 632.25, 369.00);
            // usleep(16652.08);
            // touchMove(1, 635.34, 359.84);
            // usleep(16663.42);
            // touchMove(1, 637.39, 349.66);
            // usleep(16622.42);
            // touchMove(1, 639.44, 340.50);
            // usleep(16718.42);
            // touchMove(1, 642.52, 331.34);
            // usleep(16600.12);
            // touchMove(1, 644.58, 322.18);
            // usleep(16723.79);
            // touchMove(1, 646.63, 313.00);
            // usleep(16678.58);
            // touchMove(1, 648.67, 304.86);
            // usleep(16620.08);
            // touchMove(1, 650.73, 294.68);
            // usleep(16646.88);
            // touchMove(1, 652.78, 285.52);
            // usleep(16778.33);
            // touchMove(1, 654.84, 275.35);
            // usleep(16542.71);
            // touchMove(1, 656.89, 266.19);
            // usleep(16688.38);
            // touchMove(1, 658.94, 257.01);
            // usleep(16736.83);
            // touchMove(1, 661.00, 247.85);
            // usleep(16579.38);
            // touchMove(1, 663.05, 238.69);
            // usleep(16664.38);
            // touchMove(1, 665.11, 228.51);
            // usleep(16764.12);
            // touchMove(1, 667.16, 218.33);
            // usleep(16613.12);
            // touchMove(1, 669.20, 209.17);
            // usleep(16640.54);
            // touchMove(1, 672.28, 198.97);
            // usleep(16732.46);
            // touchMove(1, 674.34, 189.81);
            // usleep(16603.92);
            // touchMove(1, 677.42, 179.63);
            // usleep(16668.96);
            // touchMove(1, 680.50, 169.46);
            // usleep(16500.50);
            // touchMove(1, 682.55, 159.28);
            // usleep(16592.96);
            // touchMove(1, 685.63, 151.12);
            // usleep(16669.08);
            // touchMove(1, 686.66, 145.01);
            // usleep(16747.33);
            // touchMove(1, 687.69, 140.94);
            // usleep(16578.92);
            // touchMove(1, 688.71, 137.89);
            // usleep(16650.67);
            // touchMove(1, 689.74, 135.85);
            // usleep(16715.75);
            // touchMove(1, 690.77, 134.83);
            // usleep(16699.88);
            // touchMove(1, 691.78, 132.80);
            // usleep(16787.33);
            // touchMove(1, 692.81, 130.76);
            // usleep(16552.38);
            // touchMove(1, 693.84, 127.71);
            // usleep(16640.17);
            // touchMove(1, 694.86, 124.66);
            // usleep(16598.54);
            // touchMove(1, 695.89, 120.58);
            // usleep(16764.12);
            // touchMove(1, 696.92, 116.51);
            // usleep(16591.42);
            // touchMove(1, 697.95, 111.42);
            // usleep(16654.25);
            // touchMove(1, 698.97, 108.37);
            // usleep(16722.00);
            // touchMove(1, 700.00, 105.32);
            // usleep(16613.08);
            // touchMove(1, 701.03, 103.28);
            // usleep(16688.38);
            // touchMove(1, 701.03, 101.25);
            // usleep(16726.67);
            // touchMove(1, 701.03, 100.23);
            // usleep(16594.96);
            // touchMove(1, 702.05, 98.19);
            // usleep(16808.42);
            // touchMove(1, 702.05, 97.16);
            // usleep(33396.04);
            // touchMove(1, 702.05, 96.14);
            // usleep(16434.25);
            // touchMove(1, 703.08, 96.14);
            // usleep(16789.54);
            // touchMove(1, 703.08, 95.12);
            // usleep(33503.58);
            // touchMove(1, 703.08, 94.10);
            // usleep(16467.33);
            // touchMove(1, 704.11, 94.10);
            // usleep(16646.96);
            // touchMove(1, 705.13, 93.08);
            // usleep(16620.38);
            // touchMove(1, 707.19, 92.07);
            // usleep(15591.33);
            // touchUp(1, 711.28, 88.00);
            appActivate("com.LazadaSEA.Lazada");



            touchDown(3, 359.23, 507.48);
            usleep(101373.17);
            touchUp(3, 359.23, 507.48);
            usleep(1698857.33);

            touchDown(1, 150.88, 180.65);
            usleep(117895.54);
            touchUp(1, 150.88, 180.65);
            usleep(998978.04);

            touchDown(5, 381.82, 988.04);
            usleep(17630.92);
            touchMove(5, 383.87, 977.84);
            usleep(16793.04);
            touchMove(5, 383.87, 958.51);
            usleep(16608.12);
            touchMove(5, 385.92, 940.19);
            usleep(16574.29);
            touchMove(5, 389.00, 918.79);
            usleep(16690.08);
            touchMove(5, 393.10, 892.33);
            usleep(16809.08);
            touchMove(5, 398.24, 857.71);
            usleep(16649.25);
            touchMove(5, 406.45, 825.14);
            usleep(16515.38);
            touchMove(5, 412.61, 793.57);
            usleep(16786.33);
            touchMove(5, 417.74, 768.12);
            usleep(16578.12);
            touchMove(5, 421.84, 743.68);
            usleep(16630.33);
            touchMove(5, 426.98, 721.29);
            usleep(16697.75);
            touchMove(5, 429.03, 701.93);
            usleep(16574.83);
            touchMove(5, 433.14, 677.50);
            usleep(16613.62);
            touchMove(5, 438.26, 654.09);
            usleep(16744.38);
            touchMove(5, 442.37, 629.65);
            usleep(16671.12);
            touchMove(5, 446.48, 609.29);
            usleep(16605.25);
            touchMove(5, 451.61, 587.90);
            usleep(16695.88);
            touchMove(5, 454.69, 564.49);
            usleep(16655.21);
            touchMove(5, 458.79, 548.21);
            usleep(16753.83);
            touchMove(5, 461.87, 530.88);
            usleep(16627.12);
            touchMove(5, 465.98, 514.60);
            usleep(16599.25);
            touchMove(5, 469.06, 500.35);
            usleep(16703.12);
            touchMove(5, 472.14, 488.14);
            usleep(16680.29);
            touchMove(5, 475.22, 476.92);
            usleep(16662.50);
            touchMove(5, 478.29, 466.75);
            usleep(16649.21);
            touchMove(5, 481.37, 456.57);
            usleep(16741.71);
            touchMove(5, 484.45, 448.43);
            usleep(16607.96);
            touchMove(5, 486.51, 442.32);
            usleep(16688.25);
            touchMove(5, 487.53, 439.27);
            usleep(16723.92);
            touchMove(5, 488.56, 437.23);
            usleep(16616.46);
            touchMove(5, 489.59, 436.21);
            usleep(16629.25);
            touchMove(5, 490.61, 436.21);
            usleep(166766.42);
            touchMove(5, 490.61, 435.19);
            usleep(50076.00);
            touchMove(5, 490.61, 434.18);
            usleep(33210.71);
            touchMove(5, 490.61, 433.16);
            usleep(17128.08);
            touchMove(5, 490.61, 430.11);
            usleep(14952.58);
            touchUp(5, 493.70, 426.01);
            usleep(1102996.17);

            touchDown(6, 363.34, 1082.71);
            usleep(64078.88);
            touchUp(6, 363.34, 1082.71);
            usleep(1184648.92);

            touchDown(6, 404.40, 1019.59);
            usleep(33248.46);
            touchMove(6, 408.50, 1005.34);
            usleep(16586.58);
            touchMove(6, 408.50, 991.10);
            usleep(16685.62);
            touchMove(6, 409.53, 969.70);
            usleep(16433.62);
            touchMove(6, 414.67, 934.08);
            usleep(16766.46);
            touchMove(6, 421.84, 886.23);
            usleep(16809.67);
            touchMove(6, 430.06, 839.39);
            usleep(16612.71);
            touchMove(6, 437.24, 795.60);
            usleep(16647.04);
            touchMove(6, 444.43, 759.98);
            usleep(16716.62);
            touchMove(6, 449.56, 731.46);
            usleep(16618.71);
            touchMove(6, 453.67, 705.00);
            usleep(16725.00);
            touchMove(6, 457.76, 685.65);
            usleep(16720.92);
            touchMove(6, 460.85, 668.34);
            usleep(16573.38);
            touchMove(6, 463.93, 655.11);
            usleep(16662.33);
            touchMove(6, 468.03, 643.90);
            usleep(16786.46);
            touchMove(6, 469.06, 635.75);
            usleep(16525.62);
            touchMove(6, 471.11, 630.67);
            usleep(16733.42);
            touchMove(6, 472.14, 628.63);
            usleep(83392.83);
            touchMove(6, 472.14, 627.61);
            usleep(16467.21);
            touchMove(6, 473.17, 627.61);
            usleep(117013.25);
            touchMove(6, 473.17, 626.59);
            usleep(166558.58);
            touchUp(6, 470.09, 619.47);
            usleep(1783507.46);

            touchDown(2, 390.03, 1092.91);
            usleep(116404.58);
            touchUp(2, 390.03, 1092.91);

            at.usleep(1000000);

            //truot
            touchDown(5, 628.15, 569.58);
            usleep(67925.96);
            touchMove(5, 631.23, 555.33);
            usleep(16659.00);
            touchMove(5, 632.25, 543.12);
            usleep(16530.08);
            touchMove(5, 635.34, 526.81);
            usleep(16606.21);
            touchMove(5, 641.50, 508.49);
            usleep(16775.42);
            touchMove(5, 646.63, 490.17);
            usleep(16822.29);
            touchMove(5, 650.73, 477.94);
            usleep(15248.50);
            touchUp(5, 654.84, 473.87);
            usleep(734793.04);

            touchDown(4, 605.58, 626.59);
            usleep(66689.04);
            touchMove(4, 615.83, 590.95);
            usleep(16548.96);
            touchMove(4, 618.92, 567.54);
            usleep(16748.33);
            touchMove(4, 627.12, 532.92);
            usleep(16502.25);
            touchMove(4, 639.44, 496.28);
            usleep(16806.71);
            touchUp(4, 655.86, 459.62);
            usleep(1116685.08);

            touchDown(6, 602.50, 639.83);
            usleep(33123.88);
            touchMove(6, 602.50, 631.68);
            usleep(16962.38);
            touchMove(6, 602.50, 617.44);
            usleep(16465.96);
            touchMove(6, 606.59, 591.97);
            usleep(16826.42);
            touchMove(6, 615.83, 556.35);
            usleep(16803.21);
            touchMove(6, 627.12, 509.51);
            usleep(16531.58);
            touchMove(6, 641.50, 466.75);
            usleep(16474.42);
            touchUp(6, 657.92, 431.12);
            //input sdt
            //click and input phoneNumber
            at.usleep(2000000);
            at.touchDown(0, 179, 533)
            at.usleep(50000)
            at.touchUp(0, 179, 533)


            this.AtHelper.thongBao("Input sdt: " + this.phoneNumber);
            this.AtHelper.inputTextCustom(this.phoneNumber);
            at.usleep(2000000);

            at.touchDown(0, 380, 858)
            at.usleep(50000)
            at.touchUp(0, 380, 858)
            at.usleep(1000000);
        }

        else {
            //input fullname
            this.AtHelper.thongBao("Input fullname: " + this.fullName);
            at.touchDown(0, 211, 171)
            at.usleep(50000)
            at.touchUp(0, 211, 171)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.fullName + " MM");
            at.usleep(2000000);

            //input dia chi
            this.AtHelper.thongBao("Input SDT: " + this.phoneNumber);

            at.touchDown(0, 231, 289)
            at.usleep(50000)
            at.touchUp(0, 231, 289)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.phoneNumber);
            at.usleep(2000000);

            //input sd


            appActivate("com.LazadaSEA.Lazada");


            touchDown(6, 256.60, 404.64);
            usleep(98895.79);
            touchUp(6, 256.60, 404.64);
            usleep(2099745.08);

            touchDown(5, 228.88, 554.31);
            usleep(66675.67);
            touchUp(5, 228.88, 554.31);
            usleep(935044.50);

            touchDown(3, 354.10, 1224.24);
            usleep(32988.71);
            touchMove(3, 353.07, 1208.98);
            usleep(17090.29);
            touchMove(3, 353.07, 1193.69);
            usleep(16338.29);
            touchMove(3, 354.10, 1176.39);
            usleep(16623.96);
            touchMove(3, 357.18, 1151.96);
            usleep(17051.83);
            touchMove(3, 362.31, 1118.36);
            usleep(16249.50);
            touchMove(3, 369.50, 1071.52);
            usleep(16687.75);
            touchMove(3, 378.73, 1013.49);
            usleep(16793.92);
            touchMove(3, 394.13, 937.13);
            usleep(16610.71);
            touchMove(3, 413.64, 867.89);
            usleep(16616.46);
            touchMove(3, 431.09, 818.02);
            usleep(16740.33);
            touchMove(3, 444.43, 779.32);
            usleep(16594.96);
            touchMove(3, 452.64, 749.78);
            usleep(16669.00);
            touchMove(3, 457.76, 732.48);
            usleep(16742.21);
            touchMove(3, 460.85, 719.25);
            usleep(16615.50);
            touchMove(3, 462.90, 712.13);
            usleep(16666.54);
            touchMove(3, 462.90, 708.06);
            usleep(16984.33);
            touchMove(3, 462.90, 707.04);
            usleep(16338.00);
            touchMove(3, 462.90, 706.02);
            usleep(16674.04);
            touchMove(3, 462.90, 703.97);
            usleep(16699.67);
            touchMove(3, 462.90, 699.89);
            usleep(16636.25);
            touchMove(3, 462.90, 696.84);
            usleep(16682.96);
            touchMove(3, 462.90, 693.79);
            usleep(16881.83);
            touchMove(3, 462.90, 689.72);
            usleep(16366.08);
            touchMove(3, 463.93, 686.66);
            usleep(16720.46);
            touchMove(3, 464.95, 683.61);
            usleep(16925.58);
            touchMove(3, 464.95, 681.57);
            usleep(16449.25);
            touchMove(3, 465.98, 679.54);
            usleep(16609.62);
            touchMove(3, 467.01, 676.49);
            usleep(16927.83);
            touchMove(3, 468.03, 671.40);
            usleep(16460.67);
            touchMove(3, 472.14, 662.24);
            usleep(16641.08);
            touchMove(3, 476.25, 652.06);
            usleep(16735.79);
            touchMove(3, 480.35, 639.83);
            usleep(16594.12);
            touchMove(3, 484.45, 626.59);
            usleep(16658.75);
            touchMove(3, 488.56, 614.38);
            usleep(16942.00);
            touchMove(3, 492.67, 602.17);
            usleep(16379.25);
            touchMove(3, 495.75, 589.94);
            usleep(16701.83);
            touchMove(3, 497.80, 578.74);
            usleep(16733.79);
            touchMove(3, 498.83, 568.56);
            usleep(16638.00);
            touchMove(3, 499.86, 561.44);
            usleep(16617.92);
            touchMove(3, 500.87, 554.31);
            usleep(16892.25);
            touchMove(3, 501.90, 548.21);
            usleep(16462.46);
            touchMove(3, 502.93, 543.12);
            usleep(16702.12);
            touchMove(3, 504.98, 540.06);
            usleep(16765.12);
            touchMove(3, 506.01, 536.99);
            usleep(16518.88);
            touchMove(3, 507.04, 533.94);
            usleep(16732.62);
            touchMove(3, 508.06, 531.90);
            usleep(16802.17);
            touchMove(3, 509.09, 528.85);
            usleep(16533.12);
            touchMove(3, 510.12, 526.81);
            usleep(16578.96);
            touchMove(3, 510.12, 524.78);
            usleep(16920.58);
            touchMove(3, 510.12, 522.74);
            usleep(16503.04);
            touchMove(3, 511.14, 519.69);
            usleep(16661.58);
            touchMove(3, 512.17, 515.62);
            usleep(16693.62);
            touchMove(3, 513.20, 509.51);
            usleep(16586.75);
            touchMove(3, 515.25, 502.39);
            usleep(16671.92);
            touchMove(3, 518.33, 492.21);
            usleep(16691.88);
            touchMove(3, 522.43, 480.99);
            usleep(16650.92);
            touchMove(3, 525.51, 471.83);
            usleep(16654.29);
            touchMove(3, 527.56, 463.69);
            usleep(17030.67);
            touchMove(3, 528.59, 457.59);
            usleep(16324.96);
            touchMove(3, 529.62, 453.51);
            usleep(16692.67);
            touchMove(3, 530.64, 449.44);
            usleep(17060.21);
            touchMove(3, 531.67, 446.39);
            usleep(16264.17);
            touchMove(3, 532.70, 443.34);
            usleep(16648.58);
            touchMove(3, 533.72, 440.28);
            usleep(16848.71);
            touchMove(3, 534.75, 437.23);
            usleep(16480.71);
            touchMove(3, 534.75, 435.19);
            usleep(16696.21);
            touchMove(3, 535.78, 433.16);
            usleep(16721.75);
            touchMove(3, 535.78, 431.12);
            usleep(16597.00);
            touchMove(3, 535.78, 429.09);
            usleep(16665.71);
            touchMove(3, 535.78, 428.05);
            usleep(16974.67);
            touchMove(3, 535.78, 426.01);
            usleep(16426.21);
            touchMove(3, 535.78, 425.00);
            usleep(16584.58);
            touchMove(3, 535.78, 423.98);
            usleep(16850.12);
            touchMove(3, 535.78, 422.96);
            usleep(16479.58);
            touchMove(3, 535.78, 421.94);
            usleep(16668.88);
            touchMove(3, 535.78, 420.93);
            usleep(416862.83);
            touchMove(3, 537.83, 420.93);
            usleep(15588.17);
            touchUp(3, 541.93, 417.87);
            usleep(1366558.96);

            touchDown(1, 273.02, 1203.89);
            usleep(100126.83);
            touchUp(1, 273.02, 1203.89);
            usleep(884541.21);

            touchDown(2, 346.92, 1217.12);
            usleep(49966.46);
            touchMove(2, 346.92, 1204.91);
            usleep(16550.50);
            touchMove(2, 346.92, 1199.80);
            usleep(16769.46);
            touchMove(2, 346.92, 1193.69);
            usleep(16574.21);
            touchMove(2, 346.92, 1186.57);
            usleep(16725.71);
            touchMove(2, 346.92, 1178.43);
            usleep(16889.33);
            touchMove(2, 346.92, 1167.23);
            usleep(16444.92);
            touchMove(2, 346.92, 1154.00);
            usleep(16610.79);
            touchMove(2, 346.92, 1141.77);
            usleep(16714.54);
            touchMove(2, 347.95, 1129.55);
            usleep(16634.00);
            touchMove(2, 349.99, 1115.30);
            usleep(16694.21);
            touchMove(2, 352.05, 1096.98);
            usleep(16653.50);
            touchMove(2, 355.13, 1079.66);
            usleep(16612.62);
            touchMove(2, 358.21, 1061.34);
            usleep(16655.04);
            touchMove(2, 361.29, 1044.04);
            usleep(16740.42);
            touchMove(2, 365.40, 1024.68);
            usleep(16640.79);
            touchMove(2, 370.53, 1001.27);
            usleep(16564.21);
            touchMove(2, 374.63, 976.83);
            usleep(16997.92);
            touchMove(2, 378.73, 952.40);
            usleep(16533.92);
            touchMove(2, 383.87, 927.97);
            usleep(16561.71);
            touchMove(2, 389.00, 901.49);
            usleep(16635.08);
            touchMove(2, 396.18, 874.01);
            usleep(16715.71);
            touchMove(2, 403.37, 847.53);
            usleep(16638.00);
            touchMove(2, 411.58, 825.14);
            usleep(16842.08);
            touchMove(2, 416.71, 805.78);
            usleep(16568.75);
            touchMove(2, 421.84, 786.44);
            usleep(16625.00);
            touchMove(2, 428.01, 768.12);
            usleep(16695.88);
            touchMove(2, 432.11, 755.89);
            usleep(16643.92);
            touchMove(2, 434.17, 744.70);
            usleep(16683.04);
            touchMove(2, 436.21, 736.55);
            usleep(16927.54);
            touchMove(2, 437.24, 725.36);
            usleep(16384.50);
            touchMove(2, 438.26, 713.15);
            usleep(16660.62);
            touchMove(2, 440.32, 697.86);
            usleep(16730.08);
            touchMove(2, 442.37, 685.65);
            usleep(16612.96);
            touchMove(2, 443.40, 672.41);
            usleep(16730.75);
            touchMove(2, 444.43, 659.18);
            usleep(16904.92);
            touchMove(2, 446.48, 643.90);
            usleep(16358.92);
            touchMove(2, 449.56, 627.61);
            usleep(16671.75);
            touchMove(2, 451.61, 612.35);
            usleep(16990.54);
            touchMove(2, 453.67, 599.12);
            usleep(16344.04);
            touchMove(2, 454.69, 588.92);
            usleep(16662.46);
            touchMove(2, 455.72, 580.78);
            usleep(16874.17);
            touchMove(2, 456.75, 575.69);
            usleep(16523.33);
            touchMove(2, 457.76, 570.60);
            usleep(16653.50);
            touchMove(2, 457.76, 568.56);
            usleep(16689.29);
            touchMove(2, 457.76, 567.54);
            usleep(16626.12);
            touchMove(2, 457.76, 566.53);
            usleep(450086.00);
            touchMove(2, 458.79, 566.53);
            usleep(15705.21);
            touchUp(2, 462.90, 567.54);
            usleep(1099832.38);

            touchDown(1, 292.52, 1141.77);
            usleep(84552.33);
            touchUp(1, 292.52, 1141.77);
            at.usleep(1000000);

            this.AtHelper.thongBao("Input Dia Chi: " + this.address);

            at.touchDown(0, 222, 515)
            at.usleep(50000)
            at.touchUp(0, 222, 515)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.address);
            at.usleep(2000000);

            at.touchDown(0, 374, 847)
            at.usleep(50000)
            at.touchUp(0, 374, 847)
            at.usleep(1000000);
        }
    }

    regAccTiki() {

        this.AtHelper.thongBao('run App Tiki');
        at.appRun("vn.tiki.app.Tiki");
        at.usleep(10000000);

        const find_iconX = this.findMau(639, 299, 16777215, 3);
        if (find_iconX.success == true) {
            at.touchDown(0, find_iconX.data.x, find_iconX.data.y)
            at.usleep(50000)
            at.touchUp(0, find_iconX.data.x, find_iconX.data.y)
            at.usleep(1000000);

            this.AtHelper.thongBao("Click Icon Ca Nhan");
            at.touchDown(0, 670, 1281)
            at.usleep(50000)
            at.touchUp(0, 670, 1281)
            at.usleep(2000000);

            this.AtHelper.thongBao("Click DangNhap/DangKy");
            at.touchDown(0, 290, 256)
            at.usleep(50000)
            at.touchUp(0, 290, 256)
            at.usleep(1000000);

            this.AtHelper.thongBao("Reg Acc Tiki");
            at.usleep(1000000);

            this.AtHelper.thongBao(`Get sim: `);
            this.createService(30);

            this.AtHelper.delayCus(5);





            //click and input phoneNumber
            at.touchDown(0, 244, 609)
            at.usleep(50000)
            at.touchUp(0, 244, 609)
            at.usleep(1000000);

            this.AtHelper.thongBao("Reg sdt: " + this.phoneNumber);
            this.AtHelper.inputTextCustom("0" + this.phoneNumber);
            at.usleep(2000000);


            this.AtHelper.thongBao("Click btn Tiep Tuc");
            //click btn TiepTuc
            const optionBtnTiepTuc = {
                colors: [ // REQUIRED, colors and their relative positions
                    { color: 16728654, x: 0, y: 0 },
                    { color: 16728654, x: 3, y: 30 },
                    { color: 16728654, x: 30, y: 34 },
                    { color: 16728654, x: 25, y: 0 },
                    { color: 16777215, x: 18, y: 15 },
                    { color: 16777215, x: 19, y: 17 }
                ],
                count: 3, // OPTIONAL, default is 0, 0 means no limitation
                region: { x: 296.83, y: 786.97, width: 163.73, height: 60.21 }, // OPTIONAL, default is null, null means the whole screen
                debug: false,
            }
            const find_optionBtnTiepTuc = this.AtHelper.findToaDo(optionBtnTiepTuc, 2);
            if (find_optionBtnTiepTuc.success == true) {
                at.usleep(1000000);
                at.tap(find_optionBtnTiepTuc.data.x, find_optionBtnTiepTuc.data.y);
            }
            else {
                at.touchDown(0, 381, 806)
                at.usleep(50000)
                at.touchUp(0, 381, 806)
            }

            this.inputOTP();
        }


    }

    inputOTP() {
        //input OTP
        at.toast('Cho lay ma otp');
        at.usleep(5000000);
        this.loopGetCode();
        at.usleep(2000000);
        if (this.otp != '') {
            console.log(this.otp);
            this.AtHelper.inputTextCustom(this.otp);
            at.usleep(3000000);

        }

    }

    regAccTikiB2() {

        const find_btnTaoTK = this.findMau(379, 822, 16728654, 2);
        if (find_btnTaoTK.success == true) {
            this.AtHelper.thongBao("Input HoTen: " + this.fullName);

            at.touchDown(0, 138, 330)
            at.usleep(50000)
            at.touchUp(0, 138, 330)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.fullName + "MM");
            at.usleep(1000000);

            this.AtHelper.thongBao("Input PWD: " + this.password);
            at.touchDown(0, 157, 600)
            at.usleep(50000)
            at.touchUp(0, 157, 600)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.password);
            at.usleep(1000000);

            at.touchDown(0, find_btnTaoTK.data.x, find_btnTaoTK.data.y);
            at.usleep(50000);
            at.touchUp(0, find_btnTaoTK.data.x, find_btnTaoTK.data.y);
            at.usleep(1000000);
        }




    }

    dienDiaChiTiki() {
        this.AtHelper.thongBao("Dien Dia Chi Tiki");
        at.usleep(1000000);

        //input ho ten
        this.AtHelper.thongBao("Input HoTen: " + this.fullName);

        at.touchDown(0, 201, 218)
        at.usleep(50000)
        at.touchUp(0, 201, 218)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.fullName + "MM");
        at.usleep(2000000);

        //input sdt
        this.AtHelper.thongBao("Input sdt: " + this.phoneNumber);

        at.touchDown(0, 182, 363)
        at.usleep(50000)
        at.touchUp(0, 182, 363)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.phoneNumber);
        at.usleep(2000000);

        //input dia chi
        this.AtHelper.thongBao("Input dia chi: " + this.address);

        at.touchDown(0, 198, 521)
        at.usleep(50000)
        at.touchUp(0, 198, 521)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.address);
        at.usleep(2000000);

        //input dia chi
        this.AtHelper.thongBao("Tinh/ThanhPho");

        at.touchDown(0, 169, 672)
        at.usleep(50000)
        at.touchUp(0, 169, 672)
        at.usleep(1000000);

        this.AtHelper.thongBao("Click HCM");
        at.touchDown(0, 183, 372)
        at.usleep(50000)
        at.touchUp(0, 183, 372)
        at.usleep(1000000);

        this.AtHelper.thongBao("Click Quan 10");
        at.touchDown(0, 137, 1249)
        at.usleep(50000)
        at.touchUp(0, 137, 1249)
        at.usleep(1000000);

        this.AtHelper.thongBao("vuot xuong");
        at.touchDown(1, 495.75, 984.99);
        at.usleep(16656.38);
        at.touchMove(1, 495.75, 959.52);
        at.usleep(16552.54);
        at.touchMove(1, 495.75, 913.71);
        at.usleep(16776.71);
        at.touchMove(1, 507.04, 835.32);
        at.usleep(16650.08);
        at.touchMove(1, 534.75, 737.57);
        at.usleep(16674.38);
        at.touchMove(1, 568.62, 641.86);
        at.usleep(15461.83);
        at.touchUp(1, 572.73, 637.79);

        at.usleep(1000000);
        this.AtHelper.thongBao("Click Phuong 13");
        at.touchDown(0, 181, 1088)
        at.usleep(50000)
        at.touchUp(0, 181, 1088)
        at.usleep(1000000);

    }

    dienDiaChiTikiTH2() {
        const find_btnGiao = this.findMau(356, 1267, 16728654, 2);
        if (find_btnGiao.success == true) {

            this.AtHelper.thongBao("Dien Dia Chi Tiki");
            at.usleep(1000000);

            //input ho ten
            this.AtHelper.thongBao("Input HoTen: " + this.fullName);

            at.touchDown(0, 218, 286)
            at.usleep(50000)
            at.touchUp(0, 218, 286)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.fullName + "MM");
            at.usleep(2000000);

            //input sdt
            this.AtHelper.thongBao("Input SDT: " + this.phoneNumber);

            at.touchDown(0, 218, 439)
            at.usleep(50000)
            at.touchUp(0, 218, 439)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.phoneNumber);
            at.usleep(2000000);

            //input diachi
            this.AtHelper.thongBao("Input Dia chi: 79/8 to hien thanh");

            at.touchDown(0, 252, 588)
            at.usleep(50000)
            at.touchUp(0, 252, 588)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom("79/8 to hien thanh");
            at.usleep(2000000);

            appActivate("vn.tiki.app.Tiki");


            touchDown(6, 416.71, 735.54);
            usleep(133306.50);
            touchUp(6, 416.71, 735.54);
            usleep(2251357.67);

            touchDown(5, 239.15, 358.82);
            usleep(116761.21);
            touchUp(5, 239.15, 358.82);
            usleep(2149934.50);

            touchDown(1, 246.33, 1261.92);
            usleep(548970.17);
            touchUp(1, 246.33, 1261.92);
            usleep(1600268.08);

            touchDown(3, 339.73, 1157.05);
            usleep(67483.33);
            touchMove(3, 347.95, 1124.46);
            usleep(16768.50);
            touchMove(3, 347.95, 1113.27);
            usleep(16825.96);
            touchMove(3, 349.99, 1100.04);
            usleep(16423.92);
            touchMove(3, 354.10, 1082.71);
            usleep(16751.25);
            touchMove(3, 357.18, 1065.41);
            usleep(16779.25);
            touchMove(3, 360.26, 1048.11);
            usleep(16564.46);
            touchMove(3, 363.34, 1031.81);
            usleep(16634.04);
            touchMove(3, 366.42, 1014.50);
            usleep(16800.88);
            touchMove(3, 369.50, 997.20);
            usleep(16503.50);
            touchMove(3, 371.56, 979.88);
            usleep(16702.67);
            touchMove(3, 374.63, 961.56);
            usleep(16780.38);
            touchMove(3, 378.73, 944.26);
            usleep(16573.50);
            touchMove(3, 381.82, 926.96);
            usleep(16645.83);
            touchMove(3, 384.90, 908.62);
            usleep(16740.58);
            touchMove(3, 387.98, 890.30);
            usleep(16612.33);
            touchMove(3, 392.07, 874.01);
            usleep(16690.75);
            touchMove(3, 396.18, 855.67);
            usleep(16728.75);
            touchMove(3, 398.24, 836.34);
            usleep(16586.29);
            touchMove(3, 403.37, 817.00);
            usleep(16807.42);
            touchMove(3, 408.50, 792.55);
            usleep(16637.67);
            touchMove(3, 413.64, 768.12);
            usleep(16551.62);
            touchMove(3, 419.79, 742.66);
            usleep(16675.33);
            touchMove(3, 426.98, 715.18);
            usleep(16836.08);
            touchMove(3, 433.14, 688.70);
            usleep(16535.21);
            touchMove(3, 438.26, 669.36);
            usleep(16705.12);
            touchMove(3, 443.40, 647.97);
            usleep(16760.25);
            touchMove(3, 447.51, 627.61);
            usleep(16503.00);
            touchMove(3, 451.61, 609.29);
            usleep(16781.88);
            touchMove(3, 455.72, 589.94);
            usleep(16822.50);
            touchMove(3, 459.82, 571.62);
            usleep(16394.83);
            touchMove(3, 464.95, 554.31);
            usleep(16795.79);
            touchMove(3, 468.03, 538.01);
            usleep(16788.33);
            touchMove(3, 472.14, 521.72);
            usleep(16411.83);
            touchMove(3, 476.25, 505.44);
            usleep(16682.88);
            touchMove(3, 482.40, 488.14);
            usleep(16873.25);
            touchMove(3, 487.53, 470.82);
            usleep(16466.42);
            touchMove(3, 493.70, 453.51);
            usleep(16736.33);
            touchMove(3, 498.83, 436.21);
            usleep(16824.08);
            touchMove(3, 501.90, 425.00);
            usleep(16473.54);
            touchMove(3, 504.98, 414.82);
            usleep(16645.92);
            touchMove(3, 507.04, 407.69);
            usleep(16776.92);
            touchMove(3, 508.06, 403.62);
            usleep(16554.46);
            touchMove(3, 509.09, 400.57);
            usleep(16679.12);
            touchMove(3, 510.12, 398.53);
            usleep(16833.33);
            touchMove(3, 510.12, 397.52);
            usleep(150159.08);
            touchUp(3, 515.25, 390.39);
            usleep(1615411.21);

            touchDown(2, 268.91, 1092.91);
            usleep(466574.42);
            touchUp(2, 268.91, 1092.91);
            usleep(2968185.29);

            touchDown(4, 37.97, 1173.34);
            usleep(98635.04);
            touchUp(4, 37.97, 1173.34);
            at.usleep(2000000);

            this.AtHelper.thongBao("Click btn GiaoDenDiaChi");
            at.touchDown(0, find_btnGiao.data.x, find_btnGiao.data.y)
            at.usleep(50000)
            at.touchUp(0, find_btnGiao.data.x, find_btnGiao.data.y)
            at.usleep(1000000);


        }
    }

    inputInfoAndLoginLZD() {
        const checkFullScreen = this.AtHelper.checkFullScreenLZD();

        if (checkFullScreen.success == true) {
            //input Username
            this.AtHelper.thongBao("Click input username");
            at.touchDown(0, 267, 622)
            at.usleep(50000)
            at.touchUp(0, 267, 622)
            at.usleep(1000000);



            //inputText
            const usernameGmail = this.username;
            this.AtHelper.inputTextCustom(this.username);
            this.AtHelper.delayCus(2);

            //input Password
            this.AtHelper.thongBao("input password");
            at.touchDown(0, 303, 757)
            at.usleep(50000)
            at.touchUp(0, 303, 757)
            at.usleep(1000000);

            this.AtHelper.inputTextCustom(this.password);
            this.AtHelper.delayCus(2);

            //icon keyboard Xong
            this.AtHelper.thongBao("Click kb Xong");
            at.tap(665, 856);

            // option btnDangNhapFinal
            const optionBtnDangNhapFinal = {
                colors: [ // REQUIRED, colors and their relative positions
                    { color: 16673605, x: 0, y: 0 },
                    { color: 16738628, x: 6, y: 33 },
                    { color: 16734001, x: 66, y: 33 },
                    { color: 16735287, x: 49, y: 2 },
                    { color: 16777215, x: 38, y: 15 },
                    { color: 16777215, x: 38, y: 19 }
                ],
                count: 3, // OPTIONAL, default is 0, 0 means no limitation
                region: { x: 270.42, y: 797.54, width: 226.06, height: 69.72 }, // OPTIONAL, default is null, null means the whole screen
                debug: false,
            }
            const find_optionBtnDangNhapFinal = this.AtHelper.findToaDo(optionBtnDangNhapFinal, 3);
            if (find_optionBtnDangNhapFinal.success == true) {
                this.AtHelper.thongBao("Click btn DangNhap");
                at.tap(find_optionBtnDangNhapFinal.data.x, find_optionBtnDangNhapFinal.data.y);
            }
            else {
                at.tap(378, 831);
            }
            this.AtHelper.delayCus(2);
        } else {
            //input Username
            this.AtHelper.thongBao("Click input username");
            at.tap(225, 546);

            this.AtHelper.delayCus(2);
            at.tap(173, 540);

            this.AtHelper.delayCus(1);

            //inputText
            const usernameGmail = this.username;
            this.AtHelper.inputTextCustom(this.username);

            this.AtHelper.delayCus(2);

            //input Password
            this.AtHelper.thongBao("input password");
            at.tap(201, 681);

            this.AtHelper.delayCus(1);
            at.inputText(this.password);

            this.AtHelper.delayCus(2);

            //icon keyboard Xong
            this.AtHelper.thongBao("Click kb Xong");
            at.tap(665, 856);

            // option btnDangNhapFinal
            const optionBtnDangNhapFinal = {
                colors: [ // REQUIRED, colors and their relative positions
                    { color: 16673605, x: 0, y: 0 },
                    { color: 16738628, x: 6, y: 33 },
                    { color: 16734001, x: 66, y: 33 },
                    { color: 16735287, x: 49, y: 2 },
                    { color: 16777215, x: 38, y: 15 },
                    { color: 16777215, x: 38, y: 19 }
                ],
                count: 3, // OPTIONAL, default is 0, 0 means no limitation
                region: { x: 270.42, y: 797.54, width: 226.06, height: 69.72 }, // OPTIONAL, default is null, null means the whole screen
                debug: false,
            }
            const find_optionBtnDangNhapFinal = this.AtHelper.findToaDo(optionBtnDangNhapFinal, 3);
            if (find_optionBtnDangNhapFinal.success == true) {
                this.AtHelper.thongBao("Click btn DangNhap");
                at.tap(find_optionBtnDangNhapFinal.data.x, find_optionBtnDangNhapFinal.data.y);
            }
            else {
                at.tap(378, 831);
            }
            this.AtHelper.delayCus(2);
        }
    }

    openAppLZD() {
        this.AtHelper.thongBao('run App LZD');
        at.appRun("com.LazadaSEA.Lazada");
        at.usleep(2000000);

        const find_optionTiengViet = this.findMau(388, 1112, 15756574, 4);

        if (find_optionTiengViet.success == true) {
            at.touchDown(0, find_optionTiengViet.data.x, find_optionTiengViet.data.y);
            at.usleep(50000);
            at.touchUp(0, find_optionTiengViet.data.x, find_optionTiengViet.data.y);
            at.usleep(1000000);
        }
        else {
            at.touchDown(0, 382, 1117);
            at.usleep(50000);
            at.touchUp(0, 382, 1117);
            at.usleep(1000000);
        }

        this.AtHelper.thongBao("Click bo qua");
        at.tap(375, 1243);
        at.usleep(3000000);

    }

    loginLZD() {
        this.AtHelper.thongBao("Dang nhap LZD");
        at.appRun("com.LazadaSEA.Lazada");

        const find_colorDangNhapNgay = this.findMau(636, 1196, 16664928, 4);

        if (find_colorDangNhapNgay.success == true) {
            at.touchDown(0, find_colorDangNhapNgay.data.x, find_colorDangNhapNgay.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorDangNhapNgay.data.x, find_colorDangNhapNgay.data.y);
            at.usleep(1000000);
        } else {
            at.touchDown(0, 636, 1196);
            at.usleep(50000);
            at.touchUp(0, 636, 1196);

            at.usleep(1000000);
        }

        //click btn DangNhap
        this.AtHelper.thongBao("Thuc hien click btn Dang Nhap");

        const find_colorBtnDangNhap = this.findMau(375, 994, 16777215, 2);

        if (find_colorBtnDangNhap.success == true) {
            at.touchDown(0, find_colorBtnDangNhap.data.x, find_colorBtnDangNhap.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorBtnDangNhap.data.x, find_colorBtnDangNhap.data.y);
            at.usleep(1000000);
        }
        else {
            // at.touchDown(0, 375, 994);
            // at.usleep(50000);
            // at.touchUp(0, 375, 994);

            // at.usleep(1000000);

            // Truong hop 2
            const find_colorBtnDangNhapTH2 = this.findMau(382, 932, 15330807, 2);
            if (find_colorBtnDangNhapTH2.success == true) {
                at.touchDown(0, find_colorBtnDangNhapTH2.data.x, find_colorBtnDangNhapTH2.data.y);
                at.usleep(50000);
                at.touchUp(0, find_colorBtnDangNhapTH2.data.x, find_colorBtnDangNhapTH2.data.y);
                at.usleep(1000000);
            }
        }

        //click input username and password
        this.AtHelper.thongBao("Thuc hien dien thong tin dang nhap");
        const find_colorBtnDangNhap1 = this.findMau(376, 828, 16735543, 2);

        if (find_colorBtnDangNhap1.success == true) {
            at.touchDown(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y - 283);
            at.usleep(50000);
            at.touchUp(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y - 283);
            at.usleep(1000000);
        }
        else {
            // at.touchDown(0, 366, 548);
            // at.usleep(50000);
            // at.touchUp(0, 366, 548);

            // at.usleep(1000000);
            //Truong hop 2
            const find_colorBtnDangNhap1TH2 = this.findMau(262, 1269, 16544341, 2);
            if (find_colorBtnDangNhap1TH2.success == true) {
                at.touchDown(0, 228, 356);
                at.usleep(50000);
                at.touchUp(0, 228, 356);
                at.usleep(1000000);
            }
        }

        this.AtHelper.thongBao("Username: " + this.username);
        this.AtHelper.inputTextCustom(this.username);
        at.usleep(2000000);

        //click password
        if (find_colorBtnDangNhap1.success == true) {
            at.touchDown(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y - 140);
            at.usleep(50000);
            at.touchUp(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y - 140);
            at.usleep(1000000);
        }
        else {
            at.touchDown(0, 249, 477);
            at.usleep(50000);
            at.touchUp(0, 249, 477);

            at.usleep(1000000);
        }

        this.AtHelper.thongBao("Password: " + this.password);
        this.AtHelper.inputTextCustom(this.password);
        at.usleep(2000000);

        //clickBtn

        if (find_colorBtnDangNhap1.success == true) {
            this.AtHelper.thongBao("Click kb Xong");
            at.tap(665, 856);
            at.usleep(1000000);

            at.touchDown(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorBtnDangNhap1.data.x, find_colorBtnDangNhap1.data.y);
            at.usleep(1000000);
        }
        else {
            at.touchDown(0, 378, 835);
            at.usleep(50000);
            at.touchUp(0, 378, 835);
            at.usleep(1000000);
        }

    }

    diaChiTH1() {

        //click setting and them dia chi
        touchDown(3, 717.45, 77.82);
        usleep(116495.00);
        touchUp(3, 717.45, 77.82);
        usleep(2518258.08);

        touchDown(4, 188.85, 279.42);
        usleep(132006.62);
        touchUp(4, 188.85, 279.42);
        usleep(2900314.71);

        touchDown(5, 401.32, 239.70);
        usleep(49963.17);
        touchUp(5, 401.32, 239.70);

        this.AtHelper.thongBao("Input fullname: " + this.fullName);

        at.touchDown(0, 159, 285)
        at.usleep(50000)
        at.touchUp(0, 159, 285)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.fullName + " MM");
        at.usleep(2000000);

        //input dia chi
        this.AtHelper.thongBao("Input dia chi: " + this.address);

        at.touchDown(0, 171, 447)
        at.usleep(50000)
        at.touchUp(0, 171, 447)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.address);
        at.usleep(2000000);

        //dien hcm - q10 - p13
        this.AtHelper.thongBao("Nhap Quan Phuong");

        touchDown(1, 343.84, 600.13);
        usleep(50046.96);
        touchUp(1, 343.84, 600.13);
        usleep(2100113.21);

        touchDown(4, 213.49, 258.02);
        usleep(33200.04);
        touchUp(4, 213.49, 258.02);
        usleep(1967062.79);

        touchDown(5, 447.51, 1068.47);
        usleep(134568.38);
        touchMove(5, 450.59, 1059.31);
        usleep(16722.92);
        touchMove(5, 450.59, 1051.16);
        usleep(16400.83);
        touchMove(5, 450.59, 1038.95);
        usleep(16641.04);
        touchMove(5, 451.61, 1026.72);
        usleep(16694.58);
        touchMove(5, 452.64, 1014.50);
        usleep(16700.00);
        touchMove(5, 454.69, 1002.29);
        usleep(16598.46);
        touchMove(5, 455.72, 991.10);
        usleep(17001.92);
        touchMove(5, 456.75, 981.94);
        usleep(16323.92);
        touchMove(5, 457.76, 973.77);
        usleep(16716.83);
        touchMove(5, 458.79, 967.67);
        usleep(16876.79);
        touchMove(5, 458.79, 962.58);
        usleep(16397.75);
        touchMove(5, 458.79, 958.51);
        usleep(16694.46);
        touchMove(5, 459.82, 952.40);
        usleep(16749.54);
        touchMove(5, 460.85, 945.28);
        usleep(16606.42);
        touchMove(5, 461.87, 938.15);
        usleep(16634.88);
        touchMove(5, 462.90, 930.01);
        usleep(16685.96);
        touchMove(5, 463.93, 920.83);
        usleep(16711.17);
        touchMove(5, 465.98, 910.65);
        usleep(16556.25);
        touchMove(5, 467.01, 899.46);
        usleep(16953.83);
        touchMove(5, 470.09, 888.26);
        usleep(16400.33);
        touchMove(5, 472.14, 876.05);
        usleep(16714.58);
        touchMove(5, 474.19, 865.85);
        usleep(16806.71);
        touchMove(5, 475.22, 855.67);
        usleep(16578.79);
        touchMove(5, 476.25, 847.53);
        usleep(16619.54);
        touchMove(5, 477.28, 840.41);
        usleep(16775.04);
        touchMove(5, 478.29, 835.32);
        usleep(16553.42);
        touchMove(5, 479.32, 829.21);
        usleep(16674.75);
        touchMove(5, 479.32, 822.09);
        usleep(16847.42);
        touchMove(5, 480.35, 812.91);
        usleep(16483.42);
        touchMove(5, 481.37, 800.69);
        usleep(16700.79);
        touchMove(5, 482.40, 790.52);
        usleep(16877.50);
        touchMove(5, 484.45, 779.32);
        usleep(16406.04);
        touchMove(5, 485.48, 770.16);
        usleep(16678.71);
        touchMove(5, 486.51, 761.00);
        usleep(17053.96);
        touchMove(5, 487.53, 754.87);
        usleep(16295.67);
        touchMove(5, 487.53, 749.78);
        usleep(16654.38);
        touchMove(5, 488.56, 742.66);
        usleep(16816.58);
        touchMove(5, 489.59, 738.59);
        usleep(16537.83);
        touchMove(5, 489.59, 734.52);
        usleep(16664.33);
        touchMove(5, 490.61, 729.43);
        usleep(16809.67);
        touchMove(5, 491.64, 726.38);
        usleep(16545.00);
        touchMove(5, 491.64, 722.31);
        usleep(16702.12);
        touchMove(5, 492.67, 718.23);
        usleep(16920.96);
        touchMove(5, 493.70, 711.11);
        usleep(16361.83);
        touchMove(5, 494.72, 703.97);
        usleep(16691.46);
        touchMove(5, 494.72, 696.84);
        usleep(17094.08);
        touchMove(5, 495.75, 690.73);
        usleep(16195.04);
        touchMove(5, 496.78, 682.59);
        usleep(16663.58);
        touchMove(5, 497.80, 675.47);
        usleep(17001.79);
        touchMove(5, 497.80, 670.38);
        usleep(16360.38);
        touchMove(5, 497.80, 664.27);
        usleep(16655.04);
        touchMove(5, 497.80, 659.18);
        usleep(16742.38);
        touchMove(5, 497.80, 652.06);
        usleep(16624.71);
        touchMove(5, 498.83, 645.93);
        usleep(16625.17);
        touchMove(5, 498.83, 639.83);
        usleep(16772.46);
        touchMove(5, 498.83, 632.70);
        usleep(16580.21);
        touchMove(5, 499.86, 625.58);
        usleep(16665.92);
        touchMove(5, 500.87, 618.45);
        usleep(16750.79);
        touchMove(5, 501.90, 612.35);
        usleep(16600.42);
        touchMove(5, 501.90, 605.22);
        usleep(16644.88);
        touchMove(5, 502.93, 600.13);
        usleep(16709.25);
        touchMove(5, 502.93, 595.04);
        usleep(16614.04);
        touchMove(5, 502.93, 589.94);
        usleep(16689.46);
        touchMove(5, 502.93, 583.83);
        usleep(16909.58);
        touchMove(5, 502.93, 578.74);
        usleep(16444.62);
        touchMove(5, 502.93, 572.63);
        usleep(16631.88);
        touchMove(5, 502.93, 568.56);
        usleep(16961.54);
        touchMove(5, 502.93, 565.51);
        usleep(16419.88);
        touchMove(5, 502.93, 562.46);
        usleep(16649.67);
        touchMove(5, 502.93, 560.42);
        usleep(16871.58);
        touchMove(5, 502.93, 557.37);
        usleep(16440.17);
        touchMove(5, 502.93, 554.31);
        usleep(16707.17);
        touchMove(5, 502.93, 552.28);
        usleep(16925.12);
        touchMove(5, 502.93, 549.22);
        usleep(16370.92);
        touchMove(5, 502.93, 547.19);
        usleep(16726.08);
        touchMove(5, 502.93, 546.17);
        usleep(16685.58);
        touchMove(5, 502.93, 544.14);
        usleep(16601.08);
        touchMove(5, 502.93, 543.12);
        usleep(33565.21);
        touchMove(5, 502.93, 541.08);
        usleep(33253.21);
        touchMove(5, 503.95, 541.08);
        usleep(16781.50);
        touchMove(5, 503.95, 540.06);
        usleep(133193.88);
        touchMove(5, 504.98, 540.06);
        usleep(149745.88);
        touchMove(5, 509.09, 540.06);
        usleep(15503.79);
        touchUp(5, 513.20, 541.08);
        usleep(1267277.67);

        touchDown(2, 244.27, 1167.23);
        usleep(150927.17);
        touchUp(2, 244.27, 1167.23);
        usleep(1099070.33);

        touchDown(6, 415.68, 1048.11);
        usleep(84448.17);
        touchMove(6, 411.58, 1033.84);
        usleep(16493.79);
        touchMove(6, 411.58, 1025.70);
        usleep(16671.17);
        touchMove(6, 411.58, 1016.54);
        usleep(16591.54);
        touchMove(6, 412.61, 1005.34);
        usleep(16716.88);
        touchMove(6, 413.64, 996.18);
        usleep(16641.79);
        touchMove(6, 414.67, 987.02);
        usleep(16613.42);
        touchMove(6, 414.67, 979.88);
        usleep(16781.00);
        touchMove(6, 415.68, 972.76);
        usleep(16600.12);
        touchMove(6, 415.68, 966.65);
        usleep(16854.58);
        touchMove(6, 415.68, 960.54);
        usleep(16515.96);
        touchMove(6, 415.68, 953.42);
        usleep(16619.08);
        touchMove(6, 416.71, 947.31);
        usleep(17082.17);
        touchMove(6, 416.71, 942.22);
        usleep(16343.08);
        touchMove(6, 417.74, 937.13);
        usleep(16548.08);
        touchMove(6, 418.76, 933.06);
        usleep(16877.50);
        touchMove(6, 418.76, 928.99);
        usleep(16522.00);
        touchMove(6, 419.79, 924.90);
        usleep(16624.67);
        touchMove(6, 419.79, 921.85);
        usleep(16872.38);
        touchMove(6, 419.79, 917.78);
        usleep(16531.38);
        touchMove(6, 420.82, 912.69);
        usleep(16574.33);
        touchMove(6, 420.82, 908.62);
        usleep(16866.50);
        touchMove(6, 420.82, 905.56);
        usleep(16590.92);
        touchMove(6, 420.82, 900.47);
        usleep(16581.62);
        touchMove(6, 421.84, 896.40);
        usleep(16861.33);
        touchMove(6, 421.84, 889.28);
        usleep(16710.88);
        touchMove(6, 421.84, 884.19);
        usleep(16412.58);
        touchMove(6, 421.84, 879.10);
        usleep(16884.58);
        touchMove(6, 421.84, 874.01);
        usleep(16514.88);
        touchMove(6, 421.84, 868.90);
        usleep(16644.33);
        touchMove(6, 422.87, 863.81);
        usleep(16901.71);
        touchMove(6, 423.90, 857.71);
        usleep(16470.83);
        touchMove(6, 424.92, 850.58);
        usleep(16605.08);
        touchMove(6, 425.95, 841.42);
        usleep(16860.88);
        touchMove(6, 426.98, 833.28);
        usleep(16537.04);
        touchMove(6, 428.01, 825.14);
        usleep(16589.33);
        touchMove(6, 429.03, 818.02);
        usleep(16654.00);
        touchMove(6, 430.06, 810.87);
        usleep(16734.83);
        touchMove(6, 430.06, 805.78);
        usleep(16600.21);
        touchMove(6, 430.06, 799.68);
        usleep(16791.17);
        touchMove(6, 431.09, 794.59);
        usleep(16632.96);
        touchMove(6, 431.09, 790.52);
        usleep(16596.42);
        touchMove(6, 432.11, 786.44);
        usleep(16683.42);
        touchMove(6, 433.14, 782.37);
        usleep(16731.67);
        touchMove(6, 433.14, 780.34);
        usleep(16602.83);
        touchMove(6, 433.14, 777.28);
        usleep(16823.75);
        touchMove(6, 434.17, 774.23);
        usleep(16621.38);
        touchMove(6, 434.17, 771.18);
        usleep(16543.88);
        touchMove(6, 434.17, 768.12);
        usleep(16676.83);
        touchMove(6, 435.18, 765.07);
        usleep(16660.25);
        touchMove(6, 435.18, 761.00);
        usleep(16676.17);
        touchMove(6, 435.18, 755.89);
        usleep(16763.29);
        touchMove(6, 435.18, 751.82);
        usleep(16858.12);
        touchMove(6, 435.18, 748.77);
        usleep(16408.08);
        touchMove(6, 435.18, 744.70);
        usleep(16623.46);
        touchMove(6, 435.18, 740.62);
        usleep(16764.92);
        touchMove(6, 435.18, 737.57);
        usleep(16639.96);
        touchMove(6, 435.18, 733.50);
        usleep(16639.58);
        touchMove(6, 435.18, 730.45);
        usleep(16730.46);
        touchMove(6, 435.18, 727.39);
        usleep(16602.88);
        touchMove(6, 435.18, 724.34);
        usleep(16594.25);
        touchMove(6, 436.21, 723.32);
        usleep(16811.46);
        touchMove(6, 436.21, 721.29);
        usleep(16600.75);
        touchMove(6, 437.24, 720.27);
        usleep(33352.58);
        touchMove(6, 437.24, 719.25);
        usleep(483499.25);
        touchMove(6, 442.37, 714.16);
        usleep(15368.83);
        touchUp(6, 446.48, 710.09);
        usleep(1733475.71);

        touchDown(3, 353.07, 1152.98);
        usleep(83477.38);
        touchUp(3, 353.07, 1152.98);
        at.usleep(2000000);


        //vuot xuong
        touchDown(5, 513.20, 636.77);
        usleep(66741.33);
        touchMove(5, 510.12, 626.59);
        usleep(16722.88);
        touchMove(5, 510.12, 615.40);
        usleep(16658.33);
        touchMove(5, 510.12, 592.99);
        usleep(16772.46);
        touchMove(5, 513.20, 566.53);
        usleep(16713.58);
        touchMove(5, 516.28, 539.03);
        usleep(16356.67);
        touchMove(5, 518.33, 511.55);
        usleep(16826.79);
        touchMove(5, 520.37, 485.09);
        usleep(16737.00);
        touchMove(5, 525.51, 453.51);
        usleep(16630.96);
        touchMove(5, 531.67, 431.12);
        usleep(16602.79);
        touchMove(5, 534.75, 413.80);
        usleep(15609.54);
        touchUp(5, 538.86, 409.73);
        usleep(901156.33);

        touchDown(6, 530.64, 625.58);
        usleep(50106.96);
        touchMove(6, 532.70, 611.33);
        usleep(16787.46);
        touchMove(6, 533.72, 587.90);
        usleep(16415.33);
        touchMove(6, 542.96, 545.15);
        usleep(16636.25);
        touchMove(6, 554.25, 492.21);
        usleep(16844.33);
        touchMove(6, 569.64, 433.16);
        usleep(16560.62);
        touchMove(6, 593.25, 364.93);
        usleep(16651.83);
        touchMove(6, 614.81, 320.15);
        usleep(15492.71);
        touchUp(6, 618.92, 316.06);
        at.usleep(1000000);

        //input sdt
        this.AtHelper.thongBao("Input sdt: " + this.phoneNumber);

        at.touchDown(0, 224, 221)
        at.usleep(50000)
        at.touchUp(0, 224, 221)
        at.usleep(1000000);

        this.AtHelper.inputTextCustom(this.phoneNumber);
        at.usleep(2000000);

        //click 2 button
        this.AtHelper.thongBao("Click dia chi mac dinh");
        const find_colorAddressDefault = this.findMau(695, 612, 15329771, 3);

        if (find_colorAddressDefault.success == true) {
            at.touchDown(0, find_colorAddressDefault.data.x, find_colorAddressDefault.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorAddressDefault.data.x, find_colorAddressDefault.data.y);
            at.usleep(1000000);

        }
        else {
            at.touchDown(0, 695, 612);
            at.usleep(50000);
            at.touchUp(0, 695, 612);
            at.usleep(1000000);
        }

        this.AtHelper.thongBao("Click thanh toan mac dinh");
        const find_colorPaymentDefault = this.findMau(694, 713, 15329771, 3);

        if (find_colorPaymentDefault.success == true) {
            at.touchDown(0, find_colorPaymentDefault.data.x, find_colorPaymentDefault.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorPaymentDefault.data.x, find_colorPaymentDefault.data.y);
            at.usleep(1000000);

        }
        else {
            at.touchDown(0, 695, 713);
            at.usleep(50000);
            at.touchUp(0, 695, 713);
            at.usleep(1000000);
        }

        //click btn Luu
        this.AtHelper.thongBao("Click btn Luu");
        const find_colorBtnLuu = this.findMau(351, 838, 16777215, 3);

        if (find_colorBtnLuu.success == true) {
            at.touchDown(0, find_colorBtnLuu.data.x, find_colorBtnLuu.data.y);
            at.usleep(50000);
            at.touchUp(0, find_colorBtnLuu.data.x, find_colorBtnLuu.data.y);
            at.usleep(2000000);
        }
        else {
            at.touchDown(0, 351, 838);
            at.usleep(50000);
            at.touchUp(0, 351, 838);
            at.usleep(2000000);
        }
        //click btn Luu
        at.touchDown(0, 367, 1271);
        at.usleep(50000);
        at.touchUp(0, 367, 1271);
    }

    suuTamVoucher() {
        touchDown(5, 737.97, 447.41);
        usleep(150040.04);
        touchUp(5, 737.97, 447.41);
        usleep(2951694.25);

        touchDown(3, 227.85, 586.88);
        usleep(299708.88);
        touchUp(3, 227.85, 586.88);
        usleep(3233931.04);

        touchDown(1, 585.04, 578.74);
        usleep(114944.46);
        touchUp(1, 585.04, 578.74);
        usleep(3133964.33);

        touchDown(2, 224.77, 854.65);
        usleep(116287.54);
        touchUp(2, 224.77, 854.65);

    }

    dienMatKhauChuyenTienZLP() {
        touchDown(2, 377.71, 1243.58);
        usleep(80699.46);
        touchUp(2, 377.71, 1243.58);
        usleep(1683403.67);

        touchDown(1, 157.04, 969.70);
        usleep(117808.04);
        touchUp(1, 157.04, 969.70);
        usleep(150078.79);

        touchDown(1, 152.93, 964.61);
        usleep(82171.92);
        touchUp(1, 152.93, 964.61);
        usleep(818202.75);

        touchDown(5, 374.63, 958.51);
        usleep(132925.17);
        touchUp(5, 374.63, 958.51);
        usleep(166649.83);

        touchDown(5, 377.71, 952.40);
        usleep(100418.25);
        touchUp(5, 377.71, 952.40);
        usleep(666939.17);

        touchDown(4, 635.34, 942.22);
        usleep(116286.17);
        touchUp(4, 635.34, 942.22);
        usleep(99928.54);

        touchDown(4, 639.44, 940.19);
        usleep(98893.38);
        touchUp(4, 639.44, 940.19);
    }
    dienMatKhauZLP() {
        touchDown(1, 160.11, 951.38);
        usleep(133320.21);
        touchUp(1, 160.11, 951.38);
        usleep(184360.50);

        touchDown(1, 158.05, 957.49);
        usleep(83486.00);
        touchUp(1, 158.05, 957.49);
        usleep(416634.83);

        touchDown(5, 389.00, 942.22);
        usleep(115382.92);
        touchUp(5, 389.00, 942.22);
        usleep(151276.33);

        touchDown(5, 390.03, 946.29);
        usleep(82065.75);
        touchUp(5, 390.03, 946.29);
        usleep(468330.12);

        touchDown(4, 618.92, 943.24);
        usleep(131931.33);
        touchUp(4, 618.92, 943.24);
        usleep(151129.79);

        touchDown(4, 622.00, 946.29);
        usleep(65353.96);
        touchUp(4, 622.00, 946.29);
        usleep(1200223.54);

        touchDown(1, 163.19, 949.35);
        usleep(134371.12);
        touchUp(1, 163.19, 949.35);
        usleep(183347.79);

        touchDown(1, 167.30, 958.51);
        usleep(83445.04);
        touchUp(1, 167.30, 958.51);
        usleep(600253.46);

        touchDown(5, 387.98, 949.35);
        usleep(148530.71);
        touchUp(5, 387.98, 949.35);
        usleep(234844.29);

        touchDown(5, 404.40, 949.35);
        usleep(132036.54);
        touchUp(5, 404.40, 949.35);
        usleep(618098.04);

        touchDown(4, 604.55, 952.40);
        usleep(116563.21);
        touchUp(4, 604.55, 952.40);
        usleep(133038.42);

        touchDown(4, 601.47, 954.44);
        usleep(98990.75);
        touchUp(4, 601.47, 954.44);
    }

}

module.exports = DataAccountModel;