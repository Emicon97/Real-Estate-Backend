import { Router } from "express";
import { emailSender } from "../controllers/emailControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.post("/", emailSender);

export default router;
