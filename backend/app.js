const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs')
const imagesRoutes = require('./routes/saved-art-route');
const usersRoutes = require('./routes/users-route')
const savedRoutes = require('./routes/saving-other-people-art-route')
const braintreeRoutes = require('./routes/braintree')
const orderRoutes = require("./routes/order")
const bidRoutes = require("./routes/bid-route")
const HttpError = require('./models/http-error')
const path = require('path')

const app = express();
app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')))

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE,PUT');
    next();
});

app.use('/api/images',imagesRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/saved',savedRoutes);
app.use("/api",braintreeRoutes);
app.use("/api",orderRoutes);
app.use("/api/bid",bidRoutes);

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.',404);
    throw error;

});

app.use((error,req,res,next) =>{
    if (req.file){
      fs.unlink(req.file.path,() =>{
          console.log(error)
      })
    }
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message:error.message || "An unknown error occured!"})

});

mongoose.connect (
    'mongodb+srv://artq:artqwebsitepassword@cluster0.d2zqd.mongodb.net/mern?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
.then(() => {app.listen(5000);})
.catch(err =>{
    console.log(err);
});
