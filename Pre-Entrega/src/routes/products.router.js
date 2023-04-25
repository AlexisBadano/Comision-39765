import { Router } from "express";

import ProductManager from "../managers/productManager.js";

const router = Router();

const productManager = new ProductManager();
const products = productManager.getProducts();

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

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const products = await productManager.getProductById(parseInt(id));

        return res.send(products);

    } catch (error) {
        res .status(500)
            .send(error)
    }

});

router.post("/", async (req, res) => {
    try {
        const prod = req.body;
        const newProd = await productManager.addProduct(prod);
        res .status(200)
            .send({ status: "Success", message: `${newProd.title} was added succesfully` });
    } catch (error) {
        res
            .status(500)
            .send({ message: "Missing Data, Failed to add product" });
    }
});


router.put("/:pid", async (req, res) => {
    try {

        const id = parseInt(req.params.pid);
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
        const id = parseInt(req.params.pid);

        await productManager.deleteProduct(id);
        res .status(200)
            .send({ status: "Success", message: "Product deleted" });

    } catch (error) {
        res
            .status(500)
            .send({ error: "Internal server error, contact the administrator" });
    }
});


export default router;  