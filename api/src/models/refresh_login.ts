import {
  prop,
  getModelForClass,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

export class Login {
  @prop({ required: true, unique: true })
  public token: string;

  @prop({ required: true, unique: false })
  public owner: string;
}

type TLoginType = ReturnModelType<typeof Login>;
export type LoginType = DocumentType<Login>;

const loginModel: TLoginType = getModelForClass(Login);
export default loginModel;
