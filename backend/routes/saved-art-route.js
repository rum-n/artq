const express = require('express');
const {check} = require('express-validator');
const checkAuth = require("../middleware/check-auth")
const savedartcontrollers = require("../controllers/saved-art-controllers");

const router = express.Router();

router.get('/:imgid',savedartcontrollers.getArtById);
router.get("/images/search",savedartcontrollers.listSearch)
router.get("/images/medium/search",savedartcontrollers.mediumSearch)
router.get("/images/style/search",savedartcontrollers.styleSearch)
router.get('/',savedartcontrollers.getAllArt);


router.get('/user/:uid',savedartcontrollers.getArtByUser);
router.put("/:imgId",savedartcontrollers.updateBidPrice)
router.put("/sold/:imgId",savedartcontrollers.updateStatus)
router.put("/likes/:imgId/status/",savedartcontrollers.updateLikes)

router.post('/',check('title').not().isEmpty(),check('url').isURL(),check('address').not().isEmpty(),savedartcontrollers.saveArt);

router.use(checkAuth);






router.patch('/:imgid',check('title').not().isEmpty(),check('url').isURL(),savedartcontrollers.updateImage);

router.delete('/:imgid',savedartcontrollers.deleteImage)

module.exports = router;