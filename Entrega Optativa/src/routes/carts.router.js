import { Router } from "express";
import CartManager from "../dao/mongo/managers/cartManager.js";



const cartManager = new CartManager();
const carts =  cartManager.getCarts();
const router = Router();


router.get("/", async (req, res) => {
  try {
    const allCarts = await carts;
    res.status(200).send(allCarts);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

// router.get("/:cid", async (req, res) => {
//   try {
//     const pos = parseInt(req.params.cid);
//     const cart = await carts;
//     const cartSelect = cart.find((cart) => cart.id === pos);
//     res.status(200).send(cartSelect);
//   } catch (error) {
//     res
//       .status(500)
//       .send({ error: "Internal server error, contact the administrator" });
//   }
// });

router.get("/:cid", async (req, res) => {
  try{
  const pos = parseInt(req.params.cid);
  console.log(pos)
  await cartManager.getCartBy(pos)
  res.status(200).send(pos)
} catch (error) {
  res.status (500)
}
})

router.post("/", async (req, res) => {
  try {
    const cart = req.body;
    await cartManager.createCart(cart);
    res .status(200)
        .send({ status: "Success", message: `added succesfully.` });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const quant = isNaN(req.body?.quantity) ? 0 : parseInt(req.body?.quantity);

    const resAddProduct = await cartManager.addProduct(cid, pid, quant);
    res.status(200).send(resAddProduct);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
});

export default router;