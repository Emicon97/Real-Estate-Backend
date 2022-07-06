import {
   prop,
   Ref,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";
import { User } from "./users";

export class Login {

   @prop({ required: true, unique: true })
   public token: string;

   @prop({ required: true, unique: true, ref: () => User })
   public owner: Ref<User>;

}

type TLoginType = ReturnModelType<typeof Login>;
export type LoginType = DocumentType<Login>;

const loginModel:TLoginType = getModelForClass(Login);
export default loginModel;