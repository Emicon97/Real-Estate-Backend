import {
  prop,
  getModelForClass,
  ReturnModelType,
  DocumentType,
} from "@typegoose/typegoose";

export class Comment {
  @prop({ required: true })
  public content: string;

  @prop({ required: true })
  public sender: string;

  @prop()
  public stars: number;

}

type TCommentType = ReturnModelType<typeof Comment>;
export type CommentType = DocumentType<Comment>;

const commentModel: TCommentType = getModelForClass(Comment);
export default commentModel;
