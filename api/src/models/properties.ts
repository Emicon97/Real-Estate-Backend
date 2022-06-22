import { getModelForClass, prop } from "@typegoose/typegoose";

enum Status { left, reserved, negotiation };
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
   
   @prop()
   public bathrooms?: number;
   
   @prop({ required: true })
   public city: string;

   @prop()
   public neighbourhood?: string;

   @prop()
   public constructionDate?: Date;

   @prop()
   public renovationDate?: Date;

   @prop()
   public parkingSlot: boolean;

   @prop({ required: true, enum: Status })
   public status: Status;
   
}

const propertyModel = getModelForClass(Property);
export default propertyModel;