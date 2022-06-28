import userModel from '../models/users';

async function logIn (email:number, password:string) {
   if(email && password){
       let user = await userModel.findOne({email, password});

       if(user!==null) return user;
       return false;
   } else {
       throw new Error('Complete the required fields.');
   }
}

export {
   logIn
};