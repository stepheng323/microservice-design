import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const UserStatus = {
  active: 'active',
  inactive: 'inactive',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export type User = {
  id: Generated<string>;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  status: Generated<UserStatus>;
  profileImage: string | null;
  phoneNumber: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Timestamp | null;
};
export type DB = {
  User: User;
};
