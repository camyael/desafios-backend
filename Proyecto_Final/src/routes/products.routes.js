import { Router } from "express";
import Container from "../container/Container.js";
import { uploader } from "../utils.js";

const router = Router()

const productos = new Container('products')
const allProducts = await productos.getAll()

router.get('/', async (req, res) => {
    // listar todos los productos disponibles
    res.render('products', {
        allProducts
    })
})

router.post('/', uploader.single('image'), async (req, res) => {
    // incorporar productos al listado (disponible para administradores)
    const newProduct = req.body
    const date = new Date().toLocaleString()
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/'+req.file.filename;
        datos.image = image
        await productos.save(newProduct, date)
    } else {
        await productos.save(newProduct, date)
    }
})

router.get('/:pid', async (req, res) => {
    // un producto por su id (disponible para usuarios y administradores)
    const id = req.params.pid
    const resultado = await productos.getById(id)
    res.send(resultado)
})

router.put('/:pid', async (req, res) => {
    // actualiza un producto por su id (disponible para administradores)
    const id = req.params.pid
    const datos = req.body
    const date = new Date().toLocaleString()
    await productos.putById( id, datos, date)
})

router.delete('/:pid', async (req, res) => {
    // borra un producto por su id (disponible para administradores)
    const id = req.params.pid
    await productos.deleteById(id)
})


export default router