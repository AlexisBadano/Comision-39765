import ProductManager from "./managers/productManager.js";
import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import { Server } from 'socket.io'

const productManager = new ProductManager();

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const io = new Server(server)

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next)=>{
    req.io = io;
    next()
})

app.use('/api/products', productsRouter)
app.use("/api/carts", cartsRouter);
app.use('/', viewsRouter);



io.on('connection', socket=>{
    console.log('New client connected')
})


    const testProduct = {
        title: "PC Gamer",
        description: "descripcion aqui",
        price: 500000,
        thumbnail: "no tiene",
        code: 1,
        stock: 50,
    };
    const testProduct2 = {
        title: "PC Office",
        description: "descripcion aqui4",
        price: 150500,
        thumbnail: "no tiene",
        code: 2,
        stock: 25,
    };
    const testProduct3 = {
        title: "Notebook",
        description: "descripcion aqui4",
        price: 250500,
        thumbnail: "no tiene",
        code: 3,
        stock: 50,
    };
    const testProduct4 = {
        title: "Monitor",
        description: "descripcion aqui4",
        price: 45000,
        thumbnail: "no tiene",
        code: 4,
        stock: 10,
    };
