import React, { useState, useEffect, useContext }from 'react';
import './styles.css';
import {AuthContext} from "../context/auth-context";
import moment from "moment"
import Button from 'react-bootstrap/Button';
import {useHttpClient} from "../components/hooks/http-hook"
import { addItem, removeItem } from "../components/cartHelpers"
import {Redirect} from "react-router-dom";

const CurrentBids = () => {
    const {sendRequest,clearError} = useHttpClient();
    const [history,setHistory] = useState([])
    const [duration,setduration] = useState([])
    const [ winningbid, setwinningbid ] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [peoplewhobidded,setpeoplewhobidded] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    const settheduration = (d) =>(
        setduration(d)
    )

    const getwinningbid = async (o) => {
        try {
          let winning = 0
          const response = await fetch(`http://localhost:5000/api/bid/${o.artId}`);
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          console.log(responseData.userWithImages.length)
          for (var i =0; i<responseData.userWithImages.length;i++){
            if(responseData.userWithImages[i].bid>winningbid){
              setwinningbid(responseData.userWithImages[i].bid)
              winning = responseData.userWithImages[i].bid
            }
    
          }
        
        } catch (err) {
          
        }
      };

    const getbids = async () => {

        try {
          const response = await fetch(`http://localhost:5000/api/bid/user/${userId}`);
          const responseData = await response.json();
          
          if (!response.ok) {
            throw new Error(responseData.message);
          }  
          setHistory(responseData.userWithImages)
          
         
         
        } catch (err) {
        }
      };

      useEffect(() =>{
        getbids()
        bidHistory(history)
       
      })

      const updateBidStatus = async (o,winning,winstatus,losestatus) => {
        console.log("entered placesubmit handler" )
        let status = ""
        if (o.bid == winning){
            status = winstatus
        }
        else{
            status = losestatus
        }
        
        try{
      
        
         
        await sendRequest(`http://localhost:5000/api/bid/${o._id}/status/${o.user1}`,'PUT',JSON.stringify({
            "orderId" : o._id,
           "status":status
        }),{
            'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
          })
          window.location.reload()
      } catch(err){
      
        console.log(err)
      }
     
     
    };

    const addToCart =() =>{
      console.log(history)
      addItem(history[0],() =>{
        setRedirect(true)
      })
    }
    const shouldRedirect = redirect =>{
      if(redirect){
        return <Redirect to="/cart"/>
      }
    }

   

    const updateSoldStatus = async (o) =>{
      try{
      
    
    
     
        await sendRequest(`http://localhost:5000/api/images/sold/${o.artId}`,'PUT',JSON.stringify({
          "id":o.artId,
          "status":"sold"
        }),{
            'Content-Type':'application/json',Authorization: 'Bearer '+auth.token
          })
      
      } catch(err){
      
        console.log(err)
      }
    }

    const getallbidsforitem = async (o) => {
        try {
          const response = await fetch(`http://localhost:5000/api/bid/${o.artId}`);
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          
          peoplewhobidded.push(responseData.userWithImages.user1);
        
         
        } catch (err) {
          
        }
      };
    
      const bidHistory = history => {
        return (
            <div>
                <h1 className="feed-title">Here's the artwork you're currently bidding on:</h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                          if ((moment(h.createdAt).fromNow()) == `2 minutes ago`){
                            console.log("DONE!!!!")
                           

                            //getallbidsforitem(h)
                            //add for loop
                            
                            getwinningbid(h)
                            {console.log(winningbid)}
                            updateBidStatus(h,winningbid,`you won the bid!`,"you lost the bid")
                          
                            
                            updateSoldStatus(h)
                          }
                          return (
                          <div>
                            <hr/>
                            <div key={i}>
                              <h6>Status: {h.status}</h6>                                                
                              <h6>Art title: {h.title}</h6>
                              <h6>Art bid: ${h.bid}</h6>
                              <h6>Placed bid:{" "}
                                  {moment(h.createdAt).fromNow()}  
                              </h6>
                              {h.status=="you won the bid!" && <Button className="add-to-cart" variant="secondary" onClick={addToCart}>Add to cart</Button>}
                            </div>
                          </div>
                          );
                          })}
                    </li>
                </ul>
            </div>
        );
    };

    return(
        <div>  
          {bidHistory(history)}
        </div>
    )
} 

export default CurrentBids;