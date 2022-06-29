const User = require('../src/models/users');

declare namespace Express {
   export interface Request {
      user: User;
   }
}