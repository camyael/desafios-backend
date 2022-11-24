import knex from "knex";

class Contenedor {
    constructor(config, tabla) {
        this.knex = knex(config),
        this.table = tabla
    }

    async getAll () {
        return this.knex.select('*').from(this.table)
    }

    async save ( prod ) {
        await this.knex.insert(prod).into(this.table)
        console.log( await this.getAll())
    }

    async getById ( id ) {
        const prodID = this.knex.select('*').from(this.table).where('id', id) 
        return prodID
    }

    async putById ( id , datos ) {
        this.knex.from(this.table).where('id', id).update(datos)
    }

    async deleteById ( id ) {
        await this.knex.delete().from(this.table).where('id', id)
        return `Eliminado producto ${id} de la base de datos`
    }
}

export default Contenedor