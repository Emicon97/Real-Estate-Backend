import { Router } from 'express';
import { createProperty,  getAllProperties} from '../controllers/propertyControllers';

const router = Router();

router.get('/', async(req, res) => {
   try{
      
       let allP = await getAllProperties();
       
       /* if(!allP.length){
         res.send("No hay propiedades cargadas!!");
       }else{ */
         res.json(allP);
       ///*  */}
       
       //res.send("hola");
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
      let{
         address,         
         area,
         type,
         rooms,
         status,
         city,
         bathrooms,
         neighbourhood,
         constructionDate,
         renovationDate,
         parkingSlot,
         rentPrice,
         sellPrice
      } = req.body
      const property = await createProperty(
         address,         
         area,
         type,
         rooms,
         status,
         city,
         bathrooms,
         neighbourhood,
         constructionDate,
         renovationDate,
         parkingSlot,
         rentPrice,
         sellPrice
      );
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