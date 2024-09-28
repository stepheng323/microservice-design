import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Product = {
  id: string;
  userId: string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  isInStock: Generated<number>;
  productImage: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type DB = {
  Product: Product;
  User: User;
};
