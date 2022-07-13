const { Router } = require("express");
import { postComment } from "../controllers/commentControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.post("/:id", TokenValidation, postComment);

export default router;
