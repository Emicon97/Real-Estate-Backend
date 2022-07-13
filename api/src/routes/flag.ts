import { Router } from "express";
import { getReportsByOwner, postReport } from "../controllers/flagControllers";
import { TokenValidation } from "../libs/JsonWebToken";

const router = Router();

router.get("/:id", TokenValidation, getReportsByOwner);

router.post("/:id", postReport);

export default router;
