import ProductManager from "./managers/productManager.js";
import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const productManager = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter)
app.use("/api/carts", cartsRouter);

const context = async () => {
    

    app.listen(8080, () => {
        "Listening on 8080";
    });

    const testProduct = {
        title: "PC Gamer",
        description: "descripcion aqui",
        price: 500000,
        thumbnail: "no tiene",
        code: 1,
        stock: 50,
    };
    const testProduct2 = {
        title: "PC Office",
        description: "descripcion aqui4",
        price: 150500,
        thumbnail: "no tiene",
        code: 2,
        stock: 25,
    };
    const testProduct3 = {
        title: "Notebook",
        description: "descripcion aqui4",
        price: 250500,
        thumbnail: "no tiene",
        code: 3,
        stock: 50,
    };
    const testProduct4 = {
        title: "Monitor",
        description: "descripcion aqui4",
        price: 45000,
        thumbnail: "no tiene",
        code: 4,
        stock: 10,
    };

    // await productManager.addProduct(testProduct2)
    // await productManager.addProduct(testProduct3)
    // await productManager.addProduct(testProduct4)
    // await productManager.updateProduct(3,testProduct);
    // await productManager.deleteProduct(3);
    // await productManager.getProducts();
};

context();
