import { Router } from "express";
import { fork } from 'child_process';
import __dirname from '../utils.js'

const router = Router();

const arrayRango = []
for (let i = 1; i <= 1000; i++ ) {
    arrayRango.push([i, 0]) // el 0 va a ser las veces que se repita
}

const arrayDestructuring = (array) => {
    const object = {}
    array.forEach(([key, value]) => object[key] = value)
    return object
}

const array = arrayDestructuring(arrayRango)

router.get('/', (req, res) => {
    const { cant } = req.query;

    const childProcess = fork(__dirname + '/config/numAleatorios.js')
    if(!cant) childProcess.send({ array }) // recibe los datos en numAleatorios.js
    else childProcess.send({ array, cant })
    childProcess.on('message', result => {
        res.send({ status: "sucess", payload: result})
    })
})

export default router;