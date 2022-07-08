import propertyModel from "../models/properties";
import { Property } from "../models/properties";
import { User } from "./../models/users";

async function searchByFilter(
  filtered: Property,
  max?: number
): Promise<Property[]> {
  if (max) {
    const property: Property[] = await propertyModel
      .find(filtered)
      .where("price")
      .gt(0)
      .lt(max);
    return property;
  } else {
    const property: Property[] = await propertyModel.find(filtered);
    return property;
  }
}

async function searchByLocation(
  location: string,
  properties: Property[]
): Promise<Property[]> {
  const toFilter: Property[] = [];
  const names: string[] = location.trim().split(" ");

  properties.forEach((property: Property) => {
    names.forEach((word: string) => {
      if (word.length) {
        if (!toFilter.includes(property) && property.city.includes(word)) {
          toFilter.push(property);
        } else if (
          !toFilter.includes(property) &&
          property.neighbourhood?.includes(word) &&
          property.neighbourhood !== "No especificado"
        ) {
          toFilter.push(property);
        }
      }
    });
  });

  return toFilter;
}

async function searchByUser(
  user: User,
  properties: Property[],
  follower?: string
): Promise<Property[]> {
  const userProperties: Property[] = [];

  const search = follower ? user.favourites : user.properties;

  search.forEach((property: any) => {
    properties.forEach((one: any) => {
      if (property.id === one.id) {
        userProperties.push(one);
      }
    });
  });
  return userProperties;
}

export { searchByFilter, searchByLocation, searchByUser };
