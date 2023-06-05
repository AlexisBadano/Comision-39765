import fs from 'fs'

import ProductManager from './productManager.js'

const productManager = new ProductManager()

export default class CartManager {
    constructor() {
        (this.carts = []), (this.path = "../files/carts.json");
    }

    appendCarts = async () => {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );
        } catch (error) {
            console.error(error);
        }
    };

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(data);
                return carts;
            }
            return [];
        } catch (error) {
            console.error(error);
        }
    };

    getCartById = async (Id) => {
        try {
            const cart = await this.getCarts();
            const cartId = cart.find((cart) => cart.id === Id);
            if (!cartId) {
                return console.log("Cart Not found");
            } else {
                return cartId;
            }
        } catch (error) {
            console.error(error);
        }
    };

    createCarts = async (cart) => {
        try {
            const carts = await this.getCarts();

            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1

            }
            if (typeof cart.products === "undefined") {
                cart.products = [];
            }
            carts.push(cart);

            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
            console.log("Se ha agregado el nuevo carrito!")
            
            return cart;
        } catch (error) {
            console.error(error);
        }
    };

    addProduct = async (cid, pid, quantity) => {

        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === cid) || {};


        const product = await productManager.getProductById(pid);
        if (Object.keys(cart).length === 0) {
            return "No cart found";
        }
        if (typeof product !== "object") {
            return "No product found";
        }
        if (quantity === 0) {
            return "Quantity must be higher than 0";
        }
        const prodInCart = cart['products'].find((prod) => prod.id === pid) || {};

        if (Object.keys(prodInCart).length === 0) {
            prodInCart.id = pid;
            prodInCart.quantity = quantity;

            cart.products.push(prodInCart);

        } else {
            prodInCart.quantity = prodInCart.quantity + quantity;

        }
        this.carts = carts;
        this.appendCarts();
        return prodInCart;

    };
}