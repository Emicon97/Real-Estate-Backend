import { Router } from "express";
import {
  getProperty,
  searchProperties,
  postProperty,
  getPropertyByOwner,
  updateProperties,
  deleteProperties,
  getOwnersTelephoneByProperty,
  getPropertyByCart,
  getOnlyCart,
} from "../controllers/propertyControllers";
import { getOwnerById } from "../controllers/userControllers";
import { TokenValidation } from "./../libs/JsonWebToken";

const router = Router();

router.get("/cart/:id", TokenValidation, getPropertyByCart);
router.get("/onlycart/:id", TokenValidation, getOnlyCart);
router.get("/getownersphone/:id", getOwnersTelephoneByProperty);
router.get("/:id", getProperty);

router.post("/search", searchProperties);
router.post("/:id", TokenValidation, postProperty);

router.post(
  "/:id/search",
  TokenValidation,
  searchProperties,
  getOwnerById,
  getPropertyByOwner
);
router.post(
  "/:follower/favourites",
  TokenValidation,
  searchProperties,
  getOwnerById,
  getPropertyByOwner
);

router.put("/:id", TokenValidation, updateProperties);

router.delete("/", TokenValidation, deleteProperties);

export default router;
