import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const getCart = catchAsync(async (req, res, next) => {
  const user = await userModel
    .findById(req.user.id)
    .populate("cartDetails.productId", "name price image");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    results: user.cartDetails.length,
    data: { cart: user.cartDetails },
  });
});

const addToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const existingItem = user.cartDetails.find(
    (item) => item.productId.toString() === productId,
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    user.cartDetails.push({ productId, quantity: Number(quantity) });
  }

  await user.save();

  const updatedUser = await userModel
    .findById(req.user.id)
    .populate("cartDetails.productId", "name price image");

  res.status(200).json({
    status: "success",
    data: { cart: updatedUser.cartDetails },
  });
});

const updateCartItem = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || Number(quantity) < 1) {
    return next(new AppError("Quantity must be at least 1", 400));
  }

  const user = await userModel.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const item = user.cartDetails.find(
    (cartItem) => cartItem.productId.toString() === productId,
  );

  if (!item) {
    return next(new AppError("Product not found in cart", 404));
  }

  item.quantity = Number(quantity);
  await user.save();

  const updatedUser = await userModel
    .findById(req.user.id)
    .populate("cartDetails.productId", "name price image");

  res.status(200).json({
    status: "success",
    data: { cart: updatedUser.cartDetails },
  });
});

const removeCartItem = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  const user = await userModel.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const itemIndex = user.cartDetails.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    return next(new AppError("Product not found in cart", 404));
  }

  user.cartDetails.splice(itemIndex, 1);
  await user.save();

  res.status(200).json({
    status: "success",
    data: { cart: user.cartDetails },
  });
});

const clearCart = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  user.cartDetails = [];
  await user.save();

  res.status(200).json({ status: "success", data: { cart: [] } });
});

export { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
