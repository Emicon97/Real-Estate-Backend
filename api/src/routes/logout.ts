import { Router } from "express";
import { logout } from "../controllers/logoutControllers";

const router = Router();

router.get("/:id", logout);

export default router;
