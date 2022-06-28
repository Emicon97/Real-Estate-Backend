import userModel from "../models/users";
import { User, UserType } from '../models/users';

async function getAllUsers():Promise<User[]>{
    const allUsers:User[] = await userModel.find();
    
    if(allUsers.length){
     return allUsers; 
    }
    
    throw new Error("No se encontraron usuarios.");
 }

async function createUser(data:User):Promise<User>{
    const user:UserType = await userModel.create(data);

    const savedUser:User = await user.save();
    return savedUser;    
}

export {createUser,
        getAllUsers,            
}