import {
   prop,
   Ref,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";
import { trusted } from "mongoose";
import { Property } from "./properties";

enum Range {
   free = 'free',
   premium = 'premium',
   vip = 'vip',
   admin = 'admin'
};

export class User {

   @prop({ required: true })
   public name: string;

   @prop({ required: true })
   public lastName: string;

   @prop({ required: true, default: 'pending' })
   public password: string;

   @prop({ required: true, default: 'pending' })
   public birthday: Date;

   @prop({ required: true, unique: true, default: 'pending' })
   public email: string;

   @prop({ required: true, default: 0 })
   public dni: number;

   @prop({ required: true, default: 0 })
   public telephone: number;

   @prop({ required: true, enum: Range, default: 'free' })
   public range: Range;

   @prop()
   public avatar: string;

   @prop({ ref: () => Property })
   public favourites: Ref<Property>[];

   @prop({ ref: () => Property })
   public properties: Ref<Property>[];

   @prop({ ref: () => User})
   public user: Ref< User >[];

}

type TUserType = ReturnModelType<typeof User>;
export type UserType = DocumentType<User>;

const userModel:TUserType = getModelForClass(User);
export default userModel;