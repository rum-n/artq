
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Order = require("../models/order")
const mongoose = require("mongoose")

const getUsers = async (req,res,next) =>{
    let users;
    try{
     users = await User.find({},'-password');
    } catch(err){
        const error = new HttpError(
            "Fetching users failed", 500
        );
        return next(error)
    }
    res.json({users:users.map(user => user.toObject({getters:true}))});

};
const profileById = async (req,res,next)=>{
    const userId = req.params.uid;
    console.log("id "+userId)
    let userWithImages
    try{
        userWithImages = await User.findById(userId)
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}



  
    res.json({userWithImages:userWithImages})

}
const signup = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next( new HttpError("Invalid inputs passed, please check your data",422));

    }
    const {name,email,password,phone,location,about,prof} = req.body;
    let existingUser
    try{
    existingUser = await User.findOne({email:email})
    } catch (err){
        const error = new HttpError(
            "Signing in failed",500
        );
        return next(error);
    }

    if (existingUser){
        const error = new HttpError(
            "User exists already, please login instead",422
        );
        return next(error);
    }
    let hashedPassword;
    try{
    hashedPassword= await bcrypt.hash(password,12)
    }catch(err){
        const error = new HttpError(
            'Could not create user, please try again.',500
        );
        return next(error)
    }


    const createdUser = new User({
        name,
        location,
        about,
        prof,
        email,
        password:hashedPassword,
        phone,
        image:[],
        savedimages:[]
    });
    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            "Signingg up failed", 500
        );
        return next(error);
    }
    let token;
    try{
   
    token = jwt.sign({userId:createdUser.id,email:createdUser.email},"super sectret",{expiresIn:'1h'})
    }catch(err){
        const error = new HttpError(
            "Signingg up failed", 500
        );
        return next(error);
    }
    res.status(201).json({userId:createdUser.id,email:createdUser.email,token:token});
};
const login = async (req,res,next) =>{
    const{email,password} = req.body;
    let existingUser
    try{
    existingUser = await User.findOne({email:email})
    } catch (err){
        const error = new HttpError(
            "Signing in failed",500
        );
        return next(error);
    }
    if (!existingUser ){
       
        const error = new HttpError(
            "Invalid Credentials", 401
        );
        return next(error);
    }

    let isValidPassword = false;
    try{
    isValidPassword = await bcrypt.compare(password,existingUser.password);
    } catch(err){
      
        const error = new HttpError(
            'Could not log you in, check credentials',500
        )
        return next(error);
    }
    if (!isValidPassword){
      
        const error = new HttpError(
            'Could not log you in, check credentials',500
        )
        return next(error);

    }
    let token;
    try{
       
        token = jwt.sign({userId:existingUser.id,email:existingUser.email},"super sectret",{expiresIn:'1h'})
        }catch(err){
            const error = new HttpError(
                "Logging in failed", 500
            );
            return next(error);
        }
    

    res.json({userId:existingUser.id,email:existingUser.email,token:token});
};

exports.addOrderToUserHistory = (req,res,next) =>{
    console.log("entered orderhistory")
 
    let history = []
    req.body.order.products.forEach((item) =>{
        history.push({
            _id: item._id,
            name:item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })
    console.log(history)
    User.findOneAndUpdate({_id:req.body.order.user1},{$push:{history:history}},{new:true},(error,data) =>{
        if(error){
            console.log("didn't work")
            return res.status(400).json({
                error:"could not update purchase history"
            })

        }
        next();
    })
}

exports.update = (req,res) =>{
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user) =>{
            if(err){
                return res.status(400).json({
                    error:"you are not authorized to perform this action"
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user)
        }
    )
}

const updateprofile = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {name,email,password,image,savedimage,phone} = req.body;
    const imageId = req.params.uid;
    let profile;
    try{
        profile = await User.findById(imageId)
        console.log("THE IMAGE ID "+ imageId)
        
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not update art", 500
        );
        return next(error)
    }
    let hashedPassword;
    try{
    hashedPassword= await bcrypt.hash(password,12)
    }catch(err){
        const error = new HttpError(
            'Could not create user, please try again.',500
        );
        return next(error)
    }

   
    console.log(profile.name)
    profile.name = name;
    console.log(profile.name)
    profile.email = email;
    profile.password = hashedPassword;
    profile.image = image
    profile.savedimage = savedimage
    profile.phone = phone

    

   try{
       await profile.save();
   }catch(err){
       const error = new HttpError(
           "Something went wrong, could not update artt", 500
       );
       return next(error);
   }
    res.status(200).json({profile:profile.toObject({getters:true})});

};

const purchaseHistory = async (req,res,next) =>{

    const userId = req.params.uid;
    console.log("hi")
    console.log(userId)
    let userWithImages
    try{
       
        console.log(Order.Order)
        userWithImages = await Order.Order.find({user1:userId})
        console.log("userWithImages "+userWithImages)
        
        
    } catch(err){
        console.log("hoi")
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
// const addorder = async (req,res,next) =>{
//     console.log("enterreddddddddd")
//    const history = new Order({
       
//         _id:req.body.order.products[0]._id,
//         name:req.body.order.products[0].name,
//         description:req.body.order.products[0].description,
//         category:req.body.order.products[0].category,
//         quantity:req.body.order.products[0].count,
//         transaction_id:req.body.order.transaction_id,
//         amount:req.body.order.amount,
     

    
//     })
 
//     console.log("enterreddddddddd")




//     let user;
//     console.log("user1 "+req.body.order.user1)
//     try{
//         console.log("user1 "+req.body.order.user1)
//        user =  await User.findById(req.body.order.user1)
      
    
//      }catch(err){
//         console.log("error dawg1")

//          const error = new HttpError(
//           "Creating place failed",500
//        );
//          return next(error);
//      }
//      if (!user){
//          console.log("error dawg")
//          const error = new HttpError("Could not find user for provided id",404)
//          return next(error)
//      }



// try{
//     const sess = await mongoose.startSession();
//     console.log("yuh")
//     sess.startTransaction();
//     console.log("yoh")
//     await history.save({session:sess});
//     console.log("yuh")
//     user.order.push(history);
//     console.log("yuh")
//    await user.save({session:sess});
//     await sess.commitTransaction();
//    } catch(err){
//        const error = new HttpError("Saving Image failed",500);
  
//    return next(error)
//    }
//   res.status(201).json({art:history});


// };


// exports.addorder = addorder

const artistSearch = (req,res) =>{
    const query = {}
    if(req.query.search){
        console.log(req.query.search)
        query.name = {$regex: req.query.search, $options:"i"}
        console.log(query.name)
        
        
        
        User.find(query, (err,products) =>{
            if(err){
                console.log("error "+err)
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(products)
        })
       
       
    }
 
     
 }

exports.artistSearch = artistSearch
exports.purchaseHistory = purchaseHistory
exports.updateprofile = updateprofile
exports.profileById = profileById;
exports.getUsers = getUsers;
exports.signup = signup
exports.login = login;