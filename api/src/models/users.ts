import {
   prop,
   Ref,
   getModelForClass,
   ReturnModelType,
   DocumentType
} from "@typegoose/typegoose";
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

   @prop({ required: true })
   public password: string;

   @prop({ required: true })
   public birthday: Date;

   @prop({ required: true })
   public email: string;

   @prop({ required: true })
   public dni: number;

   @prop({ required: true })
   public telephone: number;

   @prop({ required: true, enum: Range, default: 'free' })
   public range: Range;

   @prop()
   public avatar: string;

   @prop({ ref: () => Property })
   favourites: Ref<Property>[];

   @prop({ ref: () => Property })
   properties: Ref<Property>[];

   @prop({ ref: () => User})
   public user: Ref< User >[];

}

// export class Free extends User {

//    @prop({ ref: () => Property })
//    favourites: Ref<Property>[];

// }

// export class Premium extends User {

//    @prop({ ref: () => Property })
//    properties: Ref<Property>[];

// }

// export class Vip extends User {

//    @prop({ ref: () => Property })
//    properties: Ref<Property>[];

// }

// export class Admin extends User {

//    @prop({ enum: Range })
//    public userType: string;

//    @prop({ ref: () => User})
//    public user: Ref< User >[];

// }

type TUserType = ReturnModelType<typeof User>;
export type UserType = DocumentType<User>;

const userModel:TUserType = getModelForClass(User);
export default userModel;