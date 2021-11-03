import { CancelTokenSource } from "axios";
import http from "../http-service";

/**
 * Returns all menus for selected user.
 * @param cancelSource
 * @returns
 */
export const getAllMenus = async (
  { id }: { id: string },
  cancelSource: CancelTokenSource
): Promise<Menu[] | undefined> => {
  try {
    const url = `${id}/menus`;
    const method = "get";
    const data = null;
    const cancelToken = cancelSource.token;

    const response = await http.request({
      url,
      method,
      data,
      cancelToken,
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
