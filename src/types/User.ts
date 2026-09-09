export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
