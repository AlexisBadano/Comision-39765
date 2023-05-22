import { Router } from "express";
import ProductManager from "../dao/mongo/managers/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res)=>{
    const products = await productManager.getProducts();
    res.render('index', {products})
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})

router.get('/chat',(req,res)=>{
    res.render('companyChat')
})


export default router