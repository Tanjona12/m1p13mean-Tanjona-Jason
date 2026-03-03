import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { updateBoutique, getProduitBoutique, getBoutiqueOwner, getMe,
    createProduit, getProduits, getProduit, updateProduit, deleteProduit } from "../controllers/boutique.js";

const router2 = express.Router();

router2.put("/updateBoutique/:id", protect, authorize("boutique"), upload.single("logo"), updateBoutique);
router2.get("/getBoutiqueOwner", protect, authorize("boutique"), getBoutiqueOwner);
router2.get("/getMe", protect, getMe);

router2.post("/createProduit", protect, authorize("boutique"), upload.single("imageProduit"), createProduit);
router2.post("/updateProduit/:id", protect, authorize("boutique"), upload.single("imageProduit"), updateProduit);
router2.get("/getProduits", getProduits);
router2.get("/getProduit/:id", getProduit);
router2.get("/getProduit/boutique/:id", getProduitBoutique); //id boutique
router2.delete("/deleteProduit/:id", protect, authorize("boutique"), deleteProduit);



export default router2;

