import express from 'express';
import __dirname from './utils.js';
import os from 'os';
import minimist from 'minimist';
import cluster from 'cluster';
import random from './routes/numRandoms.routes.js'

const app = express()
const PORT = process.env.PORT || 8080;

const argv = minimist(process.argv.slice(2));
const CPUs = os.cpus().length;

if(argv._ == 'CLUSTER') {
    if(cluster.isPrimary) {
        console.log(`Proceso primario con PID ${process.pid} ejecutandose`)
        for (let i = 0; i < (CPUs/2); i++) {
            cluster.fork()
        }
    } else {
        console.log(`Proceso worker con PID ${process.pid} ejecutandose`)
        app.listen(PORT, () => console.log("Listening..."))
    }
} else {
    console.log(`Proceso PID ${process.pid} ejecutandose`)
    app.listen(PORT, () => console.log("Listening..."))
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// <--- VISTAS --->
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use('/api/randoms', random)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/info', (req, res) => {
    const info = {
        procesadores : CPUs,
        argumentos_de_entrada : process.argv,
        sistema_operativo : process.platform,
        nodeJS_version : process.version,
        memoria_total_reservada : process.memoryUsage(),
        path_de_ejecucion : __dirname,
        process_id : process.pid,
        carpeta_del_proyecto : process.cwd()
    }
    res.send({info})
})