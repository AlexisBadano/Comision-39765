import ProductManager from "../dao/mongo/managers/productManager.js";
import ProductsService from "../services/product.service.js";

const productsService = new ProductsService(new ProductManager());

const getProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    if (products.length == 0) {
      res.send({ message: "There are no products added" });
    } else {
      res.send({ status: "success", payload: products });
    }
  } catch (error) {
    console.log(error);
    res.send("Products not found");
  }
};

const createProduct = async (req, res) => {
  try {
    const prod = req.body;
    const newProd = await productsService.createProduct(prod);
    const products = await productsService.getProducts();
    req.io.emit("products", products);
    res.status(200).send({
      status: "Success",
      message: `${newProd.title} was added succesfully`,
      payload: newProd,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Missing Data, Failed to add product" });
  }
};

const getProductBy = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await productsService.getProductBy({ _id: id });

    res.send({ status: "Success", payload: products });
  } catch (error) {
    console.log(error)
    res
        .status(500)
        .send({message: "Product not found"});
  }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        const product = req.body;

        await productsService.updateProduct(id, product);
        res 
            .status(200)
            .send({ status: "Success", message: "Product updated" });
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .send({ error: "Internal server error, contact the administrator" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.pid;
        await productsService.deleteProduct({_id: id});
        res 
            .status(200)
            .send({ status: "Success", message: "Product deleted" });

    } catch (error) {
        res
            .status(500)
            .send({ error: "Internal server error, contact the administrator" });
    }
}

export default {
  getProducts,
  createProduct,
  getProductBy,
  updateProduct,
  deleteProduct
};
