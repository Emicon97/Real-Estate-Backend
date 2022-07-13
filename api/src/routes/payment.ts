const { Router } = require("express");
import { getPayment, postPayment } from "../controllers/paymentController";
import { TokenValidation } from "./../libs/JsonWebToken";

const router = Router();

router.get("/:id", getPayment);

router.post("/", TokenValidation, postPayment);

export default router;
