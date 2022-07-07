import { Request, Response } from "express";
import { createContactForm, getContactByProperty } from '../helpers/contactHelpers';

async function getContact (req:Request, res:Response) {
   try{
      const { id } = req.params;
      const contact = await getContactByProperty(id);
      res.status(201).json(contact)  
   }catch(error:any){
      if (error instanceof Error) {
         console.log(error.message);
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function postContactForm (req:Request, res:Response) {
   try{
      const data = req.body;
      const contact = await createContactForm(data);
      res.status(201).json(contact)  
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
   getContact,
   postContactForm
}