import create from "zustand";
import {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../../services/menu";

type MenuStoreType = {
  menus: Menu[];
  status: Status;
  fetchMenus: () => void;
  createMenu: (menu: Omit<Menu, "id" | "categories">) => void;
  updateMenu: (menu: Menu) => void;
  deleteMenu: (id: string) => void;
};

const useMenuStore = create<MenuStoreType>((set, get) => ({
  menus: [],
  status: "initial",
  fetchMenus: async () => {
    const status = get().status;
    if (status !== "loading") set(() => ({ status: "loading" }));
    const menus = await fetchMenus();
    set(() => ({ menus: menus || [], status: "success" }));
  },
  createMenu: async (menu) => {
    const status = get().status;
    if (status !== "loading") set(() => ({ status: "loading" }));
    const created = await createMenu(menu);
    if (!created) {
      __DEV__ && console.log(`given menu: ${menu} has not been created`);
      set(() => ({ status: "failure" }));
      return null;
    }
    const menus = get().menus;
    const newMenus = menus.concat(created);
    set(() => ({ menus: newMenus, status: "success" }));
  },
  updateMenu: async (menu) => {
    const updated = await updateMenu(menu);
    if (!updated) {
      __DEV__ && console.log(`given menu #${menu.id} has not been updated`);
      return null;
    }
    const menus = get().menus;
    const newMenus = menus.map((item) => {
      if (item.id === menu.id) return menu;
      return item;
    });
    set((_) => ({ menus: newMenus }));
  },
  deleteMenu: async (id) => {
    const deleted = await deleteMenu(id);
    if (!deleted) {
      __DEV__ && console.log(`menu for id #${id} has not been deleted`);
      return null;
    }
    const menus = get().menus;
    const newMenus = menus.filter((menu) => menu.id !== id);
    set((_) => ({ menus: newMenus }));
  },
}));

export default useMenuStore;
