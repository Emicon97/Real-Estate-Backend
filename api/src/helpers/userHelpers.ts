import userModel from "../models/users";
import { User, UserType } from '../models/users';

async function getUserProperties(id:string, follower?:boolean):Promise<User>{
   var user:User | null;
   if (!follower) {
      user = await userModel.findById(id)
         .populate({ path: 'properties' });
   } else {
      user = await userModel.findById(id)
         .populate({ path: 'favourites' });
   }

   if (user !== null) {
      return user;
   }

   throw new Error("No hemos encontrado ninguna propiedad.");
}

async function getUserById(id:string):Promise<User>{
   const user:User | null = await userModel.findById(id);

   if (user !== null) {
      return user;
   }

   throw new Error("Hubo un error al procesar sus datos.");
}

async function getAllUsers():Promise<User[]>{
   const allUsers:User[] = await userModel.find();
    
   if(allUsers.length) {
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

export {
   getUserProperties,
   createUser,
   getAllUsers,
   getUserById,
   updateUser,
   deleteUser            
}