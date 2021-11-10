import { http } from "../http";
import { AxiosResponse } from "axios";

export const fetchFoods = async (
  menuId: string,
  categoryId: string
): Promise<Food[]> => {
  const { data } = await http.get<Food[]>(
    `/menus/${menuId}/categories/${categoryId}/foods`
  );
  return data;
};

export const fetchFood = async (
  menuId: string,
  categoryId: string,
  foodId: string
): Promise<Food> => {
  const { data } = await http.get<Food>(
    `/menus/${menuId}/categories/${categoryId}/foods/${foodId}`
  );
  return data;
};

export const createFood = async (
  menuId: string,
  categoryId: string,
  food: Omit<Food, "id">
): Promise<Food> => {
  const { data } = await http.post<Omit<Food, "id">, AxiosResponse<Food>>(
    `/menus/${menuId}/categories/${categoryId}/foods`,
    food
  );
  return data;
};

export const updateFood = async (
  menuId: string,
  categoryId: string,
  food: Food
): Promise<Food> => {
  const { data } = await http.put<Food>(
    `/menus/${menuId}/caategories/${categoryId}/foods/${food.id}`,
    food
  );
  return data;
};

export const deleteFood = async (
  menuId: string,
  categoryId: string,
  foodId: string
): Promise<Food> => {
  const { data } = await http.put<Food>(
    `/menus/${menuId}/caategories/${categoryId}/foods/${foodId}`
  );
  return data;
};
