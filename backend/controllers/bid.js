const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const Image = require('../models/image');
const User = require("../models/user")
const Bid = require("../models/bid")
const mongoose = require("mongoose")

const getBidByUser = async (req,res,next)=>{
    const userId = req.params.uid;
    let userWithImages
    try{
        console.log(Bid)
        userWithImages = await Bid.find({user1:userId})
        console.log(userWithImages)
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}

    if (!userWithImages || userWithImages.length === 0){
        return next(
            new HttpError("Could not find a image for the provided user id",404)
        );
    }
    res.json({userWithImages: userWithImages.map(userWithImages => userWithImages.toObject({getters:true}))})

}

const getBidByArtId = async (req,res,next)=>{
    const artId = req.params.imgid;
    let userWithImages
    try{
        console.log(Bid)
        userWithImages = await Bid.find({artId:artId})
        console.log(userWithImages)
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}

    if (!userWithImages || userWithImages.length === 0){
        return next(
            new HttpError("Could not find a image for the provided user id",404)
        );
    }
    res.json({userWithImages: userWithImages.map(userWithImages => userWithImages.toObject({getters:true}))})

}
const createBid = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {title,url,description,artId,dimentions,location,author,type,duration,bid,medium,address,user1} = req.body;
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(address)
    } catch(error){
        return next(error)
    }
    const savedArt = new Bid({
        title,
        artId,
        description,
        dimentions,
        url,
        address,
        location,       
        type,
        duration,
        bid,
        medium,
        author,
        user1
    });
   
    let user;
    try{
       user =  await User.findById(user1)
       console.log(user)

     }catch(err){
         const error = new HttpError(
          "Creating place failed",500
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
      console.log("yuh")
      sess.startTransaction();
      console.log("yuh")
      await savedArt.save({session:sess});
      console.log("yuh")
      user.bids.push(savedArt);
      console.log("yuh")
     await user.save({session:sess});
      await sess.commitTransaction();
     } catch(err){
         const error = new HttpError("Saving Image failed",500);
    
     return next(error)
     }

     //sending bid info to buyer and seller

    //  const emailData = {
    //     to: "seawavecrafts@gmail.com",
    //     from: 'Nandita1227@gmail.com',
    //     subject: `A new order is received`,
    //     html: `
    //     <h1>Hey Admin, Somebody just made a bid in your ecommerce store</h1>
    //     <h2>Customer name: ${name}</h2>
    //     <h2>Customer address: ${address}</h2>
    //     <h2>User's purchase history: ${products.length} purchase</h2>
    //     <h2>User's email: ${email}</h2>
    //     <h2>Total products: ${products.length}</h2>
    //     <h2>Transaction ID: ${transaction_id}</h2>
    //     <h2>Order status: Not processed</h2>
    //     <h2>Product details:</h2>
    //     <hr />
    //     ${products
    //         .map(p => {
    //             return `<div>
    //                 <h3>Product Name: ${products.name}</h3>
    //                 <h3>Product Price: ${p.price}</h3>
    //                 <h3>Product Quantity: ${p.count}</h3>
    //         </div>`;
    //         })
    //         .join('--------------------')}
    //     <h2>Total order cost: ${amount}<h2>
    //     <p>Login to your dashboard</a> to see the order in detail.</p>
    // `
    // };
    // sgMail
    //     .send(emailData)
    //     .then(sent => console.log('SENT >>>', sent))
    //     .catch(err => console.log('ERR >>>', err));

    // // email to buyer
    // const emailData2 = {
    //     //order.user.email
    //     to: "seawavecrafts@gmail.com",
    //     from: 'Nandita1227@gmail.com',
    //     subject: `Your order is in process`,
    //     html: `
    //     <h1>Hey ${name}, Thank you for shopping with us.</h1>
    //     <h2>Total products: ${products.length}</h2>
    //     <h2>Transaction ID: ${transaction_id}</h2>
    //     <h2>Order status: Not Processed </h2>
    //     <h2>Product details:</h2>
    //     <hr />
    //     ${products
    //         .map(p => {
    //             return `<div>
    //                 <h3>Product Name: ${p.name}</h3>
    //                 <h3>Product Price: ${p.price}</h3>
    //                 <h3>Product Quantity: ${p.count}</h3>
    //         </div>`;
    //         })
    //         .join('--------------------')}
    //     <h2>Total order cost: ${amount}<h2>
    //     <p>Thank your for shopping with us.</p>
    // `
    // };
    // sgMail
    //     .send(emailData2)
    //     .then(sent => console.log('SENT 2 >>>', sent))
    //     .catch(err => console.log('ERR 2 >>>', err));
    res.status(201).json({art:savedArt});
};


exports.updateOrderStatus = (req,res) =>{
    Bid.update({_id: req.body.orderId},{$set:{status:req.body.status}},(err,order) =>{
      
        res.json(order)
    })
}

exports.updateBidPrice = (req,res) =>{
    Bid.update({_id: req.body.orderId},{$set:{bid:req.body.bid}},(err,order) =>{
      
        res.json(order)
    })
}




exports.getBidByArtId = getBidByArtId;
exports.getBidByUser = getBidByUser;
exports.createBid = createBid;
