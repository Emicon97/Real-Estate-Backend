import { Contact, ContactType } from "../models/contact";
import contactModel from "./../models/contact";

async function createContactForm(data: Contact): Promise<Contact> {
  const contact: ContactType = await contactModel.create(data);

  const savedContact: Contact = await contact.save();
  return savedContact;
}

async function getContactByProperty(property: string): Promise<Contact[]> {
  const contact: Contact[] = await contactModel.find({ property });

  if (contact.length) {
    return contact;
  }

  throw new Error("No hay contactos para esta propiedad.");
}

export { createContactForm, getContactByProperty };
