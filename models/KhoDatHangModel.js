const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KhoDuLieuDatHangSchema = new Schema({
    username: {type:String},
    password: {type:String},
    address : {type:String},
    phoneNumber: {type:String},
    isGet: {type: Boolean},
    deviceName: {type:String, default: ""},
    status: {type:String,default: ""},
    owner: {type:String},
    created:{type:Date, default:Date.now}
});

const KhoDuLieuDatHang = mongoose.model('KhoDuLieuDatHang',KhoDuLieuDatHangSchema,'khodulieudathang');
module.exports = KhoDuLieuDatHang;