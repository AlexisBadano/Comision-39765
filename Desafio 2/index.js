import ProductManager from "./productManager.js";

const productManager = new ProductManager() 

const context = async () => {
    

    const testProduct = {
        title: 'PC Gamer',
        description: "descripcion aqui",
        price: 500000,
        thumbnail: "no tiene",
        code: 1,
        stock: 50
    }
    const testProduct2 = {
        title: 'PC Office',
        description: "descripcion aqui4",
        price: 150500,
        thumbnail: "no tiene",
        code: 2,
        stock: 25
    }
    const testProduct3 = {
        title: 'Notebook',
        description: "descripcion aqui4",
        price: 250500,
        thumbnail: "no tiene",
        code: 3,
        stock: 50
    }
    const testProduct4 = {
        title: 'Monitor',
        description: "descripcion aqui4",
        price: 45000,
        thumbnail: "no tiene",
        code: 4,
        stock: 10
    }

    // await productManager.addProduct(testProduct2)
    // await productManager.addProduct(testProduct3)
    // await productManager.addProduct(testProduct4)
    await productManager.updateProduct(3,testProduct);
    // await productManager.deleteProduct(1);
}

context();


