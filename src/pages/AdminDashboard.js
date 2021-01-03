import React, {useState,useEffect,useContext,Layout,useForceUpdate} from 'react';
import {listOrders,getartistinfo,getStatusValues,updateOrderStatus} from "../components/apiAdmin"
import {AuthContext} from "../context/auth-context";
import Moment from 'react-moment';
import {useHttpClient} from "../components/hooks/http-hook"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Admin = () => {
    const {error,sendRequest,clearError} = useHttpClient();
   
       
    let changed = true
    
    const [ clicked, setClicked ] = useState(false)
   
    const [loadedImages, setLoadedImages] = useState();
  
  const [loadedName, setLoadedName] = useState([]);
  const [loadedEmail, setLoadedEmail] = useState([]);
  const [loadedPhone, setLoadedPhone] = useState([]);

  const [loadedBuyerName, setLoadedBuyerName] = useState([]);
  const [loadedBuyerEmail, setLoadedBuyerEmail] = useState([]);
  const [loadedBuyerPhone, setLoadedBuyerPhone] = useState([]);
  const auth = useContext(AuthContext);
 

  
    
   

    const [orders,setOrders] = useState([])
    const [statusValues, setstatusValues] = useState([]);
    
    const loadOrders = () =>{
        listOrders(auth.userId).then(data =>{
            if(data.error){
                console.log(data.error)
            } else{
                setOrders(data)
            }
        })
        changed = false
    }

    const loadStatusValues = () =>{
        getStatusValues(auth.userId).then(data =>{
            if(data.error){
                console.log(data.error)
            } else{
                setstatusValues(data)
            }
        })
        changed = false
    }
    
   

    useEffect(() =>{
        console.log("enterredddd")
        if (loadedName == ""){
        loadOrders();
        loadStatusValues();}
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

    

    
    const sendRequest1 = async (o,oIndex) => {
        try {
          
          const response =  await fetch(`http://localhost:5000/api/users/${o.user1}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setLoadedName(loadedName.concat(responseData.userWithImages.name))
          setLoadedEmail(loadedEmail.concat(responseData.userWithImages.email))
          setLoadedPhone(loadedPhone.concat(responseData.userWithImages.phone))
         
        
        } catch (err) {
         
        }
      
    }

    const getthebuyer = async (o,oIndex) => {
        try {
           
          const response =  await fetch(`http://localhost:5000/api/users/${o.artistid}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setLoadedBuyerName(loadedBuyerName.concat(responseData.userWithImages.name))
          setLoadedBuyerEmail(loadedBuyerEmail.concat(responseData.userWithImages.email))
          setLoadedBuyerPhone(loadedBuyerPhone.concat(responseData.userWithImages.phone))
         
        
        } catch (err) {
         
        }
    }

    const placeSubmitHandler = async (o,e) => {
        console.log("entered placesubmit handler" )
        
        try{
        console.log(e.target.value)
        
         
        await sendRequest(`http://localhost:5000/api/order/${o._id}/status/${o.user1}`,'PUT',JSON.stringify({
            orderId : o._id,
            status:e.target.value
        }),{
            'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
          })
      
      } catch(err){
      
        console.log(err)
      }
      loadOrders()
    };

    const handleStatusChange = (o,e, orderId) =>{

        return fetch(`http://localhost:5000/api/order/5ff1373ec464c44f0d3b64d9/status/5fecede41fdac7456367d4b4`,{
        method:"PUT",
        body:{
            "orderId" : "5ff1373ec464c44f0d3b64d9",
            "status":"it worked!!!!"
        }
      
    })

               
       
    }

    const showStatus = (o) =>{
        return(
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={(e) => placeSubmitHandler(o,e)} >
              <option>
                  Update Status
              </option>
             
                {statusValues.map((status,index) =>(<option key={index} value={status}>
                    {status}
                </option>))}
            </select>
        </div>
        )

    }
    
 
    return(
       
        <div

        title="Orders"
        description= "hello, here are the orders! Manage them here."      
        >
            
                {showOrdersLength(orders)}

                
            
                {orders.map((o,oIndex) =>{
                   
                  
                      
                        sendRequest1(o,oIndex)
                        getthebuyer(o,oIndex)
                
                    
                const showInput = (key,value) =>(
                    <div className="input-group mb-2 mr-sm-2"> 
                    <div className="input-group-prepend"> 
                    <div className="input-group-text">{key}
                    </div>
                    <input type="text" value={value} className="form-control" readOnly/>

                    </div>
                    </div>


                )

                
               

                    

                
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
                            <li className="list-group-item"> {showStatus(o)}</li>
                            <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                            <li className="list-group-item">Amount $: {o.amount}</li>
                            
                            <li className="list-group-item">Ordered By:  {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]} </li>
                            <li className="list-group-item">The Artist: {loadedBuyerName[oIndex]} {loadedBuyerEmail[oIndex]} {loadedBuyerPhone[oIndex]} </li>
                             {/* {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]} */}
                            <li className="list-group-item">Ordered On: <Moment>{(o.createdAt)}</Moment></li>
                            <li className="list-group-item">Delivery Address: {o.address}</li>
                            <li className="list-group-item">Total Products in the Order : {o.products.length}</li>


                        </ul>
                        
                        {o.products.map((p,pIndex) =>(
                            <div className="mb-4" key={pIndex} style={{padding:"20px",border:"1px solid indigo"}}> 
                            
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Art Title", o.name)}
                            
                            
                            </div>

                        ))}
                        
                        
                        </div>

                    )
                    
                } )}
                </div>
         
    )
} 

export default Admin;