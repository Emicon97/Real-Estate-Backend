const User = require('../src/models/users');
const Property = require('../src/models/properties');

declare namespace Express {
   export interface Request {
      user: User;
      properties: Property[];
   }
}