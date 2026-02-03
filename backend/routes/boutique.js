import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { updateBoutique } from "../controllers/boutique.js";

const router2 = express.Router();

router2.put("/updateBoutique/:id", protect, authorize("boutique"), upload.single("logo"), updateBoutique);



export default router2;

