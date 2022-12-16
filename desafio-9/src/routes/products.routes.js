import { Router } from "express";
import { Products } from "../dao/config.js";
import { uploader } from "../utils.js";
import generateProducts from "../utils/faker.js";

const router = Router()

const administrator = false

const productos = new Products
const PORT = process.env.PORT || 8080;

router.get('/test', (req, res) => {
    const allProducts = []
    for (let i = 0; i < 7; i++) {
        allProducts.push(generateProducts())
    }
    res.send(allProducts)
})

router.get('/', async (req, res) => {
    // listar todos los productos disponibles
    const allProducts = await productos.getAll()
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
    const updateData = req.body.price
    // const date = new Date().toLocaleString()
    await productos.putById( id, updateData)
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