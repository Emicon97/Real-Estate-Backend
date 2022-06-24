import {
   prop,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";

enum Status {
   available = 'available',
   reserveed = 'reserved',
   negotiotion = 'negotiation'
};

export class Property {

   @prop({ required: true })
   public address: string;

   @prop()
   public rentPrice?: number;

   @prop()
   public sellPrice?: number;
   
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

   @prop({ type: String })
   public pictures: string[];
   
}

type TPropertyModel = ReturnModelType<typeof Property>;
export type PropertyType = DocumentType<Property>;

const propertyModel:TPropertyModel = getModelForClass(Property);
export default propertyModel;