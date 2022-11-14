import fs from 'fs'
import __dirname from './utils.js'

const path = __dirname+'/files/productos.json'

class Contenedor {
    save = async (prod) => {
        if(fs.existsSync(path)) {
            let data = await fs.promises.readFile(path, "utf-8")
            let prodArray = JSON.parse(data)
            if (prodArray.length === 0) {
                prod.id = 1
                prodArray.push(prod)
                await fs.promises.writeFile(path, JSON.stringify(prodArray, null, 2))
            } else {
                const id = prodArray.length + 1
                prod.id = id
                prodArray.push(prod)
                await fs.promises.writeFile(path, JSON.stringify(prodArray, null, 2))
            }
        } else {
            prod.id = 1
            await fs.promises.writeFile(path, JSON.stringify([prod], null, 2))
        }
    }

    async getAll() {
        let array = JSON.parse(fs.readFileSync(path, "utf-8"))
        return array
    }

    getById(id) {
        let array = JSON.parse(fs.readFileSync(path, "utf-8"))
        const comprobarID = array.some(e => e.id == id)
        if(!comprobarID) {
            return {error: 'producto no encontrado'}
        } else {
            const productoID = array.filter(e => e.id == id)
            return {productoID}
        }
    }

    deleteById = async (id) => {
        let prodArray = JSON.parse(await fs.promises.readFile(path, "utf-8"))
        const comprobarID = prodArray.some(e => e.id == id)
        if(!comprobarID) {
            return {error: 'producto no encontrado'}
        } else {
            const idArray = prodArray.map(e => e.id)
            const indice = idArray.indexOf(parseInt(id))
            if (indice != -1) {
                prodArray.splice(indice, 1)
                await fs.promises.writeFile(path, JSON.stringify(prodArray, null, 2))
                return {message: "Producto borrado con éxito"}
            } else {
                return {message: "Producto no encontrado"}
            }
        }
    }

    putById = async(id, datos) => {
        const data = JSON.parse(await fs.promises.readFile(path, 'utf-8'))
        const idArray = data.map(e => e.id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            const productoID = data.filter(e => e.id == id)
            const newItem = datos
            newItem.id = indice + 1
            data[indice] = newItem
            await fs.promises.writeFile(path, JSON.stringify(data, null, 2))
            return {message: "Precio actualizado con éxito", payload:productoID}
        } else {
            return {error: 'producto no encontrado'}
        }
    }
}

export default Contenedor