import React, {useContext, useEffect, useState}from 'react';
import DropIn from "braintree-web-drop-in-react"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBrainTreeClientToken} from "./payments"
import {getCart,removeItem} from "./cartHelpers"
import Feed from '../components/Feed'
import {AuthContext} from "../context/auth-context";

const Checkout =({products})=>{
    const [data,setData] = useState("")
    const auth = useContext(AuthContext);
    const userId = auth.userId
    useEffect(() => {
        const sendRequest = async () => {
    
          try {
            const response = await fetch(`http://localhost:5000/api/braintree/getToken/${auth.userId}`);
            
            const responseData = await response.json();
            
    
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            
            setData(responseData.clientToken);
           
           
          } catch (err) {
            alert(err)
          }
        
        };
        sendRequest();
      }, []);

      console.log("the dataaaa"+ data)
   
   
    
    
  
    
    const getToken=(userId) =>{
    getBrainTreeClientToken(userId).then(data =>{
       
        if(data.error){
            setData({...data,error:data.error})
        } else{
            setData({...data,clientToken:data.clientToken})
        }
    })
   
}

    const getTotal = () =>{
        return products.reduce((currentValue,nextValue) =>{
            return currentValue+nextValue.count*nextValue.price
        },0)
    }

    const showDropIn =() =>(
       
        <div>
          
                 <div>
                    <DropIn options={{
                        authorization:data.toString()
                    }} onInstance={instance => instance = instance}/>
                    <button className="btn btn-success">Pay</button>
                    </div> 
      

        </div>
        
    )
return <div>
    <h2> Total: ${getTotal()}</h2>
    
    <div>
    {showDropIn()}
    {/* <div>
                    <DropIn options={{
                        authorization:data.clientToken
                    }} onInstance={instance => instance = instance}/>
                    <button className="btn btn-success">Checkout</button>
                    </div> */}
    </div>
    </div>

}
export default Checkout