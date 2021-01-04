import React, {useState,useEffect,useContext}from 'react';
import {AuthContext} from "../context/auth-context";
export const read = (userId) =>{
    return fetch(`http://localhost:5000/api/users/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const update = (userId,user,auth) =>{
    
    console.log("entered")
    return fetch(`http://localhost:5000/api/users/${userId}`,{
        method:"PATCH",
        body:{
            "name" : "Nandita K",
    "email": "order1@gmail.com",
    "password":"123456",
    "image":[],
    "savedimage":[],
    "phone":123456789
        },  
            'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
          
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateUser = (user,next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user = user
            localStorage.setItem("jwt",JSON.stringify(auth))
            next()
        }
    }
}