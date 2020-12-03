const express = require('express');
const {check} = require('express-validator');

const savedartcontrollers = require("../controllers/saved-art-controllers");

const router = express.Router();

router.get('/:imgid',savedartcontrollers.getArtById);

router.get('/',savedartcontrollers.getAllArt);
router.get('/user/:uid',savedartcontrollers.getArtByUser);

router.post('/',check('title').not().isEmpty(),check('url').isURL(),check('address').not().isEmpty(),savedartcontrollers.saveArt);


router.patch('/:imgid',check('title').not().isEmpty(),check('url').isURL(),savedartcontrollers.updateImage);

router.delete('/:imgid',savedartcontrollers.deleteImage)

module.exports = router;