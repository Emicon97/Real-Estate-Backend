import propertyModel from "../models/properties";
import { Property } from "../models/properties";

async function getAllProperties():Promise<Property[]>{
   const allProperties:Property[] = await propertyModel.find();
   
   if(allProperties.length){
    return allProperties; 
   }
   
   throw new Error("No se encontraron propiedades.");
}

async function getPropById(id:string):Promise<Property> {

    const propById = await propertyModel.findById(id);

    if(propById){
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
        rentPrice: rentPrice ? rentPrice : 'No se alquila',
        sellPrice: sellPrice ? sellPrice : 'No está a la venta',
        pictures: pictures && pictures.length ? pictures : undefined
    });
    const savedProperty = await property.save();
    return savedProperty;    
}

async function deleteProperty(id:string):Promise<any> {
    try {
        await propertyModel.findByIdAndDelete(id);
        return 'Propiedad eliminada con éxito'
    } catch (error) {
        console.log(error)
    }
}

export{
    createProperty,
    getAllProperties,
    getPropById,
    deleteProperty,
}