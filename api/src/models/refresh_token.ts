import {
   prop,
   Ref,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";
import { User } from "./users";

export class Refresh {

   @prop({ required: true, unique: true })
   public token: string;

   @prop({ required: true, unique: true, ref: () => User })
   public owner: Ref<User>;

}

type TRefreshType = ReturnModelType<typeof Refresh>;
export type RefreshType = DocumentType<Refresh>;

const refreshModel:TRefreshType = getModelForClass(Refresh);
export default refreshModel;