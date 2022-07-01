import { NextFunction, Request, Response } from "express";
import propertyModel from "../models/properties";
import { Property, PropertyType } from "../models/properties";
import userModel, { User } from './../models/users';
import { getUserById } from "./userControllers";

async function searchProperties (req:Request, res:Response, next:NextFunction) {
    try{
        const filter = req.body;
        const { location, max }:any = req.query;
        const allProperties = await getPropertyManager(
            filter,
            location as string,
            max as number
        );       

        const { id:owner, follower } = req.params;
        if (owner !== undefined || follower !== undefined) {
            req.properties = allProperties;
            return next();
        } else {
            res.json(allProperties);
        }
    } catch (error:any) {
        if (error instanceof Error) {
           console.log(error.message);
           res.status(404).json(error);
        } else {
           console.log('Unexpected Error', error);
        }
    }
}

async function getPropertyByOwner(req:Request, res:Response) {
    try{
        const user:User = req.user;
        const properties:Property[] = req.properties;
        const { follower } = req.params;

        const userProperties = await searchByUser(
            user,
            properties,
            follower as string
        );

        res.json(userProperties);
    } catch (error:any) {
        if (error instanceof Error) {
           console.log(error.message);
           res.status(404).json(error);
        } else {
           console.log('Unexpected Error', error);
        }
    }
}

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

async function searchByUser(
    user:User,
    properties:Property[],
    follower?:string
    ):Promise<any>{
    const userProperties:Property[] = [];
    
    const search = follower ? user.favourites : user.properties;

    search.forEach((property:any) => {
        properties.forEach((one:any) => {
            if (property.id === one.id) {
                userProperties.push(one);
            }
        })
    })
    return userProperties;
}

async function getPropById(id:string):Promise<Property> {
    const propById:Property | null = await propertyModel.findById(id);
    if(propById !== null){
        return propById;
    }

   throw new Error("Esta propiedad no está disponible."); 
}

async function createProperty(data:Property, _id:string):Promise<Property>{
    const properties:PropertyType = await propertyModel.create(data);

    const savedProperty:Property = await properties.save();
    const user = await userModel.findByIdAndUpdate(_id, { $push: { properties }});
    console.log("user:", user);
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
    searchProperties,
    getPropertyByOwner,
    getPropById,
    deleteProperty,
    updateProperty
}