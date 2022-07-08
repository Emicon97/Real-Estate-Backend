const { Router } = require("express");
import {
  getPayment,
  postPayment,
  updatePayment,
} from "../controllers/paymentControllers";
import { TokenValidation } from "./../libs/JsonWebToken";

const router = Router();

router.get("/:id", getPayment);

router.post("/", postPayment);

router.put("/", updatePayment);

export default router;
