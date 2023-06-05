import cartModel from "../models/cart.js";

export default class CartManager{

    getCarts =()=>{

         return cartModel.find().lean();
    }

    getCartBy = (params)=>{
         return cartModel.findOne(params).lean();
    }

    createCart = (cart)=>{
        return cartModel.create(cart);
    }

    
    updateCart = (id, cart) => {
        return cartModel.findByIdAndUpdate(
          id,
          { $set: { products: cart.products } }
        );
      };

    deleteCart = (id) =>{
        return cartModel.findByIdAndDelete(id)
    }
   
}