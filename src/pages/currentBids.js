import React, { useState, useEffect, useContext }from 'react';
import './styles.css';
import {AuthContext} from "../context/auth-context";
import moment from "moment"
import {useHttpClient} from "../components/hooks/http-hook"

const CurrentBids = () => {
    const {sendRequest,clearError} = useHttpClient();
    const [history,setHistory] = useState([])
    const [duration,setduration] = useState([])
    const [ winningbid, setwinningbid ] = useState(0)
    const [peoplewhobidded,setpeoplewhobidded] = useState([])
    const auth = useContext(AuthContext)
    const userId = auth.userId

    if (duration == "7 minutes ago"){
        alert("hoiiiii")
    }

    const settheduration = (d) =>(
        setduration(d)
    )

    const getwinningbid = async (o) => {
        try {
          const response = await fetch(`http://localhost:5000/api/bid/${o.artId}`);
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }
          console.log(responseData.userWithImages.length)
          for (var i =0; i<responseData.userWithImages.length;i++){
            if(responseData.userWithImages[i].bid>winningbid){
              setwinningbid(responseData.userWithImages[i].bid)
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
          bidHistory(history)
         
         
        } catch (err) {
        }
      };

      useEffect(() =>{
        getbids()
        bidHistory(history)
       
      })

      const updateBidStatus = async (o,winstatus,losestatus) => {
        console.log("entered placesubmit handler" )
        let status = ""
        if (o.bid == winningbid){
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
          
      } catch(err){
      
        console.log(err)
      }
     
     
    };

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
            <div className="mb-5">
                <h3 className="card-header">Your Bids</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                           

                            if ((moment(h.createdAt).fromNow()) == `2 minutes ago`){
                                getallbidsforitem(h)
                                //add for loop
                                console.log("entered")
                                getwinningbid(h)
                                updateBidStatus(h,`you won the bid!`,"you lost the bid")
                                updateSoldStatus(h)
                                
                               
                               
                            }
                            return (
                                
                                <div>
                                    <hr/>
                                  <div key={i}>
                                  <h6>Status: {h.status}</h6>
                                                
                                                <h6>Art title: {h.title}</h6>
                                                <h6>Art bid: ${h.bid}</h6>
                                                <h6>
                                                    Placed bid:{" "}
                                                    {moment(h.createdAt).fromNow()}
                                                     
                                                </h6>
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-9">
                  
                    {bidHistory(history)}

                </div>

            </div>

        </div>
    )
} 

export default CurrentBids;