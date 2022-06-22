export enum Status {
   available = 'available',
   reserveed = 'reserved',
   negotiotion = 'negotiation'
};

import { getModelForClass, prop, modelOptions, Severity } from "@typegoose/typegoose";
@modelOptions({options: { allowMixed: Severity.ALLOW }})
export class Property {

   @prop({ required: true })
   public address: string;

   @prop()
   public rentPrice?: string;

   @prop()
   public sellPrice?: string;
   
   @prop({ required: true })
   public area: string;
   
   @prop({ required: true })
   public type: string;
   
   @prop({ required: true })
   public rooms: number;
   
   @prop({ default: 1 })
   public bathrooms: number;
   
   @prop({ required: true })
   public city: string;

   @prop({ default: 'No especificado' })
   public neighbourhood?: string;

   @prop()
   public constructionDate?: Date;

   @prop()
   public renovationDate?: Date;

   @prop({ default: false })
   public parkingSlot: boolean;

   @prop({ required: true, enum: Status, default: 'available' })
   public status: Status;

   @prop()
   public pictures: string[]
   
}

const propertyModel = getModelForClass(Property);
export default propertyModel;