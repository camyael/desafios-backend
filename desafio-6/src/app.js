import express from "express"
import __dirname from "./utils.js"
import productsRouter from './routes/products.routes.js'
import { Server } from "socket.io"
import Contenedor from "./Contenedor.js"

const app = express()
const PORT = process.env.PORT || 8080; //por si el servidor necesita usar otro puerto

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', productsRouter)
app.use(express.static(__dirname + "/public"))

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const io = new Server(server)

const contenedor = new Contenedor

let message = []

io.on('connection', socket => {
    console.log('Socket has been connected')
    contenedor.getAll().then(productos => {
        io.emit('productos', productos)
    })

    socket.emit('logs', message)
    socket.on('message', data => {
        message.push(data)
        io.emit('logs', message)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})