import { Router } from 'express';

const router = Router();

router.get('/', async(req, res) => {
   try{

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