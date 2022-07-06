import { Request, Response, NextFunction, CookieOptions } from "express";
import { TokenCreation, RefreshToken } from '../libs/JsonWebToken';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv'
dotenv.config({ override: true });

import { User } from '../models/users';
import { dataBaseCheck } from "../helpers/loginHelpers";


const client:OAuth2Client = new OAuth2Client(process.env.CLIENT_ID);

async function standardLogIn (req:Request, res:Response, next:NextFunction) {
   try{
      let { email, password } = req.body;
      if (!password) return next();

      let user:User = await dataBaseCheck(email as string, password as string);
      req.user = user;
      
      next();
   } catch (error) {
      if (error instanceof Error) {
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function googleLogIn (req:Request, res:Response, next:NextFunction) {
   const user = req.user;
   if (user) return next();

   try{
      const { tokenId }:any = req.body;
      const ticket:LoginTicket = await client.verifyIdToken({
         idToken: tokenId as string,
         audience: process.env.CLIENT_ID
      });
      
      const email:string | undefined = ticket.getPayload()?.email;

      if (email !== undefined) {
         let user:User = await dataBaseCheck(email);

         req.user = user;
         next();
      }
   } catch (error) {
      if (error instanceof Error) {
         console.log(error)
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function tokenManagement (req:Request, res:Response) {
   try {
      const user = req.user;

      const token:string = TokenCreation(user.email);
      await RefreshToken(user._id);
      // const cookieConfig:CookieOptions = {
      //    sameSite: 'none',
      //    secure: true,
      //    httpOnly: true
      // }
      // res.status(200).cookie('auth-token', token, cookieConfig).json(user);
      const userData:[ User, string ] = [ user, token ];
      res.status(200).json(userData);
   } catch (error) {
      if (error instanceof Error) {
         console.log(error)
         res.status(403);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

export {
   standardLogIn,
   googleLogIn,
   tokenManagement
};