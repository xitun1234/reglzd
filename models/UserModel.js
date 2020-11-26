const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto')
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username:{type:String,unique:true, lowercase:true},
    password:{type:String},
    fullname:{type:String},
    created:{type:Date, default: Date.now}
});

UserSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err,hash){
        if (err) return next(err);

        user.password = hash;
        next();
    });

});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',UserSchema);