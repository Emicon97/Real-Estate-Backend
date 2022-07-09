import { Router } from "express";
import {
  getUsers,
  postUser,
  updateData,
  addFavs,
  banUser,
  getOwnerById,
} from "../controllers/userControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/:id", getOwnerById);
router.get("/", TokenValidation, getUsers);

router.post("/", postUser);

<<<<<<< HEAD
router.put('/addfavs/:id', addFavs);
router.put('/:id', TokenValidation, updateData);
=======
router.put("/addfavs/:id", TokenValidation, addFavs);
router.put("/:id", TokenValidation, updateData);
>>>>>>> 79b744e21f179eb8a148ec5da52b30c8c748b21e

router.delete("/", TokenValidation, banUser);

export default router;
