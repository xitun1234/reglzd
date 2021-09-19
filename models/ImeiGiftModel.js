const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  ImeiGiftSchema = new Schema({
    imei: {type:String},
    model: {type:String},
    ngayKichHoat: {type:String},
    content: {type:String},
});

const ImeiGift = mongoose.model('ImeiGift', ImeiGiftSchema, 'imeigift');
module.exports = ImeiGift;