import { http } from "../http";
import { AxiosResponse } from "axios";

/**
 * Retrieves all foods given the category id and menu id.
 * @param menuId Menu id
 * @param categoryId Category id
 * @returns All foods in category in menu
 */
export const fetchFoods = async (
  menuId: Menu["id"],
  categoryId: Category["id"]
): Promise<Food[]> => {
  const { data } = await http.get<Food[]>(
    `/menus/${menuId}/categories/${categoryId}/foods`
  );
  return data;
};

/**
 * Retrieves a food given the menu id, the category id and the food id.
 * @param menuId Menu id
 * @param categoryId Catgory id
 * @param foodId Food id
 * @returns The searched food
 */
export const fetchFood = async (
  menuId: Menu["id"],
  categoryId: Category["id"],
  foodId: Food["id"]
): Promise<Food> => {
  const { data } = await http.get<Food>(
    `/menus/${menuId}/categories/${categoryId}/foods/${foodId}`
  );
  return data;
};

/**
 * Creates a given food given the category id and menu id.
 * @param menuId Menu id
 * @param categoryId Catgory id
 * @param food Food to create
 * @returns Created food
 */
export const createFood = async (
  menuId: Menu["id"],
  categoryId: Category["id"],
  food: Omit<Food, "id">
): Promise<Food> => {
  const { data } = await http.post<Omit<Food, "id">, AxiosResponse<Food>>(
    `/menus/${menuId}/categories/${categoryId}/foods`,
    food
  );
  return data;
};

/**
 * Updates a given food given the category id and menu id.
 * @param menuId Menu id
 * @param categoryId Catgory id
 * @param food Food to create
 * @returns Updated food
 */
export const updateFood = async (
  menuId: Menu["id"],
  categoryId: Category["id"],
  food: Food
): Promise<Food> => {
  const { data } = await http.put<Food>(
    `/menus/${menuId}/caategories/${categoryId}/foods/${food.id}`,
    food
  );
  return data;
};

/**
 * Deletes a food given the menu id, the category id and the food id.
 * @param menuId Menu id
 * @param categoryId Catgory id
 * @param foodId Food id
 * @returns The deleted food
 */
export const deleteFood = async (
  menuId: Menu["id"],
  categoryId: Category["id"],
  foodId: Food["id"]
): Promise<Food> => {
  const { data } = await http.put<Food>(
    `/menus/${menuId}/caategories/${categoryId}/foods/${foodId}`
  );
  return data;
};
