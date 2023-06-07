import { Router } from "express";
import userModel from "../dao/mongo/models/user.js";

const router = Router();

router.post('/register', async (req, res) => {
    const result = await userModel.create(req.body)
    res.send({status:"success", payload: result})
})

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const user = await userModel.findOne( {email, password})

    if (!user){
        return res.status(400).send({status: "error", error: "usuario o contraseña incorrectos"})
    }

    req.session.user = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
    }
    res.status(200).send({message: "Success"});
})


export default router;