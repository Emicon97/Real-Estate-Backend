import { Request, Response, NextFunction } from "express";
import { TokenCreation, RefreshToken } from '../libs/JsonWebToken';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv'
dotenv.config({ override: true });

import userModel from '../models/users';
import { User } from './../models/users';


const client:OAuth2Client = new OAuth2Client(process.env.CLIENT_ID);

async function standardLogIn (req:Request, res:Response, next:NextFunction) {
   try{
      let { email, password } = req.body;
      if (!password) next();

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
   if (req.user) next();
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

async function dataBaseCheck (email:string, password?:string):Promise<User> {
   if(email && password){
      let user:User | null = await userModel.findOne({email, password});

      if(user !== null) return user;
      throw new Error ('Los datos ingresados son incorrectos.');
   } else if (email) {
      let user:User | null = await userModel.findOne({email});

      if(user !== null) return user;
      throw new Error ('No se encuentra registrado.');
   } else {
      throw new Error('Complete los campos requeridos.');
   }
}

async function tokenManagement (req:Request, res:Response) {
   try {
      const user = req.user;
      
      const token:string = TokenCreation(user.name);
      const refresh:string = RefreshToken(user.email);
      
      const userData:[User, string, string] = [ user, token, refresh ];
      res.cookie('refresh-token', refresh);
      res.status(200).cookie('auth-token', token).json(userData);
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