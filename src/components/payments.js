
export const getBrainTreeClientToken = (userId) =>{
    return fetch(`http://localhost:5000/api/braintree/getToken/5fc15b5be27c0c6e35dbb8e2`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}
export const processPayment = (userId,paymentData) =>{
    console.log(JSON.stringify(paymentData))
   
     return fetch(`http://localhost:5000/api/braintree/payment/5fc15b5be27c0c6e35dbb8e2`,{
        method:"POST",
      
        body:JSON.stringify(paymentData)
      
    })
    .then(response =>{
        console.log("it worked")
     
        return response.json();
    })
    .catch(err => console.log("payment.js issue"))
    
}