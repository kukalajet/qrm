import create from "zustand";

type CategoryStoreType = {
  addCategory: (
    menuId: string,
    category: Omit<Category, "id" | "foods">
  ) => void;
  removeCategory: (menuId: string, categoryId: string) => void;
  updateCategory: (menuId: string, category: Omit<Category, "foods">) => void;
};

const useCategoryStore = create<CategoryStoreType>((set, get) => ({
  addCategory: async (menuId, category) => {},
  removeCategory: async (menuId, categoryId) => {},
  updateCategory: async (menuId, category) => {},
}));

export default useCategoryStore;
