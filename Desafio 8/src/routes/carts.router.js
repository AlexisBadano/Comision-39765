import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";


const router = Router();


router.get("/", cartsController.getCarts);

router.get("/:cId", cartsController.getCartById);

router.post("/", cartsController.createCart);

router.put("/:cId/product/:pId", cartsController.updateProductInCart)

router.delete("/:cid", cartsController.deleteCart);

router.delete("/:cid/product/:pid", cartsController.deleteProductInCart);


export default router;