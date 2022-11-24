import knex from "knex";

class Contenedor {
    constructor(config, tabla) {
        this.knex = knex(config),
        this.tabla = tabla
    }

    async getAll () {
        const getAll = await this.knex.select('*').from(this.tabla)
        return getAll
    }

    async save ( prod ) {
       await this.knex.insert(prod).into(this.tabla)
    }

    async getById ( id ) {
        const prodID = await this.knex.select('*').from(this.tabla).where('id', id) 
        return prodID
    }

    async putById ( id , datos ) {
        await this.knex.from(this.tabla).where('id', id).update(datos)
    }

    async deleteById ( id ) {
        await this.knex.delete().from(this.tabla).where('id', id)
    }
}

export default Contenedor