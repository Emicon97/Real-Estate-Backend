import {
   prop,
   getModelForClass,
   ReturnModelType,
   DocumentType,
 } from "@typegoose/typegoose";
 
 export class Flag {
   @prop({ required: true })
   public reason: string;
 
   @prop({ required: true })
   public denounced: string;
 
 }
 
 type TFlagType = ReturnModelType<typeof Flag>;
 export type FlagType = DocumentType<Flag>;
 
 const flagModel: TFlagType = getModelForClass(Flag);
 export default flagModel;