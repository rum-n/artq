const mongoose = require("mongoose")
const {Order,CartItem} = require('../models/order')
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator')
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

const createOrder = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    console.log(req.body.createOrderData)
    const {products,name,address,transaction_id,artistid,sold,amount,user1} = req.body.createOrderData;
    console.log(products,name,address,transaction_id,artistid,sold,amount,user1)
    const savedOrder = new Order({
        
        products,
        name,
        transaction_id,
        amount,
        sold,
        address,
        user1,
        artistid,
      
      
    });
   
    console.log(user1)
    let user;
    try{
       user =  await User.findById(user1)
       
     }catch(err){
         const error = new HttpError(
          "Creating order failed",500
       );
         return next(error);
     }
     if (!user){
         console.log("error dawg")
         const error = new HttpError("Could not find user for provided id",404)
         return next(error)
     }

     try{
      const sess = await mongoose.startSession();
      console.log("hi")
      sess.startTransaction();
      console.log("hi")
      await savedOrder.save({session:sess});
      console.log("hi")
      user.order.push(savedOrder);
      console.log("hi")
     await user.save({session:sess});
     console.log("hi")
      await sess.commitTransaction();
      console.log("hi")
     } catch(err){
         console.log(err)
         const error = new HttpError("Saving Order failed",500);
    
     return next(error)
     }
    res.status(201).json({art:savedOrder});


};

exports.create = (req,res) =>{
    console.log(req.body.body)
   
    const order = new Order(req.body.body.order);
    order.save((error,data)=>{
        if(error){
            console.log(error)
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


exports.createOrder = createOrder
