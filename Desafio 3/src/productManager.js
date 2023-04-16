import fs from 'fs'

export default class ProductManager {

    constructor(){
        this.path = '../files/productos.json';
    }


    getProducts = async() => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
            console.log(products)
            return products
        }
            return []

    }     

    addProduct = async({title, description, price, thumbnail, code, stock}) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if(!title||!description||!price||price===0||!thumbnail||!code||!stock){
            console.log("Faltan completar campos")
            return null
        }


        const products = await this.getProducts();
        if (products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length-1].id + 1
        }

        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
        console.log(`se ha agregado ${product.title}`)
        return product

    }

    getProductById = async (productId) => {

       const products = await this.getProducts()


        const productIndex = products.findIndex(product=>product.id === productId)
        if(productIndex === -1){
            console.log("Not Found")
            const error = {Message: 'Invalid ID, product not found'}
            return error
        }
        
        return products[productIndex]

    }


    updateProduct = async (productId, updatedProduct) => {
        const products = await this.getProducts();
        // const productIndex = await this.getProductById(productId);

        const productIndex = products.findIndex(product=>product.id === productId)
        if(productId === -1){
            console.log("Not Found")
        }

        products[productIndex] = {...products[productIndex], ...updatedProduct};

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
        console.log('Se ha modificado el item')

       
    }


    deleteProduct = async (productId) => {
        const products = await this.getProducts();
       
        const productById = products.findIndex(product=>product.id === productId)
        if(productById === -1){
            console.log("Not Found")
        }

        products.splice(productById,1)

        await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))

       

    }







}
