const { Router } = require("express");
import { postComment } from "../controllers/commentControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.post("/:id", postComment);

export default router;
