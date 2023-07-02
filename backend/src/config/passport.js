const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;

const User = require('../models/user')
const Provider = require('../models/provider')



module.exports = async function(passport){
    passport.use('userStrategy',new LocalStrategy(User.authenticate()));
    passport.use('providerStrategy',new LocalStrategy(Provider.authenticate()));
}

passport.serializeUser((user, done) => {
    let type;
    if (user.role === 'user') {
        type = 'user';
    } else  {
        type = 'provider';
    }

    done(null, {id: user.id, type});
});

passport.deserializeUser((key, done) => {
    if(key.type === 'user'){
        User.findById(key.id, function(err, user) {
          done(err, user);
        });
      } else {
        Provider.findById(key.id, function(err, user) {
          done(err, user);
        });
      }
});