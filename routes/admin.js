const express = require('express');
const app = express();
const router = express.Router();
const Admin = require('../controllers/admin')
const multer = require('multer');
const path = require('path')
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
//passport config
require('../config/passport')(passport)

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/images/uploads/aaua');
    },
    filename: function (request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const storageoaustech = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/images/uploads/oaustech');
    },
    filename: function (request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const storagerufus = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/images/uploads/rufus');
    },
    filename: function (request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});



var upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

const uploadoaustech = multer({
    storage: storageoaustech,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

const uploadrufus = multer({
    storage: storagerufus,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});



//all get request
router.get('/', Admin.getadminpage);
router.get('/register', Admin.getadminregisterpage);
router.get('/dashboard', ensureAuthenticated, Admin.getadmindashboardpage);
router.get('/login', Admin.getadminloginpage);
router.get('/select', ensureAuthenticated, Admin.getadminselectpage);
router.get('/uploadaaua', ensureAuthenticated, Admin.getuploadadekunlepage);
router.get('/uploadoaustech', ensureAuthenticated, Admin.getuploadoaustechpage);
router.get('/uploadrufus', ensureAuthenticated, Admin.getuploadrufuspage);

//all post request
router.post('/register', Admin.postadminregisterpage);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
});
router.post('/select', Admin.postadminselect);
router.post('/uploadaaua', upload.single('file'), Admin.postuploadaaua)
router.post('/uploadoaustech', uploadoaustech.single('file'), Admin.postuploadoaustech)
router.post('/uploadrufus', uploadrufus.single('file'), Admin.postuploadrufus)




module.exports = router