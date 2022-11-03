import express from 'express';
import __dirname from './utils.js';
import productosRouter from './routes/productos_router.js';

const app = express()

const server = app.listen(8080, () => console.log('Bienvenido a mi servidor :)'))
server.on("Error en el servidor", error => console.log(error))

app.use(express.json())
app.use(express.static(__dirname + '/public'))
app.use('/api/productos', productosRouter)

app.get('/', (req, res) => {
    res.send({message:"ok"})
})