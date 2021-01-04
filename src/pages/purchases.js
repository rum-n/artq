import React, {useState,useEffect,useContext}from 'react';
import './styles.css';
import {paypal} from "./paypal"
import {AuthContext} from "../context/auth-context";
import {read,update,updateUser} from "../components/apiUser"
import data from '../components/data';
import { Redirect } from 'react-router';
import {useHttpClient} from "../components/hooks/http-hook"
const Purchases = () => {
    const {sendRequest,clearError} = useHttpClient();

    const auth = useContext(AuthContext)
    const userId = auth.userId

    

   return(
       <div>
           <text>purchases</text>
       </div>
   )
} 

export default Purchases;