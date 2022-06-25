import { Router } from 'express';
import { createProperty,  getAllProperties, getPropById, deleteProperty, updateProperty} from '../controllers/propertyControllers';

const router = Router();

router.get('/', async(req, res) => {
   try{
      
      let allP = await getAllProperties();       
       
      res.json(allP);

   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
})

//ruta detalle get by id
//"_id" para postman--> "62b2748be1138fd711ff07a5",
router.get('/:id', async(req, res) => {
   try{
      let {id} = req.params;
      let propById = await getPropById(id);       
       
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

router.post('/', async(req, res) => {
   try{
      const data = req.body;
      const property = await createProperty(data);
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

router.delete('/',async(req,res) => {
   try {
      const data = req.body.id;
      const message = await deleteProperty(data);
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

export default router;