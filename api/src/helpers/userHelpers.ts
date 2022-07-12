import userModel from "../models/users";
import { User, UserType } from "../models/users";
import { Cart } from "./../models/users";
import { propertyStatusManager, rangeManager } from "./subscriptionHelpers";

async function getUserProperties(
  id: string,
  follower?: boolean
): Promise<User> {
  var user: User | null;
  if (!follower) {
    user = await userModel.findById(id).populate({ path: "properties" });
  } else {
    user = await userModel.findById(id).populate({ path: "favourites" });
  }

  if (user !== null) {
    return user;
  }

  throw new Error("No hemos encontrado ninguna propiedad.");
}

async function getUserById(id: string): Promise<User | null> {
  const user: User | null = await userModel
    .findById(id)
    .populate([{ path: "properties" }, { path: "flags" }]);

  if (user !== null) {

    await rangeManager(id);
    return user;
  }

  throw new Error("Hubo un error al procesar sus datos.");
}

async function getAllUsers(): Promise<User[]> {
  const allUsers: User[] = await userModel.find();

  if (allUsers.length) {
    return allUsers;
  }

  throw new Error("No se encontraron usuarios.");
}

async function createUser(data: User): Promise<User> {
  const user: UserType = await userModel.create(data);

  const savedUser: User = await user.save();
  return savedUser;
}

async function updateUser(_id: string, data: any): Promise<User> {
  const user: User | null = await userModel.findOneAndUpdate({ _id }, data);

  if (user !== null) return user;

  throw new Error("No hay datos disponibles.");
}

async function favs(id: string, favourites: string): Promise<User> {
  const user: User | null = await userModel.findById(id);
  if (user === null) throw new Error("No encontramos sus datos.");

  const properties: unknown[] = user?.favourites as unknown[];
  if (properties.includes(favourites)) {
    await userModel.findByIdAndUpdate(id, { $pull: { favourites } });
  } else {
    await userModel.findByIdAndUpdate(id, { $push: { favourites } });
  }
  return user;
}

async function cart(id: string, title: string): Promise<User> {
  const user: User | null = await userModel.findById(id);
  if (user === null) throw new Error("No encontramos sus datos.");
  const cart = { title, quantity: 1, unit_price: 10000 };
  const cartItems: Cart[] = user?.cart as Cart[];
  for (let property of cartItems) {
    if (property.title === title) {
      const updated = await userModel.findByIdAndUpdate(id, { $pull: { cart } }, {new: true});
      if (updated) return updated;
    }
  }
  const added = await userModel.findByIdAndUpdate(id, { $push: { cart } }, {new: true});
  if (added) return added;
  throw new Error ('No se pudo conectar con el carrito de compras.');
}

async function deleteUser(id: string): Promise<User[]> {
  const user: User | null = await userModel
    .findByIdAndUpdate(id, { range: "banned" })
    .populate({ path: "properties" });

  if (user) await propertyStatusManager(user, "banned");

  const users = await getAllUsers();
  return users;
}

export {
  getUserProperties,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  favs,
  cart,
  deleteUser,
};
