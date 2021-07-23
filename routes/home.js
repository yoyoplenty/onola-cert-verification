const express = require('express');
const app = express();
const router = express.Router();
const Home = require('../controllers/home')


//get request
router.get('/', Home.gethomepage);
router.get('/school', Home.getschoolpage);
router.get('/adekunle', Home.getadekunlepage);
router.get('/oaustech', Home.getoaustechpage);
router.get('/rufus', Home.getrufuspage);

//post request
router.post('/school', Home.postschoolpage);
router.post('/adekunle', Home.postadekunlepage);
router.post('/oaustech', Home.postoaustechpage);
router.post('/rufus', Home.postrufuspage);




module.exports = router