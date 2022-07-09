import { Router } from "express";
import { getContact, postContactForm } from "../controllers/contactControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/:id", TokenValidation, getContact);

router.post("/", TokenValidation, postContactForm);

export default router;
