import propertyModel from "../models/properties";
import { Property, PropertyType } from "../models/properties";
import userModel from './../models/users';
import { searchByFilter, searchByLocation } from "./filters";

async function getPropertyManager(
   filters?:Property,
   location?:string,   
   max?:number, 
   ):Promise<Property[]>{
   const allProperties:Property[] = await getAllProperties();
   if ((filters && Object.keys(filters).length) && location) {
       const filtered:Property[] = await searchByFilter(filters, max);
       const searched:Property[] = await searchByLocation(location, filtered);
       return searched;
   } else if ((filters && Object.keys(filters).length)) {
       const filtered:Property[] = await searchByFilter(filters, max);
       return filtered;
   } else if (location) {
       const searched:Property[] = await searchByLocation(location, allProperties);
       return searched;
   } else {
       return allProperties;
   }
}

async function getAllProperties():Promise<Property[]>{
   const allProperties:Property[] = await propertyModel.find();
   
   if(allProperties.length){
    return allProperties; 
   }
   
   throw new Error("No se encontraron propiedades.");
}

async function getPropById(id:string):Promise<Property> {
   const propById:Property | null = await propertyModel.findById(id);
   if(propById !== null){
       return propById;
   }

  throw new Error("Esta propiedad no está disponible."); 
}

async function createProperty(data:Property, id:string):Promise<Property>{
   const properties:PropertyType = await propertyModel.create(data);

   const savedProperty:Property = await properties.save();
   await userModel.findByIdAndUpdate(id, { $push: { properties }});
   return savedProperty;    
}

async function updateProperty(_id:string, data:Property):Promise<string>{
   await propertyModel.findOneAndUpdate({ _id }, data, {new:true});

   return 'Propiedad actualizada con éxito.';
}

async function deleteProperty(id:string):Promise<string> {
  
   await propertyModel.findByIdAndDelete(id);
   return 'Propiedad eliminada con éxito.';
}

async function getOwner(id:string) {
   const owner = await userModel.findOne({ properties: id });
   return owner
}

export {
   getPropertyManager,
   createProperty,
   getPropById,
   updateProperty,
   deleteProperty,
   getOwner
}