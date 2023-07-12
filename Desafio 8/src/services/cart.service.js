export default class CartsService{
    constructor(dao){
        this.dao = dao;
    }

    getCarts =()=>{
       return this.dao.getCarts();
    }

    getCartById =(params)=>{
        return this.dao.getCartById(params);
    }

    createCart =(cart)=>{
        return this.dao.createCart(cart);
    }

   addProductToCart = (cid, pid)=>{
        return this.dao.addProductToCart(cid, pid)
    }

    deleteProductToCart = (cid, pid)=>{
        return this.dao.deleteProductToCart(cid, pid)
    }

    updateProductInCart =(cid, pid, newQuantity)=>{
        return this.dao.updateProductInCart(cid, pid, newQuantity)
    }

    deleteCart =(cid)=>{
        return this.dao.deleteCart(cid)
    }

}