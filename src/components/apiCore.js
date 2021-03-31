import queryString from 'query-string'

export const list = params =>{
    const query = queryString.stringify(params)
    console.log("query",query)
    return fetch(`https://localhost:5000/api/images/images/search?${query}`,{
        method:"GET"
      
    })
    .then(response =>{
       
        return response.json();
    })
    .catch(err => console.log(err))
}

export const mediums = params =>{
    const query = queryString.stringify(params)
    console.log("query",query)
    return fetch(`https://localhost:5000/api/images/images/medium/search?${query}`,{
        method:"GET"
      
    })
    .then(response =>{
       
        return response.json();
    })
    .catch(err => console.log(err))
}

export const artistsearch = params =>{
    const query = queryString.stringify(params)
    console.log("query",query)
    return fetch(`https://localhost:5000/api/users/images/name/search?${query}`,{
        method:"GET"
      
    })
    .then(response =>{
       
        return response.json();
    })
    .catch(err => console.log(err))
}

export const stylesearch = params =>{
    const query = queryString.stringify(params)
    console.log("query",query)
    return fetch(`https://localhost:5000/api/images/images/style/search?${query}`,{
        method:"GET"
      
    })
    .then(response =>{
       
        return response.json();
    })
    .catch(err => console.log(err))
}