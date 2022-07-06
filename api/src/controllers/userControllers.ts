import { NextFunction, Request, Response } from "express";
import {
    getUserProperties,
    getUserById,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    favs
} from '../helpers/userHelpers';

async function getUsers (req:Request, res:Response) {
    try{      
       const data = await getAllUsers();
       res.json(data);
    }catch(error:any){
       if (error instanceof Error) {
          console.log(error.message);
          res.status(404).json(error);
       } else {
          console.log('Unexpected Error', error);
       }
    }
}

async function postUser (req:Request, res:Response) {
    try{
        const data = req.body;
        const property = await createUser(data);
        res.status(201).send(property)  
    }catch(error:any){
        if (error instanceof Error) {
            console.log(error.message);
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
}

async function getOwnerById (req:Request, res:Response, next:NextFunction) {
    try{
        const { id, follower } = req.params;
        const properties = req.properties;
        if (properties && !follower) {
            const owner = await getUserProperties(id);
            req.user = owner;
            return next();
        } else if (properties) {
            const followed = await getUserProperties(follower, true);
            req.user = followed;
            return next();
        } else {
            const user = await getUserById(id);
            res.json(user);
        }
    } catch (error:any) {
        if (error instanceof Error) {
           console.log(error.message);
           res.status(404).json(error);
        } else {
           console.log('Unexpected Error', error);
        }
    }
}

async function addFavs (req:Request, res:Response) {
    try {
        const { id } = req.params;
        const { property } = req.body;
        const message = await favs(id, property);
        res.status(201).json(message)
    } catch (error:any) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
}

async function updateData (req:Request, res:Response) {
    try {
        const { id } = req.params;
        const data = req.body;
        const message = await updateUser(id, data);
        res.status(201).json(message)
    } catch (error:any) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(404).json(error);
        } else {
            console.log('Unexpected Error', error);
        }
    }
}

async function banUser (req:Request, res:Response) {
    try {
        const data = req.body.id;
        const message = await deleteUser(data);
        res.status(201).send(message)
    } catch (error:any) {
        if (error instanceof Error) {
           console.log(error.message);
           res.status(404).json(error);
        } else {
           console.log('Unexpected Error', error);
        }
    }
}

export {
    getUsers,
    postUser,
    getOwnerById,
    addFavs,
    updateData,
    banUser            
}