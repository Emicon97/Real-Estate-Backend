import { Request, Response } from "express";
import { greetingsMail } from "../helpers/email";

async function emailSender(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const mail = await greetingsMail(email);
    res.status(201).json(mail);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export { emailSender };
