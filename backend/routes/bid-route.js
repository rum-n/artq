const express = require('express');
const {check} = require('express-validator');
const {listBids,getStatusValues,updateBidStatus} = require("../controllers/bid");
const bid = require("../controllers/bid");
const {updateOrderStatus,updateBidPrice} = require("../controllers/bid");

const router = express.Router();


router.get('/user/:uid',bid.getBidByUser);
router.get('/:imgid',bid.getBidByArtId);
router.get('/',listBids);
router.get("/status-values/:uid",getStatusValues)


router.put("/bid/:bidId/status/:userId",updateOrderStatus)
router.put("/:orderId/status/:userId",updateOrderStatus)
router.put("/:imgId",updateBidPrice)
router.post('/',check('title').not().isEmpty(),check('address').not().isEmpty(),bid.createBid);




module.exports = router;