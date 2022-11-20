import { Router } from "express";
import Container from "../container/Container.js";
import { uploader } from "../utils.js";

const router = Router()

const PORT = process.env.PORT || 8080; //por si el servidor necesita usar otro puerto

const contenedor = new Container("products")
const productos = contenedor.getAll()

router.get("/", (req, res) => {
    res.render("form", {
        productos
    })
})

router.post("/", uploader.single('image'), async (req, res) => {
    const datos = req.body
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/'+req.file.filename;
        datos.image = image
        await contenedor.save(datos)
    } else {
        await contenedor.save(datos)
    }
    res.redirect("/form")
})

export default router
