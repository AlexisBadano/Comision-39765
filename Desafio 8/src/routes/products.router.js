import { Router } from "express";

import ProductManager from "../dao/mongo/managers/productManager.js";
import productModel from "../dao/mongo/models/products.js";
import productsController from "../controllers/products.controller.js";

const router = Router();

const productManager = new ProductManager();


router.get('/', productsController.getProducts);

router.post("/", productsController.createProduct);

router.get("/:id", productsController.getProductBy);

router.put("/:pid", productsController.updateProduct);

router.delete("/:pid", productsController.deleteProduct);


export default router;  