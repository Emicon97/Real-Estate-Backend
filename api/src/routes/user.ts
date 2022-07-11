import { Router } from "express";
import {
  getUsers,
  postUser,
  updateData,
  addFavs,
  addCart,
  banUser,
  getOwnerById,
} from "../controllers/userControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/:id", getOwnerById);
router.get("/", TokenValidation, getUsers);

router.post("/", postUser);

router.put("/addfavs/:id", TokenValidation, addFavs);
router.put("/addcart/:id", addCart);
router.put("/:id", TokenValidation, updateData);

router.delete("/", TokenValidation, banUser);

export default router;
