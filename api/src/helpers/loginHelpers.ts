import userModel from './../models/users';
import { User } from './../models/users';

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

export {
   dataBaseCheck
}