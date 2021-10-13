const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  CauHinhFakeSchema = new Schema({
    appVersion: {type:String},
    isFakeAppRandom: {type:Boolean},
    CFBundleIdentifier: {type:String},
    owner: {type:String},
});

const CauHinhFake = mongoose.model('CauHinhFake', CauHinhFakeSchema, 'cauhinhfake');
module.exports = CauHinhFake;