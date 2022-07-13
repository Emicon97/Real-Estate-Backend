import {
  prop,
  Ref,
  getModelForClass,
  ReturnModelType,
  DocumentType,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";
import { Flag } from "./flags";
import { Property } from "./properties";

enum Range {
  free = "free",
  premium = "premium",
  vip = "vip",
  admin = "admin",
  banned = "banned",
}

export interface Cart {
  title: string;
  quantity: number;
  unit_price: number;
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public lastName: string;

  @prop({ required: true, default: "pending" })
  public password: string;

  @prop()
  public birthday: Date;

  @prop({ required: true, unique: true, default: "pending" })
  public email: string;

  @prop({ required: true, default: 0 })
  public dni: number;

  @prop({ required: true, default: 0 })
  public telephone: number;

  @prop({ required: true, enum: Range, default: "free" })
  public range: Range;

  @prop()
  public avatar: string;

  @prop({ ref: () => Property })
  public favourites: Ref<Property>[];

  @prop({ ref: () => Property })
  public properties: Ref<Property>[];

  @prop({ default: false })
  public authorized: boolean;

  @prop()
  public subscription: string;

  @prop()
  public cart: Cart[];

  @prop({ ref: () => Flag })
  public flags: Ref<Flag>[];
}

type TUserType = ReturnModelType<typeof User>;
export type UserType = DocumentType<User>;

const userModel: TUserType = getModelForClass(User);
export default userModel;
