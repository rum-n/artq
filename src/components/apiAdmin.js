export const listOrders = (userId) =>{
    return fetch(`http://localhost:5000/api/order/list/${userId}`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}