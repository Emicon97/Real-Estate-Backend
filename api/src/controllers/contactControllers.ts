import { Request, Response } from "express";
import { createContactForm } from '../helpers/contactHelpers';


async function postContactForm (req:Request, res:Response) {
   try{
      const data = req.body;
      const contact = await createContactForm(data);
      res.status(201).send(contact)  
   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

export {
   postContactForm
}