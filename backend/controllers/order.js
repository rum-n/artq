const mongoose = require("mongoose")
const {Order,CartItem} = require('../models/order')
const HttpError = require('../models/http-error');
const User = require("../models/user")

exports.orderById = (req,res,next,id) =>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order) =>{
        if(err||!order){
            return res.status(400).json({
             
            })
        }
        req.order = order
        next();
    })
}

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

exports.getStatusValues = (req,res) =>{
    res.json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus = (req,res) =>{
    Order.update({_id: req.body.orderId},{$set:{status:req.body.status}},(err,order) =>{
      
        res.json(order)
    })
}


