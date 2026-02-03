import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { createBoutiqueUser, getBoutiqueUsers, getUsers, getUser, changeStatusUser, deleteUser,
    createBoutique, getBoutiques, getBoutique, changeStatusBoutique, deleteBoutique } from "../controllers/admin.js";

const router1 = express.Router();

// utilisateurs boutique
router1.post("/createUser", protect, authorize("admin"), upload.single("image"), createBoutiqueUser);
router1.get("/getBoutiqueUsers", getBoutiqueUsers);
router1.get("/getUsers", getUsers);
router1.get("/getUser/:id", getUser);
router1.put("/changeStatusUser/:id", protect, authorize("admin"), changeStatusUser);
router1.delete("/deleteUser/:id", protect, authorize("admin"), deleteUser);


// boutiques
router1.post("/createBoutique", protect, authorize("admin"), upload.single("logo"), createBoutique);
router1.get("/getBoutiques", getBoutiques);
router1.get("/getBoutique/:id", getBoutique);
router1.put("/changeStatusBoutique/:id", protect, authorize("admin"), changeStatusBoutique);
router1.delete("/deleteBoutique/:id", protect, authorize("admin"), deleteBoutique);

export default router1;
