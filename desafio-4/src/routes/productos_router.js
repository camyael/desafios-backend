import { Router } from "express";
import Contenedor from "../contenedor/Contenedor.js";

const router = Router()

const contenedor = new Contenedor()

router.get('/', (req, res) => {
    res.send(contenedor.getAll())
})

router.post('/', async (req, res) => {
    const {title,price} = req.body
    const newProducto = {
        title,
        price
    }
    const save =  await contenedor.save(newProducto)
    res.send({status:'enviado', payload:newProducto})
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.send(contenedor.getById(id))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    res.send(contenedor.putById(id))
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await contenedor.deleteById(id)
    res.send(result)
})

export default router