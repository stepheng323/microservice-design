import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const OrderStatus = {
  pending: 'pending',
  confirm: 'confirm',
  shipped: 'shipped',
  delivered: 'delivered',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export type Order = {
  id: Generated<string>;
  productId: string;
  userId: string;
  amount: string;
  quantity: number;
  status: Generated<OrderStatus>;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type Product = {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: string;
  productImage: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type User = {
  id: Generated<string>;
  email: string;
  firstname: string;
  lastname: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type DB = {
  Order: Order;
  Product: Product;
  User: User;
};
