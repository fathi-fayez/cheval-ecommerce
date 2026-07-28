export type CartDemoItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  volumeMl: number;
  quantity: number;
};

export const SHIPPING_FEE = 10;

export const DEMO_CART_ITEMS: CartDemoItem[] = [
  {
    id: "demo-noir",
    name: "Noir Équestre",
    price: 148,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    volumeMl: 100,
    quantity: 1,
  },
  {
    id: "demo-rose",
    name: "Rose Sauvage",
    price: 128,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    volumeMl: 50,
    quantity: 1,
  },
];

export function getCartSubtotal(items: CartDemoItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartTotal(items: CartDemoItem[]): number {
  if (items.length === 0) return 0;
  return getCartSubtotal(items) + SHIPPING_FEE;
}
