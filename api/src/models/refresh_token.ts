import {
   prop,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";

export class Refresh {

   @prop({ required: true, unique: true })
   public token: string;

   @prop({ required: true, unique: true })
   public owner: string;

}

type TRefreshType = ReturnModelType<typeof Refresh>;
export type RefreshType = DocumentType<Refresh>;

const refreshModel:TRefreshType = getModelForClass(Refresh);
export default refreshModel;