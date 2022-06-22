import propertyModel from "../models/properties";
import { Property, Status } from "../models/properties";

async function getAllProperties():Promise<Property[]>{
   const allProperties = await propertyModel.find();
   
   if(allProperties.length){
    return allProperties; 
   }
   throw new Error("No se encontraron props");
}

async function createProperty(
    address:string,         
    area:string,
    type:string,
    rooms:number,
    status:string,
    city:string,
    bathrooms?:number,
    neighbourhood?:string,
    constructionDate?:Date,
    renovationDate?:Date,
    parkingSlot?:boolean,
    rentPrice?:string,
    sellPrice?:string
    ):Promise<Property>{
    const property = await propertyModel.create({
        address,         
        area,
        type,
        rooms,
        status,
        city,
        bathrooms: bathrooms ? bathrooms : 1,
        neighbourhood: neighbourhood ? neighbourhood : undefined,
        constructionDate: constructionDate ? constructionDate : undefined,
        renovationDate: renovationDate ? renovationDate : undefined,
        parkingSlot: parkingSlot ? parkingSlot : undefined,
        rentPrice: rentPrice ? rentPrice : 'No se alquila',
        sellPrice: sellPrice ? sellPrice : 'No está a la venta'
    });
    const savedProperty = await property.save();
    return savedProperty;    
}

export{
    createProperty,
    getAllProperties
}