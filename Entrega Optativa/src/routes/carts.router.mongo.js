import {Router} from "express";
import CartManager from "../dao/mongo/managers/cartManager.js";

const router= Router();
const serviceCart = new CartManager();

router.get("/", async (req, res)=>{
  const carts = await serviceCart.getCarts();
  res.send({status:"success", payload: carts});
});

router.post("/", async (req, res)=>{
  const {products}=req.body;
  if(!products)return res.status(400).send({status:"error", error: "incompled values"});
  const cart = {
      products
  }
  const result = await serviceCart.createCart(cart);
  res.sendStatus(201);

});

router.put("/:cid", async (req, res)=>{
  const {cid} = req.params;
  const updateCart = req.body;
  await serviceCart.updateCart(cid, updateCart)
  res.sendStatus(201);
});

router.delete("/:cid", async (req, res)=>{
  const {cid} = req.params;
  await serviceCart.deleteCart(cid);
  res.send({status: "success", message: "cart delete"})
})

export default router;