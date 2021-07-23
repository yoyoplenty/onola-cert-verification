const AauaCert = require('../models/Schools/Aaua')
const OaustechCert = require('../models/Schools/Oaustech')
const RufusCert = require('../models/Schools/Rufus')


module.exports = {
    getadminpage: (req, res) => {
        res.render('admin', {
            title: 'Admin Page'
        })
    },
    getadminselectpage: (req, res) => {
        res.render('adminselect', {
            title: 'Select institution'
        })
    },
    getuploadadekunlepage: (req, res) => {
        res.render('uploadaaua')
    },
    getuploadoaustechpage: (req, res) => {
        res.render('uploadoaustech')
    },
    getuploadrufuspage: (req, res) => {
        res.render('uploadrufus')
    },
    postadminselect: (req, res) => {
        const { school } = req.body
        console.log(school)
        if (school == 'adekunle') {
            return res.render('uploadaaua', {
                title: 'AAUA Certificate Upload Page'
            })
        } if (school == 'oaustech') {
            return res.render('uploadoaustech', {
                title: 'OAUSTECH Certificate Upload Page'
            })
        } if (school == 'rufus') {
            return res.render('uploadrufus', {
                title: 'RUGIPO Certificate Upload Page'
            })
        } else {
            res.render('adminselect', {
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