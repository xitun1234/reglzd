const moongose = require('mongoose');
const Schema = moongose.Schema;
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const NapTienSchema = new Schema({
    deviceName: {type: String},
    phoneNumber: {type: String},
    noiDung: {type: String},
    created:{type:Date, default:dateThailand}
});

const NapTien = moongose.model('NapTien', NapTienSchema, 'naptiens');
module.exports = NapTien;