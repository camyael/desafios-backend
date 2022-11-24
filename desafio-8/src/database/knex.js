import knex from "knex";
import __dirname from "../utils.js";

const sqliteOptions = {
    client: "sqlite3",
    connection: {
        filename: __dirname + "/DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}
const db = knex(sqliteOptions)

try {
    let exits = await db.schema.hasTable('products')
    if(!exits) {
        await db.schema.createTable('products', tabla => {
            tabla.primary('id')
            tabla.increments('id')
            tabla.string('title', 30).notNullable()
            tabla.float('price').notNullable()
            tabla.string('image', 2000)
            console.log('creada products')
        })
    }
} catch (error) {
    console.log('Error en la tabla de productos' + error)
}

try {
    let exits = await db.schema.hasTable('chat')
    if(!exits) {
        await db.schema.createTable('chat', table => {
            table.primary('id')
            table.increments('id')
            table.string('autor', 30).notNullable()
            table.string('message').notNullable()
            table.string('date', 50)
            console.log('creada chat')
        })
    }
} catch (error) {
    console.log('Error en la tabla de mensajes')
}

export default sqliteOptions;