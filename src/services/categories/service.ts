import { http } from "../http";
import { AxiosResponse } from "axios";

/**
 * Retrieves all categories given the menu id.
 * @param id Menu id
 * @returns All menu's categories
 */
export const fetchCategories = async (id: string): Promise<Category[]> => {
  const { data } = await http.get<Category[]>(`/menus/${id}/categories`);
  return data;
};

/**
 * Retrieves a category given the menu's id and the category id.
 * @param menuId Menu id
 * @param categoryId Category id
 * @returns Menu's category
 */
export const fetchCategory = async (
  menuId: string,
  categoryId: string
): Promise<Category> => {
  const { data } = await http.get<Category>(
    `/menus/${menuId}/categories/${categoryId}`
  );
  return data;
};

/**
 * Creates a given category given the menu id.
 * @param menuId Menu id
 * @param category Category to create
 * @returns Created category
 */
export const createCategory = async (
  menuId: string,
  category: Omit<Category, "foods">
): Promise<Category> => {
  const { data } = await http.post<
    Omit<Category, "foods">,
    AxiosResponse<Category>
  >(`/menus/${menuId}/categories`, category);
  return data;
};

/**
 * Updates a given category given the menu id.
 * @param menuId Menu id
 * @param category Category to updated
 * @returns Updated category
 */
export const updateCategory = async (
  menuId: string,
  category: Omit<Category, "foods">
): Promise<Category> => {
  const { data } = await http.put<
    Omit<Category, "foods">,
    AxiosResponse<Category>
  >(`/menus/${menuId}/categories/${category.id}`, category);
  return data;
};

/**
 * Deletes a category given the menu id and category id.
 * @param menuId Menu id
 * @param categoryId Category id
 * @returns The deleted category
 */
export const deleteCategory = async (
  menuId: string,
  categoryId: string
): Promise<Category> => {
  const { data } = await http.delete<Category>(
    `/menus/${menuId}/categories/${categoryId}`
  );
  return data;
};
