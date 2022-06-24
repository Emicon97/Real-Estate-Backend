import propertyModel from "../models/properties";
import { Property } from "../models/properties";
// import { InstanceType } from "@typegoose/typegoose";

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

async function createProperty({
    address,         
    area,
    type,
    rooms,
    city,
    bathrooms,
    neighbourhood,
    constructionDate,
    renovationDate,
    parkingSlot,
    rentPrice,
    sellPrice,
    pictures
}: {
    address:string,         
    area:string,
    type:string,
    rooms:number,
    city:string,
    bathrooms?:number,
    neighbourhood?:string,
    constructionDate?:Date,
    renovationDate?:Date,
    parkingSlot?:boolean,
    rentPrice?:string,
    sellPrice?:string,
    pictures?:string[]
}
    
    ):Promise<Property>{
    const property = await propertyModel.create({
        address,         
        area,
        type,
        rooms,
        city,
        bathrooms,
        neighbourhood,
        constructionDate: constructionDate ? constructionDate : undefined,
        renovationDate: renovationDate ? renovationDate : undefined,
        parkingSlot,
        rentPrice,
        sellPrice,
        pictures: pictures && pictures.length ? pictures : undefined
    });
    console.log(typeof property)
    const savedProperty = await property.save();
    return savedProperty;    
}

export{
    createProperty,
    getAllProperties,
    getPropById
}