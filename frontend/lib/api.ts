import type {
  GetProductsParams,
  Product,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    next: { revalidate: 60 },
  });

  if (response.status === 204) {
    return null as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data as T;
}

function buildQuery(params?: GetProductsParams): string {
  if (!params) return "";

  const search = new URLSearchParams();

  if (params.bestseller !== undefined) {
    search.set("bestseller", String(params.bestseller));
  }
  if (params.category) {
    search.set("category", params.category);
  }
  if (params.limit !== undefined) {
    search.set("limit", String(params.limit));
  }
  if (params.sort) {
    search.set("sort", params.sort);
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

export async function getProducts(
  params?: GetProductsParams,
): Promise<Product[]> {
  const data = await apiFetch<ProductsResponse>(
    `/api/v1/products${buildQuery(params)}`,
  );
  return data.data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const data = await apiFetch<ProductResponse>(`/api/v1/products/${id}`);
  return data.data.product;
}

export { ApiError, API_BASE_URL };
