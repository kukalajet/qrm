import create from "zustand";
import axios from "axios";
import { getAllMenus } from "../../services/menus";

type MenuStoreType = {
  menus: Menu[];
  status: Status;
  getAllMenus: (userId: string) => void;
  addMenu: (menu: Menu) => void;
  removeMenu: (id: string) => void;
};

const useMenuStore = create<MenuStoreType>((set, get) => ({
  status: Status.Initial,
  menus: [],
  getAllMenus: async (id) => {
    const cancelSource = axios.CancelToken.source();
    const menus = await getAllMenus({ id }, cancelSource);
    set((state) => ({ menus: menus || [] }));
  },
  addMenu: (menu) => null,
  removeMenu: (id) => null,
}));

export default useMenuStore;
