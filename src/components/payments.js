import { useHttpClient } from '../components/hooks/http-hook';
export const getBrainTreeClientToken = (userId) =>{
    return fetch(`https://artq-pi.vercel.app/api/braintree/getToken/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
       
        return response.json();
    })
    .catch(err => console.log(err))
}
export const processPayment = (userId,paymentData) =>{
   
     return fetch(`https://artq-pi.vercel.app/api/braintree/payment/${userId}`,{
        method:"POST",
        body:JSON.stringify({
            paymentData
        })
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log("payment.js issue"))
    
}

export const createOrder = (userId,createOrderData) => {
    console.log(createOrderData)
    return fetch(`https://artq-pi.vercel.app/api/order/create/${userId}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify({order:createOrderData})

    }).then(response =>{
        console.log(response)
        return response.json();
    }).catch(err => console.log(err))
};


export const createBid = (createBidData) => {
    console.log("entered create bid")
    return fetch(`https://artq-pi.vercel.app/api/bid/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify({bid:createBidData})

    }).then(response =>{
        console.log(response)
        return response.json();
    }).catch(err => console.log(err))
};
    
//    try{
    
    
//    await sendRequest('http://localhost:5000/api/order/create/5fc15b5be27c0c6e35dbb8e2','POST',{
//      'Content-Type':'application/json'
//    },JSON.stringify({
    
//     body:JSON.stringify({order:createOrderData})
 
//    }))
//  } catch(err){}
//  };

    
