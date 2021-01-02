import React, {useState,useEffect,useContext,Layout,useForceUpdate} from 'react';
import {listOrders} from "../components/apiAdmin"
import {AuthContext} from "../context/auth-context";
import Moment from 'react-moment';
import {useHttpClient} from "../components/hooks/http-hook"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Admin = () => {
    
       
    
    
    const [ clicked, setClicked ] = useState(false)
   
    const [loadedImages, setLoadedImages] = useState();
  const [loadedName, setLoadedName] = useState([]);
  const [loadedEmail, setLoadedEmail] = useState([]);
  const [loadedPhone, setLoadedPhone] = useState([]);
  const auth = useContext(AuthContext);
  console.log(auth.userId)

  
    
   

    const [orders,setOrders] = useState([])
    
    const loadOrders = () =>{
        listOrders(auth.userId).then(data =>{
            if(data.error){
                console.log(data.error)
            } else{
                setOrders(data)
            }
        })
    }
   

    useEffect(() =>{
       
        loadOrders()
    },[])
    const showOrdersLength = orders =>{
        if(orders.length > 0){
            return(
                <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
            )
        } else{
            return <h1 className="text-danger">No orders</h1>
        }
    }
    const sendRequest = async (o,oIndex) => {
        try {
          const response =  await fetch(`http://localhost:5000/api/users/${o.user1}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          loadedName.push(responseData.userWithImages.name)
          loadedEmail.push(responseData.userWithImages.email)
          loadedPhone.push(responseData.userWithImages.phone)
         
        
        } catch (err) {
         
        }
    }
    
 
    return(
       
        <div

        title="Orders"
        description= "hello, here are the orders! Manage them here."      
        >
            
                {showOrdersLength(orders)}
            
                {orders.map((o,oIndex) =>{
                    console.log(o.user1)
                  
                   
                        sendRequest(o,oIndex)
                
                    
                const showInput = (key,value) =>(
                    <div className="input-group mb-2 mr-sm-2"> 
                    <div className="input-group-prepend"> 
                    <div className="input-group-text">{key}
                    </div>
                    <input type="text" value={value} className="form-control" readOnly/>

                    </div>
                    </div>


                )

                const buyerpersonalinfo = (oIndex) =>{
                    return(
                        <div>
                            

                        <li className="list-group-item">Ordered By: {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]}</li>
                    </div>
                    )


                }
                const buynow = async (event) => {
                   
                   return( <Popup trigger={<button onClick={buynow}> click for buyer info</button>} position="right center">
    <div>{loadedName[0]} {loadedEmail[0]} {loadedPhone[0]}</div>
  </Popup> )
                   
                  
                }

                    

                
                    return(
                        <div
                        className="mt-5"
                        key={oIndex}
                        style={{borderBottom: "5px solid indigo"}}  
                        > 
                        <h2 className="mo-5"> 
                        <span className="bg-primary">Order ID: {o._id}</span>

                        </h2>
                        <ul className="list-group mb-2">
                            <li className="list-group-item">{o.status}</li>
                            <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                            <li className="list-group-item">Amount $: {o.amount}</li>
                            
                            <li className="list-group-item">Ordered By:  {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]} </li>
                             {/* {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]} */}
                            <li className="list-group-item">Ordered On: <Moment>{(o.createdAt)}</Moment></li>
                            <li className="list-group-item">Delivery Address: {o.address}</li>
                            <li className="list-group-item">Total Products in the Order : {o.products.length}</li>


                        </ul>
                        
                        {o.products.map((p,pIndex) =>(
                            <div className="mb-4" key={pIndex} style={{padding:"20px",border:"1px solid indigo"}}> 
                            {showInput("Product name", p.name)}
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Product Id", p._id)}
                            
                            
                            </div>

                        ))}
                        
                        
                        </div>

                    )
                    
                } )}
                </div>
         
    )
} 

export default Admin;