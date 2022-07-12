import { NextFunction, Request, Response } from "express";
import { Property } from "../models/properties";
import { Cart, User } from "./../models/users";
import {
  createProperty,
  getPropertyById,
  deleteProperty,
  updateProperty,
  getPropertyManager,
  getOwnersTelephone,
  getCart,
} from "../helpers/propertyHelpers";
import { searchByUser, visibilityFilterAndSort } from "../helpers/filters";

interface CartData {
  cart: Cart[];
  properties: Property[];
}


async function searchProperties(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const filter = req.body;
    const { location, max }: any = req.query;
    const allProperties = await getPropertyManager(
      filter,
      location as string,
      max as number
    );

    const { id: owner, follower } = req.params;
    if (owner !== undefined || follower !== undefined) {
      req.properties = allProperties;
      return next();
    } else {
      const sortProperties = visibilityFilterAndSort(allProperties);
      res.json(sortProperties);
    }
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getPropertyByCart(req:Request, res: Response) {
  try {
    const { id } = req.params;

    const cart:Cart[] = await getCart(id);
    const properties:Property[] = [];
    for (let property of cart) {
      let prop = await getPropertyById(property.title);
      properties.push(prop);
    }
    const totalCart:CartData = { cart, properties };
    res.json(totalCart);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getOnlyCart(req:Request, res: Response) {
  try {
    const { id } = req.params;

    const cart:Cart[] = await getCart(id);
    res.json(cart);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getPropertyByOwner(req: Request, res: Response) {
  try {
    const user: User = req.user;
    const properties: Property[] = req.properties;
    const { follower } = req.params;

    const userProperties = await searchByUser(
      user,
      properties,
      follower as string
    );

    res.json(userProperties);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function postProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const property = await createProperty(data, id);
    res.status(201).json(property);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const propById = await getPropertyById(id);

    res.json(propById);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function updateProperties(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const message = await updateProperty(id, data);
    res.status(201).json(message);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function deleteProperties(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const message = await deleteProperty(id);
    res.status(201).json(message);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

async function getOwnersTelephoneByProperty(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const owner = await getOwnersTelephone(id);

    res.json(owner);
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(404).json(error);
    } else {
      console.log("Unexpected Error", error);
    }
  }
}

export {
  postProperty,
  searchProperties,
  getPropertyByOwner,
  getProperty,
  getPropertyByCart,
  getOnlyCart,
  updateProperties,
  deleteProperties,
  getOwnersTelephoneByProperty,
};