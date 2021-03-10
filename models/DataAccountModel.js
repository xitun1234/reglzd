const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  DataAccountSchema = new Schema({
    fullName: {type:String},
    phoneNumber: {type:String},
    address: {type:String},
    deviceName: {type:String},
});

const DataAccount = mongoose.model('DataAccount', DataAccountSchema, 'infoacc');
module.exports = DataAccount;