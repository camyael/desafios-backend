import { Router } from "express";
// import Container from "../container/Container.js";
import { uploader } from "../utils.js";
import Contenedor from "../container/Contenedor.js";
import sqliteOptions from "../database/knex.js";

const router = Router()

const administrator = false

const productos = new Contenedor(sqliteOptions, 'products')

const PORT = process.env.PORT || 8080;

router.get('/', async (req, res) => {
    // listar todos los productos disponibles
    console.log(await productos.getAll())
    res.render('products', {
        administrator
    })
})

router.post('/', uploader.single('image'), async (req, res) => {
    // incorporar productos al listado (disponible para administradores)
    const newProduct = req.body
    // const date = new Date().toLocaleString()
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/'+req.file.filename;
        newProduct.image = image
        // newProduct.date = date
        const prod = {
            title: newProduct.title,
            price: newProduct.price,
            image: image,
        }
        await productos.save(prod)
    } else {
        const prod = {
            title: newProduct.title,
            price: newProduct.price,
            image: image,
        }

        await productos.save(prod)
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
    const id = req.params.pid
    const result = await productos.deleteById(id)
    res.send(result)
})


export default router