const mongoose = require("mongoose")
const {Order,CartItem} = require('../models/order')
const HttpError = require('../models/http-error');
const User = require("../models/user")


exports.create = (req,res) =>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error,data)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        res.json(data)
    })
}
