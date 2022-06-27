import { Router } from 'express';
import { read } from 'fs';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/userControllers';

const router = Router();

router.get('/', async(req, res) => {
   try{      
      const data = await getAllUsers();
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

router.put('/:id', async(req,res) => {
   try {
      const { id } = req.params;
      const data = req.body;
      const message = await updateUser(id, data);
      res.status(201).send(message)
   } catch (error:any) {
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

router.delete('/',async(req,res) => {
   try {
      const data = req.body.id;
      const message = await deleteUser(data);
      res.status(201).send(message)
   } catch (error:any) {
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

export default router;