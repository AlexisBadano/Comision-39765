import mongoose from "mongoose";
import cartModel from "../models/cart.js";

export default class CartManager {
  getCarts = () => {
    return cartModel.find().lean();
  };

  getCartBy = (params) => {
    return cartModel.findOne(params).lean();
  };

  createCart = (cart) => {
    return cartModel.create(cart);
  };

  updateCart = (id, prodId, quant) => {
    return cartModel.findByIdAndUpdate(
      id,
      { $push: { products: { product: new mongoose.Types.ObjectId(prodId) } } }
      // { $set: { products: cart.products } }
    );
  };

  deleteCart = (id) => {
    return cartModel.findByIdAndDelete(id);
  };

  deleteProductInCart = async (cid, pid) => {
    try {
      let cart = await cartModel.findById(cid);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      console.log(cart.products);
      const existingProductIndex = cart.products.findIndex(
        (product) => product.product == pid
      );
      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
      } else {
        throw new Error("producto no encontrado");
      }
      cart = await cart.save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
