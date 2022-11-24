import knex from "knex";

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
})

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
    console.log('Error en la tabla de productos')
}

try {
    let exits = await db.schema.hasTable('chat')
    if(!exits) {
        await db.schema.createTable('chat', tabla => {
            tabla.primary('id')
            tabla.increments('id')
            tabla.string('autor', 30).notNullable()
            tabla.string('message').notNullable()
            tabla.string('date', 50)
            console.log('creada chat')

        })
    }
} catch (error) {
    console.log('Error en la tabla de mensajes')
}

export default db