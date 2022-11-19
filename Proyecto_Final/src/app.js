import express from 'express'
import productsRoute from './routes/products.routes.js'
import cartRoute from './routes/cart.routes.js'
import __dirname from './utils.js';

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// <--- VISTAS --->
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

// <--- RUTAS --->
app.use('/products', productsRoute)
app.use('/carts', cartRoute)

app.get('/', (req, res) => {
    res.render('home')
})

const server = app.listen(PORT, () => console.log("Listening..."))