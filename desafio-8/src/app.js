import express from 'express';
import productsRoute from './routes/products.routes.js';
import cartRoute from './routes/cart.routes.js';
import chatRoute from './routes/chat.routes.js';
import { Server } from "socket.io";
// import Container from './container/Container.js';
import Contenedor from './container/Contenedor.js';
import sqliteOptions from './database/knex.js'
import __dirname from './utils.js';

const app = express()
const PORT = process.env.PORT || 8080;

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

app.get('/', (req, res) => {
    res.render('home')
})

const server = app.listen(PORT, () => console.log("Listening..."))
const io = new Server(server)

const productosSQL = new Contenedor(sqliteOptions, 'products')
const mensajesSQL = new Contenedor(sqliteOptions, 'chat')

let message = []

io.on('connection', async socket => {
    console.log('Socket has been connected')

    productosSQL.getAll().then( res => {
        io.emit('products', res)
    })
    

    socket.emit('logs', message)
    socket.on('message', async data => {
        message.push(data)
        io.emit('logs', message)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})