import "./env.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routes/auth.js";
import router1 from "./routes/admin.js";
import router2 from "./routes/boutique.js";
import router3 from "./routes/client.js";

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

const allowedDomains = [
  "http://localhost:4200",
  "https://baobabcenter.netlify.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman/curl
    if (allowedDomains.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
}));


app.get("/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/api/auth", router);
app.use("/api/admin", router1);
app.use("/api/boutique", router2);
app.use("/api/client", router3);



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
