import mongoose from 'mongoose';
import ProductsFS from './product/ProductsFS.js';
import ProductsMongoDb from './product/ProductsMongoDb.js';
import CartFs from './cart/CartFS.js'
import CartMongoDb from './cart/CartMongoDb.js'
import chatHistorial from './messages/ChatMongoDb.js';
import { password } from '../../private/password.js';

let Products
let Carts
let Chat

const PERSISTENCIA = "MONGODB"

if (PERSISTENCIA === "FILESYSTEM") {
    Products = ProductsFS
    Carts = CartFs
} else if (PERSISTENCIA === "MONGODB") {
    Products = ProductsMongoDb
    Carts = CartMongoDb
    Chat = chatHistorial
    const db = 'ecommerce'
    const connection = mongoose.connect(`mongodb+srv://camyael:${password}@codercluster.h6dtsj6.mongodb.net/${db}?retryWrites=true&w=majority`, error => {
        if (error) console.log(`Error al conectar a ${db}` + error);
        else console.log(`Se conectó a ${db}`)
    })
} else {
    console.log(`Error al conectar con ${PERSISTENCIA}`)
}

export { Products, Carts, Chat }