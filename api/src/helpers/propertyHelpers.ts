import propertyModel from "../models/properties";
import { Status, Property, PropertyType } from "../models/properties";
import userModel, { Cart, User, UserType } from "./../models/users";
import { searchByFilter, searchByLocation } from "./filters";

async function getPropertyManager(
  filters?: Property,
  location?: string,
  max?: number
): Promise<Property[]> {
  const allProperties: Property[] = await getAllProperties();
  if (filters && Object.keys(filters).length && location) {
    const filtered: Property[] = await searchByFilter(filters, max);
    const searched: Property[] = await searchByLocation(location, filtered);
    return searched;
  } else if (filters && Object.keys(filters).length) {
    const filtered: Property[] = await searchByFilter(filters, max);
    return filtered;
  } else if (location) {
    const searched: Property[] = await searchByLocation(
      location,
      allProperties
    );
    return searched;
  } else {
    return allProperties;
  }
}

async function getAllProperties(): Promise<Property[]> {
  const allProperties: Property[] = await propertyModel.find();

  if (allProperties.length) {
    return allProperties;
  }

  throw new Error("No se encontraron propiedades.");
}

async function getPropertyById(id: string): Promise<Property> {
  const propById: Property | null = await propertyModel.findById(id).populate({ path: "comments" });
  if (propById !== null) {
    return propById;
  }

  throw new Error("Esta propiedad no está disponible.");
}

async function createProperty(data: Property, _id: string): Promise<Property> {
  const status: Status = await visiblePropertyChecker(_id);
  data.status = status;

  const properties: PropertyType = await propertyModel.create(data);

  const savedProperty: Property = await properties.save();
  await userModel.findByIdAndUpdate(_id, { $push: { properties } });
  return savedProperty;
}

async function visiblePropertyChecker(id: string): Promise<Status> {
  const user: User | null = await userModel
    .findById(id)
    .populate({ path: "properties" });

  var available: number = 0;
  if (!user) throw new Error("No hemos podido acceder a sus datos.");

  if (user.range === "vip") return Status.vipHot;

  for (let property of user?.properties) {
    const prop = property as Property;
    if (prop && prop.status === "available") {
      available++;
    }
  }
  if (available >= 3) return Status.invisible;
  else return Status.available;
}

async function updateProperty(_id: string, data: Property): Promise<string> {
  await propertyModel.findOneAndUpdate({ _id }, data, { new: true });

  return "Propiedad actualizada con éxito.";
}

async function deleteProperty(id: string): Promise<string> {
  await propertyModel.findByIdAndDelete(id);
  return "Propiedad eliminada con éxito.";
}

async function getOwnersTelephone(id: string): Promise<number> {
  const owner: User | null = await userModel.findOne({ properties: id });
  if (owner) return owner.telephone;
  throw new Error("No fue posible encontrar datos sobre el dueño.");
}

async function getCart(id: string): Promise<Cart[]> {
  const user = await userModel.findById(id).populate({ path: "cart" });

  if (user && user.cart) {
    return user?.cart;
  }

  throw new Error("Hubo un error al procesar sus datos.");
}

async function getOwnersId(id: string): Promise<string> {
  const owner: UserType | null = await userModel.findOne({ properties: id });
  if (owner) return owner.id;
  throw new Error("No fue posible encontrar datos sobre el dueño.");
}

export {
  getPropertyManager,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getCart,
  getOwnersTelephone,
  getOwnersId,
};
