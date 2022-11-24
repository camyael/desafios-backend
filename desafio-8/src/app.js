import express from 'express';
import productsRoute from './routes/products.routes.js';
import cartRoute from './routes/cart.routes.js';
import formRoute from './routes/form.routes.js'
import { Server } from "socket.io";
// import Container from './container/Container.js';
import Contenedor from './container/Contenedor.js';
import db from './database/knex.js'
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
app.use('/form', formRoute)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/chat', (req, res) => {
    res.render('chat')
})

const server = app.listen(PORT, () => console.log("Listening..."))
const io = new Server(server)

const productosSQL = new Contenedor(db, 'products')
const mensajesSQL = new Contenedor(db, 'chat')

let message = []

io.on('connection', async socket => {
    console.log('Socket has been connected')

    socket.emit('products', await productosSQL.getAll())

    socket.emit('logs', message)
    socket.on('message', async data => {
        message.push(data)
        io.emit('logs', message)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})