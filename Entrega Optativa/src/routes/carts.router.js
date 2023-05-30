import { Router } from "express";
import CartManager from "../dao/mongo/managers/cartManager.js";
import ProductManager from "../dao/mongo/managers/productManager.js";

const productManager = new ProductManager();

const cartManager = new CartManager();

const router = Router();


router.get("/", async (req, res) => {
  try {
    const allCarts = await cartManager.getCarts();
    res.status(200).send(allCarts);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.get(`/:cId`, async (req, res) => {
  try {
    const idCart = req.params.cId;
    const allCarts = await cartManager.getCarts();
    const selected = allCarts.find((c) => c._id == idCart);
    res.send(selected);
  } catch (error) {
    return res.status(404).send({ status: "error", error: "not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = req.body;
    await cartManager.createCart(cart);
    res.status(200)
      .send({ status: "Success", message: `added succesfully.` });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.put("/:cId/product/:pId", async (req, res) => {

  const prodId = req.params.pId;
  const cartId = req.params.cId;
  const cart = await cartManager.getCartBy({ _id: cartId });


  if (!cart) {
    return res.status(404).send({ status: "error", error: "Cart not found" })
  };

  const productIndex = cart.products.findIndex((product) => product.id == prodId);

  if (productIndex === -1) {
    return res.status(404).send({ status: "error", error: "Product not found in cart" })
  };

  const updatedQuantity = req.body.quantity;
  
  //Creo que aca habia que sumarle la cantidad a la ya existente por eso puse el "+="
  cart.products[productIndex].quantity += updatedQuantity;

  await cartManager.updateCart(cartId, cart)

  res
    .status(200)
    .send({ status: "Success", message: `added succesfully.` });


})

export default router;