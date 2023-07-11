import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";


import ProductManager from "./dao/fileSystem/managers/productManager.js";
import registerChatHandler from "./listeners/chatHandler.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

import __dirname from './utils.js';
import config from './config.js';

import { Server } from 'socket.io';
import initializePassport from "./config/passport.config.js";

const productManager = new ProductManager();

const app = express();

// Conexion a la Data Base
const PORT = config.app.PORT;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const connection = mongoose.connect(config.mongo.URL)
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
        mongoUrl:config.mongo.URL,
        ttl: 3600,
    }),
    secret:"CoderS3cretFelis",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
initializePassport(); 

//Vistas
app.use('/api/products', productsRouter)
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter )
app.use('/', viewsRouter);



io.on("connection", socket =>{
    registerChatHandler(io, socket);
});
