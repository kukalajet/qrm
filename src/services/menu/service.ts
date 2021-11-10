import { http } from "../http";
import { AxiosResponse } from "axios";

/**
 * Retrieves all menus for the current user.
 * @returns All fetched menus
 */
export const fetchMenus = async (): Promise<Menu[]> => {
  const { data } = await http.get<Menu[]>("/menus");
  return data;
};

/**
 * Retrieves a menu given the id.
 * @param id Menu's id
 * @returns Fetched menu
 */
export const fetchMenu = async (id: string): Promise<Menu> => {
  const { data } = await http.get<Menu>(`/menus/${id}`);
  return data;
};

/**
 * Creates a given menu.
 * @param menu Menu to create
 * @returns Created menu
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
 * Updates a given menu.
 * @param menu Menu to update
 * @returns Updated menu
 */
export const updateMenu = async (
  menu: Omit<Menu, "categories">
): Promise<Menu> => {
  const { data } = await http.put<
    Omit<Menu, "categories">,
    AxiosResponse<Menu>
  >(`/menus/${menu.id}`, menu);
  return data;
};

/**
 * Deletes a menu given the id.
 * @param id Menu id
 * @returns Deleted menu
 */
export const deleteMenu = async (id: string): Promise<Menu> => {
  const { data } = await http.delete<Menu>(`/menus/${id}`);
  return data;
};
