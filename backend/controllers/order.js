const mongoose = require("mongoose")
const {Order,CartItem} = require('../models/order')
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator')
const User = require("../models/user")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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
    console.log("enterreeddddd")
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    console.log(req.body.createOrderData)
    const {products,name,address,transaction_id,artistid,sold,amount,user1,email} = req.body.createOrderData;
    console.log(products,name,address,transaction_id,artistid,sold,amount,user1)
    const savedOrder = new Order({
        
        products,
        name,
        email,
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
     console.log("entered")

     try{
      
      const sess = await mongoose.startSession();
      console.log("hoi")
      sess.startTransaction();
      console.log("hoi")
      await savedOrder.save({session:sess});
      console.log("hoi")
      user.order.push(savedOrder);
      console.log("hoi")
     await user.save({session:sess});
     console.log("hoi")
      await sess.commitTransaction();
      console.log("hoi")
     } catch(err){
         console.log(err)
         const error = new HttpError("Saving Order failed",500);
    
     return next(error)
     }
    
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount

        //"to" will be to email that will be recieving the orders (artq.world email? Chui's email?)
        //"from" can be from any email registered
        const emailData = {
            to: "seawavecrafts@gmail.com",
            from: 'Nandita1227@gmail.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${name}</h2>
            <h2>Customer address: ${address}</h2>
            <h2>User's purchase history: ${products.length} purchase</h2>
            <h2>User's email: ${email}</h2>
            <h2>Total products: ${products.length}</h2>
            <h2>Transaction ID: ${transaction_id}</h2>
            <h2>Order status: Not processed</h2>
            <h2>Product details:</h2>
            <hr />
            ${products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${products.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        // email to buyer
        const emailData2 = {
            //order.user.email
            //"to" will be ${email}
            //"from" will be whatever email was registered
            to: "seawavecrafts@gmail.com",
            from: 'Nandita1227@gmail.com',
            subject: `Your order is in process`,
            html: `
            <h1>Hey ${name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${products.length}</h2>
            <h2>Transaction ID: ${transaction_id}</h2>
            <h2>Order status: Not Processed </h2>
            <h2>Product details:</h2>
            <hr />
            ${products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
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
        console.log('ORDER IS JUST SAVED >>> ', order);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'seawavecrafts@gmail.com', // admin
            from: 'Nandita1227@gmail.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Artist, Somebody just made a purchase!</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's purchase history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        // email to buyer
        const emailData2 = {
            //order.user.email
            to: "seawavecrafts@gmail.com",
            from: 'Nandita1227@gmail.com',
            subject: `You order is in process`,
            html: `
            <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
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
