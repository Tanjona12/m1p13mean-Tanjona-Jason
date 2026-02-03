import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { createBoutiqueUser, getBoutiqueUsers, getUsers, getUser, changeStatusUser, deleteUser,
    createBoutique, getBoutiques, getBoutique, changeStatusBoutique, deleteBoutique } from "../controllers/admin.js";

const router = express.Router();

// utilisateurs boutique
router.post("/createUser", protect, authorize("admin"), upload.single("image"), createBoutiqueUser);
router.get("/getBoutiqueUsers", getBoutiqueUsers);
router.get("/getUsers", getUsers);
router.get("/getUser/:id", getUser);
router.put("/changeStatusUser/:id", protect, authorize("admin"), changeStatusUser);
router.delete("/deleteUser/:id", protect, authorize("admin"), deleteUser);


// boutiques
router.post("/createBoutique", protect, authorize("admin"), upload.single("logo"), createBoutique);
router.get("/getBoutiques", getBoutiques);
router.get("/getBoutique/:id", getBoutique);
router.put("/changeStatusBoutique/:id", protect, authorize("admin"), changeStatusBoutique);
router.delete("/deleteBoutique/:id", protect, authorize("admin"), deleteBoutique);

export default router;
