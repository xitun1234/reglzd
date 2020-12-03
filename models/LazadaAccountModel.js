const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    username: {type:String},
    password: {type:String},
    phone: {type:String},
    deviceName: {type:String},
    ipAddr: {type:String},

    status: {type:Boolean},
    isRestore: {type:Boolean},
    isBackUp: {type:Boolean},
    isVeryPhone: {type:Boolean},
    created:{type:Date, default:Date.now}
});

const Account = mongoose.model('Account',AccountSchema,'accounts');
module.exports = Account;