import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes/auth.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
  console.error("MONGO_URI non défini dans le fichier .env");
  process.exit(1);
}

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedDomains = ["http://localhost:4200"];

app.use(
  cors({
    origin: allowedDomains,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    optionsSuccessStatus: 200,
  })
);

// Routes
app.use("/api/auth", router);

// Database + Server
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
