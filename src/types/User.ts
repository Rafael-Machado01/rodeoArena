export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
