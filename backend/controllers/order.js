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
               
            })
        }
        res.json(data)
    })
}

exports.listOrders = (req,res) =>{
    Order.find()
    .populate('user',"_id name address")
    .sort("-created")
    .exec((err,orders) =>{
        if(err){
            return res.status(400).json({
                
            })
        }
        res.json(orders)
    })
}
