import create from "zustand";
import { deleteMenu, getAllMenus, postMenu } from "../../services/menus";

type MenuStoreType = {
  menus: Menu[];
  status: Status;
  getAllMenus: () => void;
  addMenu: (menu: Omit<Menu, "id">) => void;
  removeMenu: (id: string) => void;
};

const useMenuStore = create<MenuStoreType>((set, get) => ({
  menus: [],
  status: Status.Initial,
  getAllMenus: async () => {
    const status = get().status;
    if (status !== Status.Initial) set(() => ({ status: Status.Initial }));
    const menus = await getAllMenus();
    set((_) => ({ menus: menus || [], status: Status.Success }));
  },
  addMenu: async (menu) => {
    const created = await postMenu({ menu });
    if (!created) {
      __DEV__ && console.log(`given menu: ${menu} has not been created`);
      return null;
    }
    const menus = get().menus;
    const newMenus = menus.concat(created);
    set((_) => ({ menus: newMenus }));
  },
  removeMenu: async (id) => {
    const deleted = await deleteMenu({ id });
    if (!deleted) {
      __DEV__ && console.log(`given id: ${id} menu has not been deleted`);
      return null;
    }
    const menus = get().menus;
    const newMenus = menus.filter((menu) => menu.id !== id);
    set((_) => ({ menus: newMenus }));
  },
}));

export default useMenuStore;
