const express = require('express');

const savedartcontrollers = require("../controllers/saved-art-controllers");

const router = express.Router();

router.get('/:imgid',savedartcontrollers.getArtById);


router.get('/user/:uid',savedartcontrollers.getArtByUser);

router.post('/',savedartcontrollers.saveArt);

router.patch('/:imgid',savedartcontrollers.updateImage);

router.delete('/:imgid',savedartcontrollers.deleteImage)

module.exports = router;