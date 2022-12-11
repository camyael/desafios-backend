import { Router } from "express";
import { Carts } from "../dao/config.js";

const router = Router()

const cart = new Carts

router.get('/', async (req, res) => {
    const allCarts = await cart.getAll()
    res.render('carts', {
        allCarts
    })
})

router.post('/', async (req, res) => {
    // Crea un carrito y devuelve su id.
    const timestamp = new Date().toLocaleString()
    await cart.newCart( timestamp )
})

router.delete('/:cid', async (req, res) => {
    // Vacía un carrito y lo elimina.
    const id = req.params.cid
    await cart.deleteCart(id)
})

router.get('/:cid/products', async (req, res) => {
    // Me permite listar todos los productos guardados en el carrito
    const id = req.params.cid
    const findCart = await cart.getById(id)
    const cartProd = findCart.products
    res.render('cart',{
        cartProd
    })
})

router.post('/:cid/products', async (req, res) => {
//     Para incorporar productos al carrito por su id de producto
    const id = req.params.cid
    const prodId = req.body.id
    const prodQntfy = req.body.quantify
    const prod = {
        "id" : prodId,
        "quantify" : prodQntfy
    }
    await cart.postInCart(id, prod)
})

router.delete('/:cid/products/:pid', async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCart = req.params.cid
    const idProd = req.params.pid
    await cart.deleteProducts(idCart, idProd)
})

export default router