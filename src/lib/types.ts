export type User = {
  id: string;
  name: string;
  email?: string;
  image: string;
  createdAt: any;
  bio: string;
  _count: { friends?: number; requests?: number };
  accounts?: { provider: string }[];
};
