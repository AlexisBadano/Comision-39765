import { Router } from "express";

import ProductManager from "../dao/mongo/managers/productManager.js";

const router = Router();

const productManager = new ProductManager();


router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;

        if (limit) {
            const products = await productManager.getProducts()
            return res.send(products.slice(0, limit))
        }

        const products = await productManager.getProducts();
        return res.json(products)


    } catch (error) {
        res.status(500).send(error)

    }
}
)
router.post("/", async (req, res) => {
    try {
        const prod = req.body;
        const newProd = await productManager.addProduct(prod);
        const products = await productManager.getProducts()
        req.io.emit('products', products)
        res .status(200)
            .send({ status: "Success", message: `${newProd.title} was added succesfully` });
    } catch (error) {
        res
            .status(500)
            .send({ message: "Missing Data, Failed to add product" });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const products = await productManager.getProductBy({_id: id});

        return res.send(products);

    } catch (error) {
        res .status(500)
            .send(error)
    }

});

router.put("/:pid", async (req, res) => {
    try {

        const id = req.params.pid;
        const body = req.body;

        await productManager.updateProduct(id, body);
        res .status(200)
            .send({ status: "Success", message: "Product updated" });
    } catch (error) {
        res
            .status(500)
            .send({ error: "Internal server error, contact the administrator" });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid;
        console.log(id)
        await productManager.deleteProduct({_id: id});
        res .status(200)
            .send({ status: "Success", message: "Product deleted" });

    } catch (error) {
        res
            .status(500)
            .send({ error: "Internal server error, contact the administrator" });
    }
});


export default router;  