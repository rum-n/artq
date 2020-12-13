export const getBrainTreeClientToken = (userId) =>{
    return fetch(`http://localhost:5000/api/braintree/getToken/5fc15b5be27c0c6e35dbb8e2`,{
        method:"GET"
      
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}