import { Request, Response, NextFunction } from "express";
import { TokenCreation, RefreshToken } from '../libs/JsonWebToken';
import loginModel from './../models/refresh_login';

async function logout (req:Request, res:Response) {
   try {
      const { owner } = req.params;
      console.log('got out')
      await loginModel.findOneAndDelete({ owner });

      res.status(200).cookie('auth-token', '');
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
   logout
}