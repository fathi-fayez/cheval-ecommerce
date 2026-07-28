import express from "express";
import {
  getMyOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getMyOrders).post(createOrder);
router.route("/:id").get(getOrderById);
router.route("/:id/status").patch(restrictTo("admin"), updateOrderStatus);

export default router;
