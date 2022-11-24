import e from 'express'
import fs from 'fs'
import __dirname from '../utils.js'

class Cart {
    constructor() {
        this.path = `${__dirname}/files/carts.json`
        this.creat()
    }

    async creat () {
        if(!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
        }
    }

    async getAllCarts () {
        const getAllCarts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return getAllCarts
    }

    async newCart ( timestamp ) {
        const carts = await this.getAllCarts()
        let id
        const newCart = {
            "id" : id,
            "timestamp" : timestamp,
            "products" : []
        }
        if (carts === 0) newCart.id = 1
        else {
            id = carts.length + 1
            newCart.id = id
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return newCart.id
    }

    async deleteCart ( id ) {
        const carts = await this.getAllCarts()
        const idArray = carts.map(e => e.id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            carts.splice(indice, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        }
    }

    async postInCart ( id, prod ) {
        const productos = await this.getAllCarts()
        const prodArray = productos[id - 1].products
        const comprobarID = prodArray.some(e => e.id === prod.id)

        // comprobamos si el producto ya existe y si existe, solo suma la cantidad
        if(!comprobarID) {
            productos[id - 1].products.push(prod)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
        } else {
            const idArray = productos[id - 1].products.map(e => e.id)
            const indice = idArray.indexOf(prod.id)
            const qntfyOld = productos[id - 1].products[indice].quantify
            productos[id - 1].products[indice].quantify = qntfyOld + prod.quantify
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
        }

        // productos[id - 1].products.push(prod)
        // await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
    }

    async deleteProducts ( idCart, idProd ) {
        const carts = await this.getAllCarts()
        carts[idCart - 1].products = []
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    }
}

export default Cart