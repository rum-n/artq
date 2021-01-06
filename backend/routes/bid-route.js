const express = require('express');
const {check} = require('express-validator');

const bid = require("../controllers/bid");

const router = express.Router();


router.get('/user/:uid',bid.getBidByUser);


router.post('/',check('title').not().isEmpty(),check('url').isURL(),check('address').not().isEmpty(),bid.createBid);




module.exports = router;