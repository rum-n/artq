export const listOrders = (userId) =>{
    return fetch(`http://localhost:5000/api/order/list/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getartistinfo = (userId) =>{
    return fetch(`http://localhost:5000/api/users/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const getStatusValues = (userId) =>{
    return fetch(`http://localhost:5000/api/order/status-values/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}

export const updateOrderStatus = (userId,orderId,status) =>{
    return fetch(`http://localhost:5000/api/order/5ff1373ec464c44f0d3b64d9/status/5fecede41fdac7456367d4b4`,{
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

