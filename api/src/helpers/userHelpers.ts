import userModel from "../models/users";
import { User, UserType } from "../models/users";
import propertyModel, { PropertyType } from "./../models/properties";

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

async function getUserById(id: string): Promise<User> {
  const user: User | null = await userModel.findById(id);

  if (user !== null) {
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

async function updateUser(_id: string, data: User): Promise<string> {
  await userModel.findOneAndUpdate({ _id }, data, { new: true });

  return "Usuario actualizado con éxito.";
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

async function deleteUser(id: string): Promise<string> {
  await userModel.findByIdAndDelete(id);
  return "Usuario eliminado con éxito.";
}

export {
  getUserProperties,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  favs,
  deleteUser,
};
