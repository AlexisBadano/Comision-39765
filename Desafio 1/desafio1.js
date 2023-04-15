

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct = ({ title, description, price, thumbnail, code, stock }) => {
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // Valida que todos los campos esten llenos, y que el precio sea mayor a 0

    if (
      !title ||
      !description ||
      !price ||
      price === 0 ||
      !thumbnail ||
      !code ||
      !stock
    ) {
      console.log("Faltan completar campos");
      return null;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );

    // Chequea si el codigo ya existe y si lo encuentra retorna un null y sale del if.

    if (existingProduct) {
      console.log("Ya existe un producto con este codigo");
      return null;
    }

    // Chequea el largo del array para saber si hay productos, si no hay inicializa el primero en 1. Si por el contrario si hay, accede al ultimo item del array, saca su id y le suma 1 al nuevo

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      const lastProduct = this.products[this.products.length - 1];
      product.id = lastProduct.id + 1;
    }
    console.log("producto agregado satisfactoriamente!");
    this.products.push(product);
  };

  //Metodo que solo trae todo lo que hay dentro del array products

  getProduct = () => {
    return this.products;
  };

  //Metodo que busca un item mediante su "id", para esto busca el item cuyo Id sea igual al Id pasado por parametro, si lo encuentra retorna su indice y con éste finalmente retorna el producto que se encuentra en dicho indice
  getProductById = (productId) => {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      console.log("Not Found");
      return null;
    }
    return this.products[productIndex];
  };
}

const testProduct = {
  title: "PC",
  description: "descripcion",
  price: 150000,
  thumbnail: "no tiene",
  code: 2,
  stock: 50,
};
const testProduct2 = {
  title: "Notebook",
  description: "Mismo 'code' que el testProduct",
  price: 250500,
  thumbnail: "no tiene",
  code: 2,
  stock: 50,
};
const testProduct3 = {
  title: "Notebook",
  description: "descripcion aqui",
  price: 250500,
  thumbnail: "no tiene",
  code: 3,
  stock: 50,
};

const productManager = new ProductManager();

productManager.addProduct(testProduct);
productManager.addProduct(testProduct2);
productManager.addProduct(testProduct3);
productManager.addProduct(testProduct3);
console.log(productManager.getProduct());
console.log(productManager.getProductById(1));
