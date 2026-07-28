export type OrderStatusKey =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export type OrderDemoItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  volumeMl: number;
  dateLabel: string;
  status: OrderStatusKey;
};

export const ORDER_STATUS_LABELS: Record<OrderStatusKey, string> = {
  Pending: "Order Placed",
  Processing: "Ready to ship",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

export const DEMO_ORDERS: OrderDemoItem[] = [
  {
    id: "order-noir",
    name: "Noir Équestre",
    price: 148,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    quantity: 1,
    volumeMl: 100,
    dateLabel: "25, May, 2024",
    status: "Processing",
  },
  {
    id: "order-rose",
    name: "Rose Sauvage",
    price: 128,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    quantity: 1,
    volumeMl: 50,
    dateLabel: "25, May, 2024",
    status: "Shipped",
  },
];
