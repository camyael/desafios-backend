import { Router } from "express";
import { Users } from '../dao/config.js';
import passport from "passport";

const router = Router();
const users = new Users;

// inicio de sesion

router.get('/login', (req, res) => {
    const session = req.session.user
    res.render('login/login', {
        session
    })
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/failedpassport'}),async (req, res) => {
    const user = req.user
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        mail: user.mail,
        role: user.role
    }
    res.send({status: "success", payload: "Logueado :)"})
})

// registrarse

router.get('/register', (req, res) => {
    res.render('login/signin')
})

router.post('/register', passport.authenticate('register', {failureRedirect: '/failedregister'}), async (req, res) => {
    const user = req.user;
    res.send({status: "success", payload: user._id})
})

// error en passport

router.get('/failedpassport', (req, res) => {
    console.log("Passport falló");
    res.send({status: error, payload: "Error con passport"});
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