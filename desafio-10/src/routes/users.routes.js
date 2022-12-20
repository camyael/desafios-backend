import { Router } from "express";
import { Users } from '../dao/config.js'

const router = Router();
const users = new Users;

// inicio de sesion

router.get('/login', (req, res) => {
    const session = req.session.user
    res.render('login/login', {
        session
    })
})

router.post('/login', async (req, res) => {
    const { mail, password } = req.body
    if (!mail || !password) {
        return res.status(400).send({status:"error", error: "Los datos estan incompletos"})
    } else {
        const userFind = await users.findUser(mail)
        if (!userFind) {
            res.status(400).send({status:"error", error: "El usuario no existe"})
        }
        else if(userFind.password === password) {
            req.session.user = {
                name: `${userFind.first_name} ${userFind.last_name}`,
                mail: userFind.mail,
                role: userFind.role
            }
            console.log(req.session.user)
            res.send({status: "success", payload: "Logueado :)"})
        } else {
            res.status(400).send({status:"error", error: "La contraseña es incorrecta"})
        }
    }
})

// registrarse

router.get('/register', (req, res) => {
    res.render('login/signin')
})

router.post('/register', async (req, res) => {
    const { first_name, last_name, mail, password } = req.body
    const exist = await users.findUser(mail)
    console.log(exist)
    if(exist) {
        res.status(400).send({status: "error", error: "El usuario ya existe"})
    } else {
        const user = {
            first_name,
            last_name,
            mail,
            password
        }
        const result = await users.save(user)
        console.log(result)
        res.send({status: "success", payload: result._id})
    }
})

// cerrar sesion

router.get('/logout', async (req, res) => {
    // setInterval(() => { //queria hacer un intervalo y que cuando se repitiera cambiara pero no me deja hacer dos response :()
    if(!req.session.user) return res.send(`No has iniciado sesion`)
    const name = req.session.user
    req.session.destroy(err => {
        if (!err) return res.send(`Cerraste sesion! Hasta luego, ${name.name}`)
        else return res.send({status: "error", error: err})
    })
    // }, 2000)
})

export default router;