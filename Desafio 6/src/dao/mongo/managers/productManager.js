import productModel from "../models/products.js";

export default class ProductManager {


    getProducts = (params) => {
        return productModel.find(params).lean();
    };
    
    getProductBy = (params) => {
        return productModel.findOne(params);
    };

    addProduct = (product) => {
        return productModel.create(product);
    };

    updateProduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, {$set:product});
    };

    deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id);
    };


};