import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res)=>{
    const products = await productManager.getProducts();
    res.render('index', {
        products
    })
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})


export default router