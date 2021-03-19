export const listOrders = (userId) =>{
    return fetch(`https://artq-pi.vercel.app/api/order/list/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const listBids = () =>{
    return fetch(`https://artq-pi.vercel.app/api/bid`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}


export const getartistinfo = (userId) =>{
    return fetch(`https://artq-pi.vercel.app/api/users/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getStatusValues = (userId) =>{
    return fetch(`https://artq-pi.vercel.app/api/order/status-values/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getStatusValuesBids = () =>{
    return fetch(`https://artq-pi.vercel.app/api/bid/status-values/5ff4e6ce7e77c6d1eb713e86`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateOrderStatus = (userId,orderId,status) =>{
    return fetch(`https://artq-pi.vercel.app/api/order/5ff1373ec464c44f0d3b64d9/status/5fecede41fdac7456367d4b4`,{
        method:"PUT",
        body:{
            "orderId" : "5ff1373ec464c44f0d3b64d9",
            "status":"hiiii"
        }
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

