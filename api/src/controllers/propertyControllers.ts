import propertyModel from "../models/properties";
import { Property, PropertyType } from "../models/properties";

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

async function searchByFilter(
    filtered:Property,
    max?:number
):Promise<Property[]>{
    if (max) {
        const property:Property[] = await propertyModel.find(filtered)
            .where('price').gt(0).lt(max);
        return property;
    }else {
        const property:Property[] = await propertyModel.find(filtered);
        return property;
    }
}

async function searchByLocation(
    location:string,
    properties:Property[]
):Promise<Property[]>{
    const toFilter:Property[] = [];
    const names:string[] = location.trim().split(' ');

    properties.forEach((property:Property) => {
        names.forEach((word:string) => {
            if (word.length) {
                if (
                    !toFilter.includes(property) &&
                    property.city.includes(word)
                ) {
                    toFilter.push(property);
                } else if (
                    !toFilter.includes(property) &&
                    property.neighbourhood?.includes(word) &&
                    property.neighbourhood !== 'No especificado'
                ) {
                    toFilter.push(property);
                }
            }
        })
    })

    return toFilter;
}

async function getPropById(id:string):Promise<Property> {
    console.log(id)
    const propById:Property | null = await propertyModel.findById(id);
    console.log(propById)
    if(propById !== null){
        return propById;
    }

   throw new Error("Esta propiedad no está disponible."); 
}

async function createProperty(data:Property):Promise<Property>{
    const property:PropertyType = await propertyModel.create(data);

    const savedProperty:Property = await property.save();
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



export{
    createProperty,
    getPropertyManager,
    getPropById,
    deleteProperty,
    updateProperty
}