import { Router } from 'express';
import { read } from 'fs';
import { getAllUsers, createUser } from '../controllers/userControllers';

const router = Router();

router.get('/', async(req, res) => {
   try{
      const info = req.body;
      const data = await getAllUsers(info);
      res.json(data);
   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

router.post('/', async(req, res) => {
   try{
      const data = req.body;
      const property = await createUser(data);
      res.status(201).send(property)  
   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

export default router;