const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {type:String},
    passwordLZD: {type:String},
    passwordGmail:{type:String},
    phoneNumber: {type:String},
    deviceName: {type:String},
    twoFA: {type:String},
    status: {type:Boolean},
    owner: {type:String},
    created:{type:Date, default:Date.now},
    mail: {type:String},
    passMail: {type:String}
});

const Account = mongoose.model('Account',AccountSchema,'accounts');
module.exports = Account;