import propertyModel from "../models/properties";
import {Property} from "../models/properties"

async function getAllProperties():Promise<Property[]>{
   const allProperties = await propertyModel.find();
   
   return allProperties;
}

async function createProperty(
    address :string,         
    area :string,
    type :string,
    rooms :number,
    status :string,
    city :string,
    bathrooms : number,
    neighbourhood :string,
    constructionDate : Date,
    renovationDate :Date,
    parkingSlot :boolean,
    rentPrice :string,
    sellPrice:string
    ):Promise<Property>{
    const property = await propertyModel.create({
        address,         
         area,
         type,
         rooms,
         status,
         city,
         bathrooms,
         neighbourhood,
         constructionDate,
         renovationDate,
         parkingSlot,
         rentPrice,
         sellPrice
    })
    await property.save();
    return property;    
}

export{
    createProperty,
    getAllProperties
}