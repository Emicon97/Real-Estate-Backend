import { Request, Response, NextFunction } from "express";
import { LoginTicket, OAuth2Client, TokenPayload } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config({ override: true });

import { User } from "../models/users";
import { dataBaseCheck } from "../helpers/loginHelpers";

const client: OAuth2Client = new OAuth2Client(process.env.CLIENT_ID);

async function googleSignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { tokenId }: any = req.body;
    const ticket: LoginTicket = await client.verifyIdToken({
      idToken: tokenId as string,
      audience: process.env.CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();
    if (!payload) {
      throw new Error("Hubo un error al acceder a sus datos.");
    }
    const { email, given_name, family_name } = payload;
    if (email && given_name && family_name) {
      let user: User = await dataBaseCheck(
        email,
        undefined,
        given_name,
        family_name
      );
      req.user = user;
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(403);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export { googleSignUp };
