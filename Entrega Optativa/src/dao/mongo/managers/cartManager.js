import cartModel from "../models/cart.js";

export default class CartManager{

    getCarts =()=>{

         return cartModel.find();
    }

    getCartBy = (params)=>{
         return cartModel.findOne(params);
    }

    createCart = (cart)=>{
        return cartModel.create(cart);
    }

    updateCart = (id, cart) =>{
        return cartModel.findByIdAndUpdate(id, {$set: cart});
    }

    deleteCart = (id) =>{
        return cartModel.findByIdAndDelete(id)
    }
   
}