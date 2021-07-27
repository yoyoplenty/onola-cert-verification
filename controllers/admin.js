const AauaCert = require('../models/Schools/Aaua')
const OaustechCert = require('../models/Schools/Oaustech')
const RufusCert = require('../models/Schools/Rufus')
const Admin = require('../models/Admin')
const express = require('express')
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//initialize the global variabale here to be used 
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.err = req.flash('err');
    next();
})


module.exports = {
    getadminpage: (req, res) => {
        res.render('admin/admin', {
            title: 'Admin Page'
        })
    },
    getadminregisterpage: (req, res) => {
        res.render('admin/register', {
            title: 'Admin Register',
            layout: 'newadmin'
        })
    },
    getadminloginpage: (req, res) => {
        res.render('admin/login', {
            title: 'Admin Page',
            layout: 'newadmin'
        })
    },
    postadminregisterpage: async (req, res) => {
        console.log(req.body)
        const { firstname, lastname, email, password, password2 } = req.body
        let errors = [];
        //check fields
        if (!firstname || !lastname || !email || !password || !password2) {
            errors.push({ msg: 'please fill in all fields' })
        }
        //password match
        if (password !== password2) {
            errors.push({ msg: 'password does not match' })
        }
        //check password length
        if (password.length < 6) {
            errors.push({ msg: 'password should be at least 6 characters' })
        }
        if (errors.length > 0) {
            res.render('admin/register', {
                Title: `Admin Register Page`,
                layout: 'newadmin',
                errors,
                firstname,
                lastname,
                email,
                password,
                password2
            })
        } else {
            //validation is passed here
            await Admin.findOne({ email: email })
                .then(admin => {
                    if (admin) {
                        //user exist while trying to register a new one
                        errors.push({ msg: 'Email Address is already registered' })
                        res.render('admin/register', {
                            Title: `Register Here`,
                            layout: 'newadmin',
                            errors,
                            firstname,
                            lastname,
                            email,
                            password,
                            password2
                        })
                    } else {
                        //everything goes well here, no email found with that matric no in the database
                        let newadmin = new Admin({
                            firstname,
                            lastname,
                            email,
                            password
                        });
                        //hash the password before saving it
                        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newadmin.password, salt, (err, hash) => {
                            if (err) throw err
                            //set password to hash;
                            newadmin.password = hash
                            //save the user input for registration
                            newadmin.save()
                                .then(admin => {
                                    res.render('admin/login', {
                                        title: 'Admin Page',
                                        message: 'you are now registered and can login in',
                                        layout: 'newadmin',
                                        admin: admin,
                                        password
                                    })

                                }).catch(err => {
                                    console.log(err)
                                })
                        }))

                    }
                })
        }
    },
    /* postadminloginpage: async (req, res) => {
         //deconstruct your body
         const { email } = req.body
         //find your req to render each Admin profile
         await Admin.findOne({ email: email }, (err, admin) => {
             if (err) {
                 throw err
             } if (admin) {
                 res.render('admin/dashboard', {
                     admin: admin
                 })
             } else {
                 res.render('admin/login', {
                     title: 'Admin Page',
                     layout: 'newadmin'
                 })
             }
         })
 
     }, */
    getadmindashboardpage: (req, res) => {
        res.render('admin/dashboard', {
            title: 'Admin Page',
        })
    },
    getadminselectpage: (req, res) => {
        res.render('admin/adminselect', {
            title: 'Select institution'
        })
    },
    getuploadadekunlepage: (req, res) => {
        res.render('admin/uploadaaua')
    },
    getuploadoaustechpage: (req, res) => {
        res.render('admin/uploadoaustech')
    },
    getuploadrufuspage: (req, res) => {
        res.render('admin/uploadrufus')
    },
    postadminselect: (req, res) => {
        const { school } = req.body
        console.log(school)
        if (school == 'adekunle') {
            return res.render('admin/uploadaaua', {
                title: 'AAUA Certificate Upload Page'
            })
        } if (school == 'oaustech') {
            return res.render('admin/uploadoaustech', {
                title: 'OAUSTECH Certificate Upload Page'
            })
        } if (school == 'rufus') {
            return res.render('admin/uploadrufus', {
                title: 'RUGIPO Certificate Upload Page'
            })
        } else {
            res.render('admin/adminselect', {
                title: 'schools',
                message: 'Please select an institution'
            })
        }
    },
    postuploadaaua: async (req, res) => {
        const { uniqueId } = req.body
        await AauaCert.findOne({ uniqueId: uniqueId }, (err, certificate) => {
            if (err) {
                throw err
            } if (certificate) {
                return res.render('uploadaaua', {
                    title: 'AAUA Certificate Upload Page',
                    message: `certficate ${uniqueId} already exist`
                })
            } else {
                let newCertificate = new AauaCert({
                    uniqueId,
                    img: req.file.filename
                })
                newCertificate.save()
                    .then(thecertificate => {
                        console.log(thecertificate)
                        res.send(`certificate with the id ${thecertificate.uniqueId} was saved succesfully`)
                    })

            }
        })
    },
    postuploadoaustech: async (req, res) => {
        const { uniqueId } = req.body
        await OaustechCert.findOne({ uniqueId: uniqueId }, (err, certificate) => {
            if (err) {
                throw err
            } if (certificate) {
                return res.render('uploadoaustech', {
                    title: 'OAUSTECH Certificate Upload Page',
                    message: `certficate ${uniqueId} already exist`
                })
            } else {
                let newCertificate = new OaustechCert({
                    uniqueId,
                    img: req.file.filename
                })
                newCertificate.save()
                    .then(thecertificate => {
                        console.log(thecertificate)
                        res.send(`certificate with the id ${thecertificate.uniqueId} was saved succesfully`)
                    })

            }
        })

    },
    postuploadrufus: async (req, res) => {
        const { uniqueId } = req.body
        await RufusCert.findOne({ uniqueId: uniqueId }, (err, certificate) => {
            if (err) {
                throw err
            } if (certificate) {
                return res.render('uploadrufus', {
                    title: 'RUGIPO Certificate Upload Page',
                    message: `certficate ${uniqueId} already exist`
                })
            } else {
                let newCertificate = new RufusCert({
                    uniqueId,
                    img: req.file.filename
                })
                newCertificate.save()
                    .then(thecertificate => {
                        console.log(thecertificate)
                        res.send(`certificate with the id ${thecertificate.uniqueId} was saved succesfully`)
                    })

            }
        })
    }
}