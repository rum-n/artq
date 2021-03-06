
import DropIn from "braintree-web-drop-in-react"
export const addItem = (item,next) => {
    console.log(item)

    let cart = []
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            name:item.name,
            count: 1
        });
        cart = Array.from(new Set(cart.map(p =>p.id))).map(id => {
            return cart.find(p => p.id === id);
        });
        localStorage.setItem('cart',JSON.stringify(cart));
        next();
    }
}

export const removeItem = (productId, count) => {
    let cart =[];
    if (typeof window !== "undefined"){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,i) => {
            if (product.id === productId){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    return cart;

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
    if (typeof window !== "undefined"){
        if (localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
}

export const emptyCart = next =>{
    if (typeof window!== "undefined"){
        localStorage.removeItem("cart");
        next();
    }
}