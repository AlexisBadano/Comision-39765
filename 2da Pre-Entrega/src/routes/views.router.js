import { Router } from "express";
import ProductManager from "../dao/mongo/managers/productManager.js";
import productModel from "../dao/mongo/models/products.js";
import CartManager from "../dao/mongo/managers/cartManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();

const router = Router();

router.get('/', async (req, res)=>{
                  
        const {page = 1, limit = 10, search, sort} = req.query;
        
        //Busqueda por query "search", le pasa el query al Paginate que funciona como un find   
        if(search){
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productModel.paginate({category: search}, {page, limit: limit, sort: {price: sort} ,lean: true} )
        const products = docs
        res.render('index', {products, limit , page:rest.page, hasPrevPage, hasNextPage, prevPage, nextPage})
        } else {
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productModel.paginate({ }, {page, limit: limit, lean: true} )
            const products = docs
            res.render('index', {products, limit , page:rest.page, hasPrevPage, hasNextPage, prevPage, nextPage})
        }
    
})

router.get('/products', async (req, res)=>{
                  
    const {page = 1, limit = 10, search, sort} = req.query;
    
    //Busqueda por query "search", le pasa el query al Paginate que funciona como un find   
    if(search){
    const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productModel.paginate({category: search}, {page, limit: limit, sort: {price: sort} ,lean: true} )
    const products = docs
    res.render('index', {products, limit , page:rest.page, hasPrevPage, hasNextPage, prevPage, nextPage})
    } else {
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} = await productModel.paginate({ }, {page, limit: limit, lean: true} )
        const products = docs
        res.render('products', {products, limit , page:rest.page, hasPrevPage, hasNextPage, prevPage, nextPage})
    }

})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

router.get('/chat',(req,res)=>{
    res.render('companyChat')
})

router.get('/cart/:cid', async (req, res)=> {
    const { cid } = req.params;
    const allcarts = await cartManager.getCarts();
    const cart = allcarts.find((cart) => cart._id == cid )
    console.log(cart)
    res.render('cart', {cart})
})


export default router