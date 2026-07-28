import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: { orders },
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const { shippingAddress, paymentMethod = "COD" } = req.body;

  if (!shippingAddress) {
    return next(new AppError("Shipping address is required", 400));
  }

  const user = await userModel
    .findById(req.user.id)
    .populate("cartDetails.productId", "name price image");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.cartDetails || user.cartDetails.length === 0) {
    return next(new AppError("Your cart is empty", 400));
  }

  const items = user.cartDetails.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity,
    image: item.productId.image || "",
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = await OrderModel.create({
    user: req.user.id,
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
  });

  user.cartDetails = [];
  await user.save();

  res.status(201).json({
    status: "success",
    data: { order },
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await OrderModel.findOne({ _id: id, user: req.user.id });

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return next(new AppError("Status is required", 400));
  }

  const order = await OrderModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

export { getMyOrders, createOrder, getOrderById, updateOrderStatus };
