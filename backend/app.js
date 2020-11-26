const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const imagesRoutes = require('./routes/saved-art-route');
const usersRoutes = require('./routes/users-route')
const HttpError = require('./models/http-error')

const app = express();
app.use(bodyParser.json());

app.use('/api/saved',imagesRoutes);
app.use('/api/users',usersRoutes);

app.use((req,res,next)=>{
    const error = new HttpError('Could not find this route.',404);
    throw error;

});

app.use((error,req,res,next) =>{
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message:error.message || "An unknown error occured!"})

});

mongoose.connect('mongodb+srv://artq:artqwebsitepassword@cluster0.d2zqd.mongodb.net/mern?retryWrites=true&w=majority').then(() => {app.listen(5000);}).catch(err =>{
    console.log(err);
});
