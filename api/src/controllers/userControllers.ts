import userModel from "../models/users.";
import { User, UserType } from './../models/users.';

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

async function updateUser(_id:string, data:User):Promise<string>{
    await userModel.findOneAndUpdate({ _id }, data, {new:true});

    return 'Usuario actualizado con éxito.';
}

async function deleteUser(id:string):Promise<string> {
   
    await userModel.findByIdAndDelete(id);
    return 'Usuario eliminado con éxito.';
}

export {createUser,
        getAllUsers,
        updateUser,
        deleteUser            
}