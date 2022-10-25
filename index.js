import express from 'express'
import Contenedor from './Contenedor.js'

const app = express()

const server = app.listen(8080, () => {
    console.log("Escuchando")
})

server.on("error", error => console.log(error))

// metodos
const objCont = new Contenedor

app.get('/', (req, res) => {
    res.send("Bienvenida tutora :)")
})

app.get('/productos', (req, res) => {
    if(objCont.getAll().length = 0) {
        res.json({
            status: "error",
            message: "No hay productos",
        })
    } else {
        res.json((objCont.getAll()))
    }
})

app.get('/productoRandom', (req, res) => {
    const random = Math.floor(Math.random() * objCont.getAll().length)
    res.json(objCont.getAll()[random])
})

