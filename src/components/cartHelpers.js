
export const addItem = (item,next) => {

    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        });
        cart = Array.from(new Set(cart.map(p =>p.id))).map(id => {
            return cart.find(p => p.id === id);
        });
        localStorage.setItem('cart',JSON.stringify(cart));
        next();

    }
}

export const itemTotal = () =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    return 0;
}
export const getCart = () =>{
    if(typeof window !== "undefined"){
        if(localStorage.getItem('cart')){
            console.log(localStorage.getItem('cart'))
            return JSON.parse(localStorage.getItem("cart"));
           
        }
    }
    return [];
}