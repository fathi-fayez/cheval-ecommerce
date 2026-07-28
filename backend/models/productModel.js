import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    top: { type: [String], default: [] },
    heart: { type: [String], default: [] },
    base: { type: [String], default: [] },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Unisex"],
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    volumeMl: {
      type: Number,
      required: true,
    },
    concentration: {
      type: String,
      required: true,
      enum: ["EDP", "EDT", "Parfum", "Cologne"],
    },
    notes: {
      type: notesSchema,
      default: () => ({ top: [], heart: [], base: [] }),
    },
    fragranceFamily: {
      type: String,
      required: true,
      enum: ["Floral", "Woody", "Oriental", "Fresh", "Citrus", "Spicy"],
    },
  },
  { timestamps: true },
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
