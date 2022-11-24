import { Router } from "express";
import Contenedor from "../container/Contenedor.js";
import sqliteOptions from "../database/knex.js";

const router = Router();

const mensajes = new Contenedor(sqliteOptions, 'chat')

router.get('/', (req, res) => {
    res.render('chat')
})

export default router;