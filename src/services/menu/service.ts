import axios from "axios";
import http from "../http-service";

const CancelToken = axios.CancelToken;

/**
 * Returns all menus for selected user.
 * @param cancelSource
 * @returns
 */
export const getAllMenus = async (): Promise<Menu[] | undefined> => {
  try {
    const source = CancelToken.source();
    const url = `/menus`;
    const method = "get";
    const data = null;
    const cancelToken = source.token;

    const response = await http.request({
      url,
      method,
      data,
      cancelToken,
    });
    if (!response) {
      return null as any;
    }

    return response.data as Menu[];
  } catch (error) {
    console.log(error);
  }
};

/**
 * Adds a given menu to the user.
 * @param payload
 * @returns The created menu.
 */
export const postMenu = async (payload: {
  menu: Omit<Menu, "id" | "categories">;
}): Promise<Menu | undefined> => {
  const source = CancelToken.source();
  const url = `/menus`;
  const method = "post";
  const data = payload;
  const cancelToken = source.token;

  const response = await http.request({ url, method, data, cancelToken });
  if (!response) {
    return null as any;
  }

  return response.data as Menu;
};

/**
 * Removes a menu given the `id`.
 * @param payload
 * @returns The deleted menu.
 */
export const deleteMenu = async (payload: {
  id: string;
}): Promise<Menu | undefined> => {
  const source = CancelToken.source();
  const url = "/menus";
  const method = "delete";
  const data = payload;
  const cancelToken = source.token;

  const response = await http.request({ url, method, data, cancelToken });
  if (!response) {
    return null as any;
  }

  return response.data as Menu;
};
