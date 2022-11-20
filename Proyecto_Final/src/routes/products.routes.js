import { Router } from "express";
import Container from "../container/Container.js";
import { uploader } from "../utils.js";

const router = Router()

const administrator = false

const productos = new Container('products')
const allProducts = await productos.getAll()
const PORT = process.env.PORT || 8080;

router.get('/', async (req, res) => {
    // listar todos los productos disponibles
    res.render('products', {
        allProducts,
        administrator
    })
})

router.post('/', uploader.single('image'), async (req, res) => {
    // incorporar productos al listado (disponible para administradores)
    const newProduct = req.body
    const date = new Date().toLocaleString()
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/'+req.file.filename;
        newProduct.image = image
        await productos.save(newProduct, date)
    } else {
        await productos.save(newProduct, date)
    }
    res.redirect('/products')
})

router.get('/:pid', async (req, res) => {
    // un producto por su id (disponible para usuarios y administradores)
    const id = req.params.pid
    const resultado = await productos.getById(id)
    res.render('itemDetail', {
        resultado
    })
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
    if(req.params.pid) {
        const id = req.params.pid
        await productos.deleteById(id)
    } else if (req.body) {
        const del = req.body
        await productos.deleteById(del)
    }
})


export default router