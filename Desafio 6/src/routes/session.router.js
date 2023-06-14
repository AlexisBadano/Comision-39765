import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/register', passport.authenticate('register', {failureRedirect:'/api/sessions/registerFail'}) , async (req, res) => {
    res.send({status:"success", message: 'User registered'})
})

router.get('/registerFail', (req, res) => {
    console.log(req.session.messages)
    res.status(400).send({status: 'error', error: req.session.messages })
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/loginFail'}) , async (req, res) => {
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role

    }

    res.status(200).send({status: "success"});
})

router.get('/loginFail', (req, res) => {
    console.log(req.session.messages)
    res.status(400).send({status:"error", error: req.session.messages})
})

//Trigger para redirigir a Github Callback
router.get('/github', passport.authenticate('github'), (req, res)=>{})

router.get('/githubcallback', passport.authenticate('github'), async (req, res) =>{
    try {
        const user = req.user;
        req.session.user = {
            id: user.id,
            name: user.firstName,
            email: user.email,
            role: user.role,
            bio: user.bio
        }
    res.send({status: 'success', message: 'Login with Github'})
    } catch (error) {
        console.log({status: "BAD", error: error})
    }
})



export default router;