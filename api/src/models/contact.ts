import {
  prop,
  getModelForClass,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

export class Contact {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public email: string;

  @prop({ required: true, default: 0 })
  public telephone: number;

  @prop()
  public message: string;

  @prop({ required: true })
  public property: string;
}

type TContactType = ReturnModelType<typeof Contact>;
export type ContactType = DocumentType<Contact>;

const contactModel: TContactType = getModelForClass(Contact);
export default contactModel;
