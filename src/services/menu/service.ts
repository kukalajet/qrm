import { http } from "../http";
import { AxiosResponse } from "axios";

/**
 * Retrieves all menus for the current user.
 * @returns All menus.
 */
export const fetchMenus = async (): Promise<Menu[]> => {
  const { data } = await http.get<Menu[]>("/menus");
  return data;
};

/**
 * Creates a given menu for the current user.
 * @param menu Menu to create.
 * @returns The created menu.
 */
export const createMenu = async (
  menu: Omit<Menu, "id" | "categories">
): Promise<Menu> => {
  const { data } = await http.post<
    Omit<Menu, "id" | "categories">,
    AxiosResponse<Menu>
  >("/menus", menu);
  return data;
};

/**
 * Updates a given menu for the current user.
 * @param menu Menu to update.
 * @returns The updated menu.
 */
export const updateMenu = async (menu: Menu): Promise<Menu> => {
  const { data } = await http.put<Menu>(`/menus/${menu.id}`, menu);
  return data;
};

/**
 * Deletes a menu to the current user given the `id`.
 * @param id Menu's id
 * @returns The deleted menu.
 */
export const deleteMenu = async (id: string): Promise<Menu> => {
  const { data } = await http.delete<Menu>(`/menus/${id}`);
  return data;
};
