import { Router } from "express";
import { uploader } from "../utils.js";
import Contenedor from "../container/Contenedor.js";

const router = Router()

const PORT = process.env.PORT || 8080; //por si el servidor necesita usar otro puerto

const contenedor = new Contenedor
const productos = contenedor.getAll()

router.get("/", (req, res) => {
    res.render("pages/formulario", {
        productos
    })
})

router.post("/", uploader.single('image'), async (req, res) => {
    const datos = req.body
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/'+req.file.filename;
        datos.image = image
        const save =  await contenedor.save(datos)
        
    } else {
        const save =  await contenedor.save(datos)
    }
    console.log(productos)
    res.redirect("/")
})

router.get('/chat', (req, res) => {
    res.render('pages/chat')
})

export default router