import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userModel from "./models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
  quiet: true,
});

import cloudinary from "./config/cloudinary.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = process.env.DATABASE_URL?.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD || "",
);

const ensureAdminUser = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const existingAdmin = await userModel.findOne({ email: adminEmail });

  if (existingAdmin) {
    return;
  }

  await userModel.create({
    name: "Admin",
    email: adminEmail,
    password: adminPassword,
    passwordConfirm: adminPassword,
    role: "admin",
  });

  console.log("Default admin user created");
};

if (!DB) {
  console.error("DATABASE_URL is not set. Please add it to the .env file.");
} else {
  mongoose
    .connect(DB)
    .then(async () => {
      console.log("Connected to MongoDB");
      await ensureAdminUser();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
