import { Router } from "express";

const routes: Router = Router();

routes.get('/',(req,res)=>{
    res.status(200).send({
        message: 'Hola World'
    })
})

module.exports = routes