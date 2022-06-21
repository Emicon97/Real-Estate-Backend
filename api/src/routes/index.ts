import { Router } from "express";

const routes: Router = Router();

routes.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Hola Mundo'
    })
})

module.exports = routes