import fs from 'fs'

class Contenedor {
    constructor(objeto, precio) {
        this.objeto = objeto,
        this.precio = "$" + precio
    }

    save = async (prod) => {
            const idLength = prod.length + 1

            return idLength
        
    }

    getById(id) {
        //obtiene un id por parametro y devuelve el objeto
        const object = productos.find(e => e.id === id)
        return object
    }

    getAll() {
        let array = JSON.parse(fs.readFileSync('./productos.JSON', "utf-8"))
        return array
    }

    deleteById(id) {
        const object = productos.find(e => e.id === id)
        const buscar = productos.indexOf(object.id)
        return productos.splice(buscar, 1)
    }

    deleteAll() {
        const vacio = []
        return vacio
    }
}

export default Contenedor

const metodos = new Contenedor("Margaritas", 300)
let productos = []

const item = {
    objeto : metodos.objeto,
    precio : metodos.precio
}


// async function Productos() {
//     try {
//         // comprueba que exista el archivo primero
//         if(fs.existsSync('./productos.JSON')) {
//             let data = JSON.parse(await fs.promises.readFile('./productos.JSON', "utf-8"))
//             productos = data

//             // <--- guardar un producto y asignar id --->
//             let id = await metodos.save(data)
//             let comprobarID = productos.some(e => e.id === id)
//             if(!comprobarID){
//                 //comprueba si existe ese id para que no se repita
//                 item.id = id
//             } else {
//                 item.id = id + 1
//             }
//             productos.push(item)
//             // <--- obtener por id --->
//             //console.log(metodos.getById(2))

//             // <--- obtener por array --->
//             //console.log(metodos.getAll())

//             // <--- borrar por id --->
//             //productos = metodos.deleteById(2)

//             // <--- borrar todo --->
//             //productos = metodos.deleteAll()

//             await fs.promises.writeFile('./productos.JSON', JSON.stringify(productos, null, 2))
//         } else {
//             let id = metodos.save(productos)
//             item.id = id
//             productos.push(item)
//             await fs.promises.writeFile('./productos.JSON', JSON.stringify(productos, null, 2))
//         }
//     }
//     catch (error){
//         console.log(error)
//     }
// }
// Productos()