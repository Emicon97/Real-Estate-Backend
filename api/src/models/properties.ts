import {
  prop,
  getModelForClass,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

enum Status {
  available = "available",
  reserved = "reserved",
  negotiation = "negotiation",
  invisible = "invisible",
}
enum Operation {
  sell = "sell",
  rent = "rent",
}

export class Property {
  @prop({ required: true })
  public address: string;

  @prop({ required: true, enum: Operation })
  public operation: Operation;

  @prop({ required: true })
  public price?: number;

  @prop({ required: true })
  public area: string;

  @prop({ required: true })
  public type: string;

  @prop({ required: true })
  public rooms: number;

  @prop({ default: 1 })
  public bathrooms: number;

  @prop({ required: true })
  public city: string;

  @prop({ default: "No especificado" })
  public neighbourhood?: string;

  @prop()
  public constructionDate?: number;

  @prop()
  public renovationDate?: number;

  @prop({ default: false })
  public parkingSlot: boolean;

  @prop({ required: true, enum: Status, default: "available" })
  public status: Status;

  @prop({ type: String })
  public pictures: string[];
}

type TPropertyModel = ReturnModelType<typeof Property>;
export type PropertyType = DocumentType<Property>;

const propertyModel: TPropertyModel = getModelForClass(Property);
export default propertyModel;
