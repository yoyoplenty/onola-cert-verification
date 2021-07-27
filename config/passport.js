//Bring in the model
let Admin = require('../models/Admin')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            //match student
            Admin.findOne({ email: email })
                .then(admin => {
                    if (!admin) {
                        return done(null, false,
                            {
                                message: "This email is not registered"
                            });
                    }
                    //match password
                    bcrypt.compare(password, admin.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, admin);
                        } else {
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
        })
    );
    passport.serializeUser((admin, done) => {
        done(null, admin.id);
    });

    passport.deserializeUser((id, done) => {
        Admin.findById(id, function (err, admin) {
            done(err, admin);
        });
    });
}