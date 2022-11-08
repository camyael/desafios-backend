import express from "express"
import __dirname from "./utils.js"

const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public"))

const productos = []

app.get("/", (req, res) => {
    res.render("pages/formulario")
})

app.get("/productos", (req, res) => {
    res.render("pages/productos", {
        productos
    })
})

app.post("/productos", async (req, res) => {
    const data = await req.body
    productos.push(data)
    res.redirect("/")
})

const server = app.listen(8080, () => console.log("Escuchando..."))