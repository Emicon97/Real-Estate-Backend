import {
   prop,
   Ref,
   getModelForClass,
   modelOptions,
   Severity,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";

export enum Status {
   available = 'available',
   reserveed = 'reserved',
   negotiotion = 'negotiation'
};

@modelOptions({options: { allowMixed: Severity.ALLOW }})
export class User {

   @prop({ required: true })
   public name: string;

   @prop({ required: true })
   public lastName: string;

   @prop({ required: true })
   public birthday: Date;

   @prop({ required: true })
   public dni: number;

   @prop({ required: true })
   public email: string;

   @prop({ required: true })
   public telephone: string;

   @prop({ required: true })
   public range: string;
}