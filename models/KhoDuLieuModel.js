const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KhoDuLieuSchema = new Schema({
    username: {type:String},
    password: {type:String},
    isGet: {type: Boolean},
    address: {type:String},
    fullName: {type:String},
    phoneNumber: {type:String},
    twoFA: {type:String},
    
    status: {type:String},
    created:{type:Date, default:Date.now}
});

const KhoDuLieu = mongoose.model('KhoDuLieu',KhoDuLieuSchema,'khodulieu');
module.exports = KhoDuLieu;