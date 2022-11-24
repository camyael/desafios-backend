import fs from 'fs';
import __dirname from '../utils.js';

class Container {
    constructor(path) {
        this.path = `${__dirname}/files/${path}.json`
        this.creat()
    }

    async creat () {
        if(!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
        }
    }

    async getAll () {
        const getAll = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return getAll
    }

    async save ( add , date ) {
        const all = await this.getAll()
        const code = Math.floor(Math.random() * 99999)
        if(all === 0) {
            add.id = 1
            add.timestamp = date
            add.code = code
            all.push(add)
            await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2))
        } else {
            const id = all.length + 1
            add.id = id
            add.timestamp = date
            add.code = code
            all.push(add)
            await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2))
        }
    }

    async getById ( id ) {
        const all = await this.getAll()
        const result = all.find(e => e.id == id)
        return result
    }

    async putById ( id , datos, date ) {
        const data = await this.getAll()
        const idArray = data.map(e => e.id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            const newItem = datos
            newItem.id = indice + 1
            newItem.timestamp = date
            data[indice] = newItem
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
        } else {
            return {error: 'producto no encontrado'}
        }
    }

    async deleteById ( id ) {
        const datos = await this.getAll()
        const idArray = datos.map(e => e.id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            datos.splice(indice, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(datos, null, 2))
            return {message: "Producto borrado con éxito"}
        } else {
            return {message: "Producto no encontrado"}
        }
    }
}

export default Container