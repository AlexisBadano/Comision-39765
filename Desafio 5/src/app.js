import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";


import ProductManager from "./dao/fileSystem/managers/productManager.js";
import registerChatHandler from "./listeners/chatHandler.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

import __dirname from './utils.js';
import { Server } from 'socket.io';

const productManager = new ProductManager();

const app = express();

// Conexion a la Data Base
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const connection = mongoose.connect("mongodb+srv://alexisbadano:ale123@clusterbackend.yfpzhkf.mongodb.net/ecommerce?retryWrites=true&w=majority")
const io = new Server(server)

//Seteo de engine de vistas
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

//Palabritas del poder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next)=>{
    req.io = io;
    next()
})

//Seteo de session y conexión a la DB
app.use(session({
    store: new MongoStore({
        mongoUrl:"mongodb+srv://alexisbadano:ale123@clusterbackend.yfpzhkf.mongodb.net/ecommerce?retryWrites=true&w=majority",
        ttl: 3600,
    }),
    secret:"CoderS3cretFelis",
    resave:false,
    saveUninitialized:false
}))

//Vistas
app.use('/api/products', productsRouter)
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter )
app.use('/', viewsRouter);



io.on("connection", socket =>{
    registerChatHandler(io, socket);
});

