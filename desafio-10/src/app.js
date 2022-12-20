import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import { password } from '../private/password.js';
import productsRoute from './routes/products.routes.js';
import cartRoute from './routes/cart.routes.js';
import loginRoute from './routes/users.routes.js'
import chatRoute from './routes/chat.routes.js'
import { Server } from "socket.io";
import { Products, Chat } from './dao/config.js';
import __dirname from './utils.js';

const app = express()
const PORT = process.env.PORT || 8080;

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://camyael:${password}@codercluster.h6dtsj6.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        ttl: 600
    }),
    secret: 'Coder19827632',
    saveUninitialized: false,
    resave: false
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// <--- VISTAS --->
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// <--- RUTAS --->
app.use('/products', productsRoute)
app.use('/carts', cartRoute)
app.use('/chat', chatRoute)
app.use('/', loginRoute)

app.get('/', (req, res) => {
    const session = req.session.user
    res.render('home', {
        session
    })
})

const server = app.listen(PORT, () => console.log("Listening..."))
const io = new Server(server)

const productos = new Products
const chatMessage = new Chat

// let message = []

io.on('connection', async socket => {
    console.log('Socket has been connected')
    
    io.emit('productos', await productos.getAll())

    socket.on('message', async data => {
        await chatMessage.save(data)
        const message = await chatMessage.getAll()
        socket.emit('logs', message)
        io.emit('logs', message)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})