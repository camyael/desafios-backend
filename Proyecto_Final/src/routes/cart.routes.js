import { Router } from "express";
import Cart from "../container/Cart.js";

const router = Router()

const cart = new Cart

router.get('/', (req, res) => {
    res.render('carts')
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
    const carts = await cart.getAllCarts()
    const findCart = carts.find(e => e.id == id)
    res.send(findCart.products)
})

router.post('/:cid/products', async (req, res) => {
//     Para incorporar productos al carrito por su id de producto
// {
//   Id : id del producto,
//   Quantity: cantidad de piezas solicitadas de ese producto.
// }
// ¿Y si mando a agregar dos veces el mismo id de producto?
    const id = req.params.cid
    const prod = req.body
    await cart.postInCart(id, prod)
})

router.delete('/:cid/products/:pid', async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCart = req.params.cid
    const idProd = req.params.pid
    await cart.deleteProducts(idCart, idProd)
})

export default router