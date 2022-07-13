import { Request, Response } from "express";
import { commentCreate } from "../helpers/commentHelpers";

async function postComment(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const comment = await commentCreate(id, data);
    res.status(201).json(comment);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export { postComment };
