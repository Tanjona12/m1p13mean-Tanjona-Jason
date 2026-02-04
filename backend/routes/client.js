import express from "express";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/role.js";
import upload from "../middlewares/upload.js";

import { updateClient } from "../controllers/client.js";

const router3 = express.Router();

router3.put("/updateClient/:id", upload.single("image"), updateClient);


export default router3;

