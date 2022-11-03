import { Router } from "express";
import Contenedor from "../contenedor/Contenedor.js";
import { uploader } from "../utils.js";

const router = Router()

const contenedor = new Contenedor()

router.get('/', (req, res) => {
    res.send(contenedor.getAll())
})

router.post('/', uploader.single('image'), async (req, res) => {
    const datos = req.body
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':8080/images/'+req.file.filename;
        datos.image = image
        const save =  await contenedor.save(datos)
        res.send({status:'enviado', message:"Producto agregado con éxito"})
    } else {
        const save =  await contenedor.save(datos)
        res.send({status:'enviado', message:"Producto agregado con éxito"})
    }
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    res.send(contenedor.getById(id))
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const datos = req.body
    const result = await contenedor.putById(id, datos)
    res.send(result)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await contenedor.deleteById(id)
    res.send(result)
})

export default router