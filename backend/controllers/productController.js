import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";
import ProductModel from "../models/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const parseNotes = (notes) => {
  if (!notes) return undefined;
  if (typeof notes === "string") {
    try {
      return JSON.parse(notes);
    } catch {
      return undefined;
    }
  }
  return notes;
};

const getAllProducts = catchAsync(async (req, res, next) => {
  const filter = {};

  if (req.query.bestseller === "true") {
    filter.bestseller = true;
  } else if (req.query.bestseller === "false") {
    filter.bestseller = false;
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  let query = ProductModel.find(filter);

  const sortBy = req.query.sort || "-createdAt";
  query = query.sort(sortBy);

  if (req.query.limit) {
    const limit = Number(req.query.limit);
    if (!Number.isNaN(limit) && limit > 0) {
      query = query.limit(limit);
    }
  }

  const products = await query;

  res
    .status(200)
    .json({ status: "success", results: products.length, data: { products } });
});

const createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    price,
    category,
    bestseller,
    volumeMl,
    concentration,
    notes,
    fragranceFamily,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !category ||
    !volumeMl ||
    !concentration ||
    !fragranceFamily
  ) {
    return next(
      new AppError(
        "name, description, price, category, volumeMl, concentration, and fragranceFamily are required",
        400,
      ),
    );
  }

  if (!req.files || (!req.files.image1 && !req.files.image2)) {
    return next(new AppError("At least one product image is required", 400));
  }

  const currentConfig = cloudinary.config();
  if (
    !currentConfig.api_key ||
    !currentConfig.api_secret ||
    !currentConfig.cloud_name
  ) {
    return next(new AppError("Cloudinary is not configured", 500));
  }

  const imageFields = ["image1", "image2"];
  const uploadedImages = [];

  for (const field of imageFields) {
    const files = req.files[field];
    if (!files || files.length === 0) continue;

    const file = files[0];
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: "cheval-ecommerce/products",
    });

    uploadedImages.push(uploadResult.secure_url);

    await fs.unlink(file.path).catch(() => null);
  }

  if (uploadedImages.length === 0) {
    return next(new AppError("Failed to upload product images", 500));
  }

  const product = await ProductModel.create({
    name,
    description,
    price: Number(price),
    category,
    bestseller: bestseller === true || bestseller === "true",
    volumeMl: Number(volumeMl),
    concentration,
    notes: parseNotes(notes),
    fragranceFamily,
    image: uploadedImages[0],
    images: uploadedImages,
  });

  res.status(201).json({ status: "success", data: { product } });
});

const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: { product } });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (updateData.notes !== undefined) {
    updateData.notes = parseNotes(updateData.notes);
  }

  if (updateData.price !== undefined) {
    updateData.price = Number(updateData.price);
  }

  if (updateData.volumeMl !== undefined) {
    updateData.volumeMl = Number(updateData.volumeMl);
  }

  if (updateData.bestseller !== undefined) {
    updateData.bestseller =
      updateData.bestseller === true || updateData.bestseller === "true";
  }

  const product = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: { product } });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductModel.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});

export {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
