import CartManager from "../dao/mongo/managers/cartManager.js";
import CartsService from "../services/cart.service.js";

const cartsService = new CartsService(new CartManager());

const getCarts = async (req, res) => {
  try {
    const allCarts = await cartsService.getCarts();
    res
      .status(200)
      .send({ message: "Success", payload: allCarts });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
};

const getCartById = async (req, res) => {
  try {
    const idCart = req.params.cId;
    const allCarts = await cartsService.getCarts();
    const selected = allCarts.find((c) => c._id == idCart);
    res
      .status(200)
      .send({ message: "Success", payload: selected });
  } catch (error) {
    res
      .status(404)
      .send({ status: "Error", error: "Cart not found" });
  }
};

const createCart = async (req, res) => {
  try {
    const cart = req.body;
    await cartsService.createCart(cart);
    res
      .status(200)
      .send({
        status: "Success",
        message: `added succesfully.`,
        payload: cart,
      });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
};

const updateProductInCart = async (req, res) => {
  try {
    const prodId = req.params.pId;
    const cartId = req.params.cId;
    const cart = await cartsService.getCartById({ _id: cartId });

    if (!cart) {
      return res
                .status(404)
                .send({ status: "error", error: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.id == prodId
    );

    if (productIndex === -1) {
      return res
                .status(404)
                .send({ status: "error", error: "Product not found in cart" });
    }

    const updatedQuantity = req.body.quantity;

    //Creo que aca habia que sumarle la cantidad a la ya existente por eso puse el "+="
    cart.products[productIndex].quantity += updatedQuantity;

    await cartsService.updateProductInCart(cartId, cart);

    res
      .status(200)
      .send({ status: "Success", message: `added succesfully.`, payload: cart });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal server error, contact the administrator" });
  }
};

const deleteCart = async (req, res) => {
    try {
        const id = req.params.cid;
        await cartsService.deleteCart({_id: id});
        res 
          .status(200)
          .send({ status: "Success", message: "Cart deleted" });

    } catch (error) {
        res
          .status(500)
          .send({ error: "Internal server error, contact the administrator" });
    }
}

const deleteProductInCart = async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        
        const deletedProductCart = await cartsService.deleteProductInCart(cid, pid);
        
        res.send({ status: "Success"});

      } catch (error) {
        res
          .status(500)
          .send({ error: "Internal server error, contact the administrator" });
      }
}

export default {
  getCarts,
  getCartById,
  createCart,
  updateProductInCart,
  deleteCart,
  deleteProductInCart
};
