const express = require('express');

const savedartcontrollers = require("../controllers/saved-art-controllers");

const router = express.Router();

router.get('/:imgid',savedartcontrollers.getArtById);


router.get('/user/:uid',savedartcontrollers.getArtByUser);

router.post('/',savedartcontrollers.saveArt);

module.exports = router;