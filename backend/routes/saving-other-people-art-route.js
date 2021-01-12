const express = require('express');
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload')
const savedartcontrollers2 = require("../controllers/saving-other-people-art-controllers");

const router = express.Router();


router.get('/user/:uid',savedartcontrollers2.getArtByUser);


router.post('/',fileUpload.single('url'),check('title').not().isEmpty(),check('url').isURL(),check('address').not().isEmpty(),savedartcontrollers2.saveArt);


router.delete('/:imgid',savedartcontrollers2.deleteImage)

module.exports = router;