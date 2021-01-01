const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")
const userscontrollers = require("../controllers/users-controllers");
const {create} = require("../controllers/order");
const {addOrderToUserHistory} = require("../controllers/users-controllers")
const {decreaseQuantity} = require("../controllers/saved-art-controllers")

router.post("/order/create/:userId",addOrderToUserHistory,create);

module.exports = router;

