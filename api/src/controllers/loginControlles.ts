import { Request, Response, NextFunction } from "express";
import { TokenCreation, RefreshToken } from '../libs/JsonWebToken';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';

import userModel from '../models/users';
import { User } from './../models/users';

async function logInManager (req:Request, res:Response) {
   try{
      let { email, password } = req.body;
      let user:User = await logIn(email, password);

      if(user){
         const token:string = TokenCreation(user.name);
         const refresh:string = RefreshToken(user.email);

         const userData:[User, string, string] = [ user, token, refresh ];
         res.cookie('refresh-token', refresh);
         res.cookie('auth-token', token).json(userData);
      } else {
         res.redirect('/');
      }
   } catch (error) {
      if (error instanceof Error) {
         res.status(404).json(error);
      } else {
         console.log('Unexpected Error', error);
      }
   }
}

async function logIn (email:number, password:string):Promise<User> {
   if(email && password){
      let user:User | null = await userModel.findOne({email, password});

      if(user!==null) return user;
      throw new Error ('Los datos ingresados son incorrectos.');
   } else {
      throw new Error('Complete los campos requeridos.');
   }
}

const client:OAuth2Client = new OAuth2Client('394343158069-32t8sde06fkbaib24hu1v95g1oqac8pm.apps.googleusercontent.com');

async function logInGoogle (req:Request, res:Response, next:NextFunction) {
   const { tokenId }:any = req.body;
   const hola = req.body;
   console.log(hola)
   const ticket:LoginTicket = await client.verifyIdToken({ idToken: tokenId, audience: '394343158069-32t8sde06fkbaib24hu1v95g1oqac8pm.apps.googleusercontent.com' });

   const payload: TokenPayload | undefined = ticket.getPayload();
   console.log(payload);

   next();
}

export {
   logInManager,
   logInGoogle
};