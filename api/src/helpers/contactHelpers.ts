import { Contact, ContactType } from "../models/contact";
import contactModel from './../models/contact';

async function createContactForm(data:Contact):Promise<Contact>{
   const contact:ContactType = await contactModel.create(data);

   const savedContact:Contact = await contact.save();
   return savedContact;    
}

async function getContactByReceiver(id:string):Promise<Contact>{
   const user:Contact | null = await contactModel.findById(id);

   if (user !== null) {
      return user;
   }

   throw new Error("Hubo un error al procesar sus datos.");
}

export {
   createContactForm,
   getContactByReceiver
}