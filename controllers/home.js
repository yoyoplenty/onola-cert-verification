const AauaCert = require('../models/Schools/Aaua')
const OaustechCert = require('../models/Schools/Oaustech')
const RufusCert = require('../models/Schools/Rufus')
const path = require('path')


module.exports = {
    gethomepage: (req, res) => {
        res.render('home', {
            title: 'Homepage'
        })
    },
    getschoolpage: (req, res) => {
        res.render('school', {
            title: 'Select institution'
        })
    },
    getoaustechpage: (req, res) => {
        res.render('oaustech')
    },
    getrufuspage: (req, res) => {
        res.render('rufus')
    },
    getadekunlepage: (req, res) => {
        res.render('adekunle')
    },
    postschoolpage: (req, res) => {
        const { school } = req.body
        console.log(school)
        if (school == 'adekunle') {
            return res.render('adekunle', {
                title: 'AAUA Verirfication Page'
            })
        } if (school == 'oaustech') {
            return res.render('oaustech', {
                title: 'OAUSTECH Verirfication Page'
            })
        } if (school == 'rufus') {
            return res.render('rufus', {
                title: 'RUGIPO Verirfication Page'
            })
        } else {
            return res.render('school', {
                title: 'schools',
                message: 'Please select an institution'
            })
        }
    },
    postadekunlepage: async (req, res) => {
        const { uniqueId } = req.body
        await AauaCert.findOne({ uniqueId: uniqueId }, (err, mycertificate) => {
            if (err) {
                return console.log(err)
            } if (mycertificate) {


                console.log(mycertificate)
                // res.sendFile(path.join(__dirname, '../public', 'images', 'uploads', 'aaua', mycertificate.img));
                return res.render('getaaua', {
                    aauacert: mycertificate,
                    title: 'Student certificate',
                    layout: 'admin',

                })
            } else {
                res.render('adekunle', {
                    title: 'AAUA Verirfication Page',
                    message: `certifcate with id ${uniqueId} not found `
                }
                )
            }
        })
    },
    postoaustechpage: async (req, res) => {
        const { uniqueId } = req.body
        await OaustechCert.findOne({ uniqueId: uniqueId }, (err, mycertificate) => {
            if (err) {
                return console.log(err)
            } if (mycertificate) {
                // res.sendFile(path.join(__dirname, '../public', 'images', 'uploads', 'oaustech', mycertificate.img));
                return res.render('getoaustech', {
                    title: 'Student certificate',
                    layout: 'admin',
                    oaustechcert: mycertificate
                })
            } else {
                res.render('oaustech', {
                    title: 'OAUSTECH Verirfication Page',
                    message: `certifcate with id ${uniqueId} not found `
                }
                )
            }
        })
    },
    postrufuspage: async (req, res) => {
        const { uniqueId } = req.body
        await RufusCert.findOne({ uniqueId: uniqueId }, (err, mycertificate) => {
            if (err) {
                return console.log(err)
            } if (mycertificate) {
                // res.sendFile(path.join(__dirname, '../public', 'images', 'uploads', 'rufus', mycertificate.img));
                return res.render('getrufus', {
                    title: 'Student certificate',
                    layout: 'admin',
                    rufuscert: mycertificate
                })
            } else {
                res.render('rufus', {
                    title: 'OAUSTECH Verirfication Page',
                    message: `certifcate with id ${uniqueId} not found `
                }
                )
            }
        })
    },
}