import {
   prop,
   Ref,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";
import { User } from "./users";
import { Property } from "./properties";

export class Contact {

   @prop({ required: true })
   public name: string;

   @prop({ required: true })
   public email: string;

   @prop({ required: true, default: 0 })
   public telephone: number;

   @prop()
   public message: string;

   public user: Ref< User >;
   @prop({ ref: () => User})

   @prop({ ref: () => Property })
   public property: Ref<Property>;

}

type TContactType = ReturnModelType<typeof Contact>;
export type ContactType = DocumentType<Contact>;

const contactModel:TContactType = getModelForClass(Contact);
export default contactModel;