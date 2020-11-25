const localStrategy = require('passport-local').Strategy;
const userModel = require('../models/UserModel');
const LocalStrategy = require('passport-local').Strategy;
module.exports = passport => {
  // passport.serializeUser(userModel.createStrategy());

  // passport.deserializeUser(userModel.se)

  // passport.use(new localStrategy({passReqToCallback: true},((req, username, password, done) =>{

  //   userModel.findOne({username:username}, (err,user)=>{
  //     if (err) done(err);

  //     if (!user){
  //       done(null, false); //Chung thuc loi
  //     } else if (user){
  //       var validPassword = user.comparePassword(password);

  //       if (!validPassword)
  //       {
  //         done(null,false); //Chung thuc loi
  //       }
  //       else{
  //         done(null,username);
  //       }
  //     }
  //   });
  // })));

  passport.use(new LocalStrategy({passReqToCallback:true},
    function(req,username, password, done) {
      userModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, req.flash('loginMsg', 'User not actived'), req.flash('usernameDefault',username)); }
        if (!user.comparePassword(password)) { return done(null, false, req.flash('loginMsg','Wrong password!'), req.flash('usernameDefault',username)); }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(userModel.serializeUser());
  passport.deserializeUser(userModel.deserializeUser());
};
