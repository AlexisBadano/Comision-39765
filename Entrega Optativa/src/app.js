import ProductManager from "./dao/fileSystem/managers/productManager.js";
import express from "express";
import productsRouter from "./routes/products.router.js";
import registerChatHandler from "./listeners/chatHandler.js";
import cartsRouter from "./routes/carts.router.mongo.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import { Server } from 'socket.io'
import mongoose from "mongoose";

const productManager = new ProductManager();

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const connection = mongoose.connect("mongodb+srv://alexisbadano:ale123@clusterbackend.yfpzhkf.mongodb.net/ecommerce?retryWrites=true&w=majority")
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



io.on("connection", socket =>{
    registerChatHandler(io, socket);
});

