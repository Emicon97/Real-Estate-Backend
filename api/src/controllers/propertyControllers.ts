import propertyModel from "../models/properties";
import { Property, PropertyType } from "../models/properties";

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
    const property:PropertyType = await propertyModel.create({
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

    const savedProperty:Property = await property.save();
    return savedProperty;    
}

async function deleteProperty(id:string):Promise<string> {
   
    await propertyModel.findByIdAndDelete(id);
    return 'Propiedad eliminada con éxito.';
}

async function updateProperty({
    _id,
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
}:{
    _id:string,
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
}):Promise<string>{
    await propertyModel.findOneAndUpdate({ _id }, {
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
    }, {new:true});
    return 'Propiedad actualizada con éxito.';
}

export{
    createProperty,
    getAllProperties,
    getPropById,
    deleteProperty,
    updateProperty
}