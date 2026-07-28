import express from "express";
import {
  signup,
  login,
  adminLogin,
  logout,
  getAllUsers
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;
