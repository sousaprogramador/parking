export type UserProperties = {
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  is_active?: boolean;
  created_at?: Date;
};
