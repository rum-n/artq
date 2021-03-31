import React, {useState,useEffect,useContext,Layout,useForceUpdate,useRef} from 'react';
import {listOrders,getartistinfo,getStatusValues,updateOrderStatus,listBids,getStatusValuesBids} from "../components/apiAdmin"
import {AuthContext} from "../context/auth-context";
import Moment from 'react-moment';
import moment from "moment"
import {useHttpClient} from "../components/hooks/http-hook"
import 'reactjs-popup/dist/index.css';


const ManageBids = () => {
    
    const {error,sendRequest,clearError} = useHttpClient();
   
       
    let changed = true
   

    
    const [ clicked, setClicked ] = useState(false)
   
    const [loadedImages, setLoadedImages] = useState();
  
  const [loadedName, setLoadedName] = useState([]);
  const [loadedEmail, setLoadedEmail] = useState([]);
  const [loadedPhone, setLoadedPhone] = useState([]);
  const layoutRef= useRef({});
layoutRef.current = loadedPhone;

  const [loadedBuyerName, setLoadedBuyerName] = useState([]);
  const [loadedBuyerEmail, setLoadedBuyerEmail] = useState([]);
  const [loadedBuyerPhone, setLoadedBuyerPhone] = useState([]);
  let [finished,setfinished] = useState(0)
  
  const auth = useContext(AuthContext);
 

  
    
   

    const [orders,setOrders] = useState([])
    const [statusValues, setstatusValues] = useState([]);
    
    const loadOrders = () =>{
        listBids().then(data =>{
            if(data.error){
                console.log(data.error)
            } else{
                setOrders(data)
            }
        })
        changed = false
    }


    const loadStatusValues = () =>{
        getStatusValuesBids().then(data =>{
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
        if ((loadedName).length == 0){
        loadOrders();
        loadStatusValues();
       }
    },[loadedPhone])
    const showOrdersLength = orders =>{
        let finishedbids = 0
        if(orders.length > 0){
            for (let i= 0; i<orders.length;i++){
                if ((moment(orders[i].createdAt).fromNow()) == `${orders[i].duration} days ago`){
                    finishedbids = finishedbids + 1

                }
            }
            return(
                <div>
                <h1 className="text-danger display-2">Number of finished bids today: {finishedbids}</h1>
                <h3>Total Bids: {orders.length}</h3>
                </div>
            )
        } else{
            return <h1 className="text-danger">No orders</h1>
        }
    }

    

    
    const sendRequest1 = async (o,oIndex) => {
        try {
          
          const response =  await fetch(`https://localhost:5000/api/users/${o.user1}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
         loadedName[oIndex] = (responseData.userWithImages.name)
         loadedEmail[oIndex] =(responseData.userWithImages.email)
         loadedPhone[oIndex] =(responseData.userWithImages.phone)
         
        
        } catch (err) {
         
        }
      
    }

    const getthebuyer = async (o,oIndex) => {
        try {
           
          const response =  await fetch(`https://localhost:5000/api/users/${o.user1}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          loadedBuyerName.push(responseData.userWithImages.name)
         loadedBuyerEmail.push((responseData.userWithImages.email))
         loadedBuyerPhone.push((responseData.userWithImages.phone))
         
        
        } catch (err) {
         
        }
    }
    console.log(loadedName)

    const placeSubmitHandler = async (o,e) => {
        console.log("entered placesubmit handler" )
        
        try{
        console.log(e.target.value)
        
         
        await sendRequest(`https://localhost:5000/api/bid/${o._id}/status/${o.user1}`,'PUT',JSON.stringify({
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

        return fetch(`https://localhost:5000/api/order/5ff1373ec464c44f0d3b64d9/status/5fecede41fdac7456367d4b4`,{
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

                
               

                    
     let countbiddone = []
     const updatefinished = (value) =>{
         setfinished(value)

     }
                
                    return(
                        <div
                        className="mt-5"
                        key={oIndex}
                        style={{borderBottom: "5px solid indigo"}}  
                        > 
                        <h2 className="mo-5"> 
                        <span className="bg-primary">Bid ID: {o._id}</span>

                        <br></br>
                        {(moment(o.createdAt).fromNow()) == `${o.duration} days ago` && <strong>bid done!</strong> && updatefinished(finished+1)}
                        {(moment(o.createdAt).fromNow()) == `${o.duration} day ago` && <strong>bid done!</strong> && updatefinished(finished+1)}

                        {((moment(o.createdAt).fromNow()) != `${o.duration} days ago` || (moment(o.createdAt).fromNow()) != `${o.duration} day ago`) && (moment(o.createdAt).fromNow())}
                       
                        </h2>
                        <ul className="list-group mb-2">
                            <li className="list-group-item"> {showStatus(o)}</li>
                            <li className="list-group-item">Art Title: {o.title}</li>
                            <li className="list-group-item">Amount $: {o.bid}</li>
                            {console.log(loadedPhone)}
                            <li className="list-group-item">Bid By:  {loadedName[oIndex]} {loadedEmail[oIndex]} {layoutRef.current[oIndex]} </li>
                            <li className="list-group-item">The Artist: {loadedBuyerName[oIndex]} {loadedBuyerEmail[oIndex]} {loadedBuyerPhone[oIndex]} </li>
                             {/* {loadedName[oIndex]} {loadedEmail[oIndex]} {loadedPhone[oIndex]} */}
                            <li className="list-group-item">Bid On: <Moment>{(o.createdAt)}</Moment></li>
                            
                            {/* <li className="list-group-item">Total Products in the Order : {o.products.length}</li>
 */}

                        </ul>
                        
                        {/* {o.products.map((p,pIndex) =>(
                            <div className="mb-4" key={pIndex} style={{padding:"20px",border:"1px solid indigo"}}> 
                            
                            {showInput("Product price", p.price)}
                            {showInput("Product total", p.count)}
                            {showInput("Art Title", o.name)}
                            
                            
                            </div> */}

               
                        
                        
                        </div>

                    )
                    
                } )}
                </div>
         
    )
} 

export default ManageBids;