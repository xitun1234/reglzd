const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  DataAccountSchema = new Schema({
    fullName: {type:String},
    phoneNumber: {type:String},
    address: {type:String},
    gmail:{type:String},
    deviceName: {type:String},
    username: {type:String},
    password: {type:String},
    twoFA: {type:String},
    owner: {type:String},
    link: {type:String},
    mail: {type:String},
    passMail: {type:String},
    isLoginFB: {type:Boolean,default: false},
    isRegLZD: {type:Boolean, default: false},
});

const DataAccount = mongoose.model('DataAccount', DataAccountSchema, 'infoacc');
module.exports = DataAccount;