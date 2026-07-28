import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import ProductModel from "../models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

const perfumeImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&q=80",
  "https://images.unsplash.com/photo-1588405748880-12d1d2a59db9?w=600&q=80",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&q=80",
  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&q=80",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
  "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80",
  "https://images.unsplash.com/photo-1622617514489-8c0c0a4d2e0a?w=600&q=80",
  "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&q=80",
  "https://images.unsplash.com/photo-1593487568720-92097fb460fb?w=600&q=80",
  "https://images.unsplash.com/photo-1619994403073-2cec484c7f2e?w=600&q=80",
];

const products = [
  {
    name: "Noir Équestre",
    description:
      "A bold equine-inspired fragrance with dark woods, leather, and a whisper of smoky incense. Crafted for evenings that demand presence.",
    price: 148,
    category: "Men",
    bestseller: true,
    volumeMl: 100,
    concentration: "EDP",
    fragranceFamily: "Woody",
    notes: {
      top: ["Black Pepper", "Bergamot"],
      heart: ["Leather", "Cedar"],
      base: ["Oud", "Amber", "Musk"],
    },
  },
  {
    name: "Rose Sauvage",
    description:
      "Wild rose wrapped in soft peony and clean musk. An elegant floral signature for everyday refinement.",
    price: 128,
    category: "Women",
    bestseller: true,
    volumeMl: 50,
    concentration: "EDP",
    fragranceFamily: "Floral",
    notes: {
      top: ["Pink Pepper", "Lychee"],
      heart: ["Damask Rose", "Peony"],
      base: ["White Musk", "Sandalwood"],
    },
  },
  {
    name: "Citrus Gallop",
    description:
      "A sparkling citrus rush tempered by green herbs. Fresh, energetic, and built for daylight movement.",
    price: 98,
    category: "Unisex",
    bestseller: true,
    volumeMl: 100,
    concentration: "EDT",
    fragranceFamily: "Citrus",
    notes: {
      top: ["Sicilian Lemon", "Grapefruit"],
      heart: ["Mint", "Neroli"],
      base: ["Vetiver", "Cedar"],
    },
  },
  {
    name: "Ambre Cheval",
    description:
      "Warm amber and vanilla softened by tonka. A comforting oriental trail with lasting warmth.",
    price: 156,
    category: "Unisex",
    bestseller: true,
    volumeMl: 100,
    concentration: "Parfum",
    fragranceFamily: "Oriental",
    notes: {
      top: ["Cardamom", "Orange Blossom"],
      heart: ["Amber", "Labdanum"],
      base: ["Vanilla", "Tonka Bean"],
    },
  },
  {
    name: "Velvet Meadow",
    description:
      "Soft florals over a creamy base — romantic, airy, and quietly luxurious.",
    price: 118,
    category: "Women",
    bestseller: true,
    volumeMl: 50,
    concentration: "EDP",
    fragranceFamily: "Floral",
    notes: {
      top: ["Bergamot", "Pear"],
      heart: ["Jasmine", "Iris"],
      base: ["Cashmere Wood", "Musk"],
    },
  },
  {
    name: "Sable Marin",
    description:
      "Sea air, salt crystal, and driftwood. A coastal fresh scent with a modern edge.",
    price: 112,
    category: "Unisex",
    bestseller: false,
    volumeMl: 100,
    concentration: "EDT",
    fragranceFamily: "Fresh",
    notes: {
      top: ["Sea Salt", "Lemon"],
      heart: ["Driftwood", "Juniper"],
      base: ["Ambergris", "Moss"],
    },
  },
  {
    name: "Épice Royale",
    description:
      "Spiced cinnamon and clove over rich woods. A regal statement for cooler seasons.",
    price: 142,
    category: "Men",
    bestseller: false,
    volumeMl: 100,
    concentration: "EDP",
    fragranceFamily: "Spicy",
    notes: {
      top: ["Cinnamon", "Clove"],
      heart: ["Nutmeg", "Tobacco Leaf"],
      base: ["Patchouli", "Benzoin"],
    },
  },
  {
    name: "Blanc Pureté",
    description:
      "Crisp white florals and clean linen accords. Minimal, luminous, and effortlessly polished.",
    price: 108,
    category: "Women",
    bestseller: false,
    volumeMl: 50,
    concentration: "EDT",
    fragranceFamily: "Fresh",
    notes: {
      top: ["Aldehydes", "Green Apple"],
      heart: ["Lily of the Valley", "Magnolia"],
      base: ["White Musk", "Cedar"],
    },
  },
  {
    name: "Cuir de Piste",
    description:
      "Saddle leather and dry woods with a hint of tobacco. Refined masculine depth.",
    price: 164,
    category: "Men",
    bestseller: false,
    volumeMl: 75,
    concentration: "Parfum",
    fragranceFamily: "Woody",
    notes: {
      top: ["Elemi", "Pink Pepper"],
      heart: ["Suede", "Violet Leaf"],
      base: ["Leather", "Oakmoss"],
    },
  },
  {
    name: "Orangerie",
    description:
      "Sunlit orange blossom and neroli over soft woods. Bright Mediterranean elegance.",
    price: 122,
    category: "Unisex",
    bestseller: false,
    volumeMl: 100,
    concentration: "EDP",
    fragranceFamily: "Citrus",
    notes: {
      top: ["Bitter Orange", "Petitgrain"],
      heart: ["Neroli", "Orange Blossom"],
      base: ["Honey", "Sandalwood"],
    },
  },
  {
    name: "Mystique Nocturne",
    description:
      "Dark florals meet incense and resin. A mysterious evening fragrance with lasting trail.",
    price: 178,
    category: "Women",
    bestseller: false,
    volumeMl: 75,
    concentration: "Parfum",
    fragranceFamily: "Oriental",
    notes: {
      top: ["Blackcurrant", "Saffron"],
      heart: ["Tuberose", "Incense"],
      base: ["Myrrh", "Vanilla"],
    },
  },
  {
    name: "Vert Étalon",
    description:
      "Green galbanum and aromatic herbs with a woody finish. Sharp, modern, and outdoorsy.",
    price: 134,
    category: "Men",
    bestseller: false,
    volumeMl: 100,
    concentration: "Cologne",
    fragranceFamily: "Fresh",
    notes: {
      top: ["Galbanum", "Basil"],
      heart: ["Geranium", "Lavender"],
      base: ["Vetiver", "Oakmoss"],
    },
  },
];

const seedProducts = async () => {
  const DB = process.env.DATABASE_URL?.replace(
    "<db_password>",
    process.env.DATABASE_PASSWORD || "",
  );

  if (!DB) {
    console.error("DATABASE_URL is not set. Please add it to the .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(DB);
    console.log("Connected to MongoDB");

    await ProductModel.deleteMany({});
    console.log("Cleared existing products");

    const docs = products.map((product, index) => {
      const image = perfumeImages[index % perfumeImages.length];
      return {
        ...product,
        image,
        images: [image],
      };
    });

    await ProductModel.insertMany(docs);
    console.log(`Seeded ${docs.length} perfume products`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();
