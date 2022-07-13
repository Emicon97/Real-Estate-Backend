import commentModel, { Comment, CommentType } from "../models/comments";
import propertyModel from "../models/properties";

async function commentCreate(id:string, data: Comment): Promise<Comment> {
  const comments: CommentType = await commentModel.create(data);

  const savedContact: Comment = await comments.save();
  await propertyModel.findByIdAndUpdate(id, { $push: { comments } });
  return savedContact;
}

export { commentCreate };
