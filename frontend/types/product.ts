export type ProductCategory = "Men" | "Women" | "Unisex";

export type Concentration = "EDP" | "EDT" | "Parfum" | "Cologne";

export type FragranceFamily =
  | "Floral"
  | "Woody"
  | "Oriental"
  | "Fresh"
  | "Citrus"
  | "Spicy";

export type ProductNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  images: string[];
  bestseller: boolean;
  volumeMl: number;
  concentration: Concentration;
  notes: ProductNotes;
  fragranceFamily: FragranceFamily;
  createdAt: string;
  updatedAt: string;
};

export type ProductsResponse = {
  status: string;
  results: number;
  data: {
    products: Product[];
  };
};

export type ProductResponse = {
  status: string;
  data: {
    product: Product;
  };
};

export type GetProductsParams = {
  bestseller?: boolean;
  category?: ProductCategory;
  limit?: number;
  sort?: string;
};
