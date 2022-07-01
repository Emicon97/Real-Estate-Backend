import { Router } from 'express';
import {
   createProperty,
   searchProperties,
   getPropById,
   deleteProperty,
   updateProperty,
   getPropertyByOwner
} from '../controllers/propertyControllers';
import { getOwnerById } from '../controllers/userControllers';

const router = Router();

//ruta detalle get by id
//"_id" para postman--> "62b2748be1138fd711ff07a5",
router.get('/:id', async(req, res) => {
   try{
      const { id } = req.params;
      const propById = await getPropById(id);       
      
      res.json(propById);
   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

router.post('/search', searchProperties);


router.post('/:id', async(req, res) => {
   try{
      const { id } = req.body
      const data = req.body;
      const property = await createProperty(data, id);
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

router.post(
   '/:id/search',
   searchProperties,
   getOwnerById,
   getPropertyByOwner
);

router.put('/:id', async(req,res) => {
   try {
      const { id } = req.params;
      const data = req.body;
      const message = await updateProperty(id, data);
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
      const { _id } = req.body;
      const message = await deleteProperty(_id);
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