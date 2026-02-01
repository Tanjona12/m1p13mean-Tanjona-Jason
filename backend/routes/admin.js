import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { createBoutiqueUser, getBoutiqueUsers, createBoutique } from "../controllers/admin.js";

const router = express.Router();

// utilisateurs boutique
router.post("/createUser", protect, authorize("admin"), upload.single("image"), createBoutiqueUser);
router.get("/getUser", protect, authorize("admin"), getBoutiqueUsers);

// boutiques
router.post("/createBoutique", protect, authorize("admin"), upload.single("logo"), createBoutique);

export default router;
