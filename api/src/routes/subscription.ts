const { Router } = require("express");
import {
  getSubscription,
  postSubscription,
  updateSubscription,
} from "../controllers/subscriptionControllers";
import { TokenValidation } from "./../libs/JsonWebToken";

const router = Router();

router.get("/:id", getSubscription);

router.post("/", TokenValidation, postSubscription);

router.put("/:id", TokenValidation, updateSubscription);

export default router;
