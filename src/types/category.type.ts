export type Category = {
  _id: string;
  name: string;
  status: boolean;
  parent_id: string;
  children: Category[];
};

export type CreateCategory = Omit<Category, "_id" | "children">;
