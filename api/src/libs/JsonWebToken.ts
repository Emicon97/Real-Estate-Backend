import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import loginModel, { Login } from './../models/refresh_login';

export const TokenValidation = async (req:Request, res:Response, next:NextFunction) => {
    const authToken = req.headers['auth-token'] as string;
    const owner = req.headers['id'] as string;
    const refreshModel:Login | null = await loginModel.findOne({ owner });

    if (refreshModel === null) return res.sendStatus(403);
    const refreshToken = refreshModel.token;

    if (!authToken) return res.sendStatus(401);
    
    const { payload: refresh } = verifyRefreshJWT(refreshToken);
    
    if (!refresh) {
        return res.sendStatus(403);
    }

    const { payload } = verifyJWT(authToken);

    if (payload) return next();
    
    const id = req.headers['id'] as string;
 
    const token = TokenCreation(id);

    res.cookie('auth-token', token);

    next();
}

export const TokenCreation = (email:string) => {
    return jwt.sign({email}, process.env.TOKEN_SECRET as string || 'tokenPass', {
        expiresIn: 10
    });
}

export const RefreshToken = async (owner:string) => {
    const token = jwt.sign({owner}, process.env.TOKEN_REFRESH as string || 'tokenPass', {
        expiresIn: 60 * 60 * 8
    });
    const refresh = await loginModel.create({
        token,
        owner
     })
     await refresh.save();
     return token;
}

function verifyJWT (token:string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        return { payload: decoded, expired: false };
    } catch (error:any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
      }
}

function verifyRefreshJWT (token:string) {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_REFRESH as string);
        return { payload: decoded, expired: false };
    } catch (error:any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
      }
}