import create from "zustand";

type FoodStoreType = {
  addFood: (menuId: string, categoryId: string, food: Omit<Food, "id">) => void;
  addFoods: (
    menuId: string,
    categoryId: string,
    foods: Omit<Food[], "id">
  ) => void;
  removeFood: (menuId: string, categoryId: string, foodId: string) => void;
  updateFood: (menuId: string, categoryId: string, food: Food) => void;
};

const useFoodStore = create<FoodStoreType>((set, get) => ({
  addFood: async (menuId, categoryId, food) => {},
  addFoods: async (menuId, categoryId, foods) => {},
  removeFood: async (menuId, categoryId, foodId) => {},
  updateFood: async (menuId, categoryId, food) => {},
}));

export default useFoodStore;
