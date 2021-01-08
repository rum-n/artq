const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")
const userscontrollers = require("../controllers/users-controllers");
const {create,listOrders,getStatusValues,orderById,updateOrderStatus} = require("../controllers/order");
const {addOrderToUserHistory} = require("../controllers/users-controllers")
const addorder = require("../controllers/order")
const {decreaseQuantity} = require("../controllers/saved-art-controllers")

router.post("/order/create/:userId",addorder.createOrder);

router.get("/order/list/:userId",listOrders)
router.get("/order/status-values/:userId",getStatusValues)

router.put("/order/:orderId/status/:userId",updateOrderStatus)



module.exports = router;

