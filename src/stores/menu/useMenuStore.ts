import create from "zustand";
import {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../../services/menu";

// WIP
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type MenuStoreType = {
  menus: Menu[];
  status: Status;
  error: string | null;
  fetchMenus: () => void;
  createMenu: (menu: Omit<Menu, "id" | "categories">) => void;
  updateMenu: (menu: Menu) => void;
  deleteMenu: (id: string) => void;
};

const useMenuStore = create<MenuStoreType>((set, get) => ({
  menus: [],
  status: "initial",
  error: null,
  fetchMenus: async () => {
    const status = get().status;
    const error = get().error;
    if (status !== "loading" || error !== null) {
      set(() => ({ status: "loading", error: null }));
    }
    const menus = await fetchMenus();
    console.log(menus);
    set(() => ({ menus: menus || [], status: "success" }));
  },
  createMenu: async (menu) => {
    const status = get().status;
    const error = get().error;
    if (status !== "loading" || error !== null) {
      set(() => ({ status: "loading", error: null }));
    }

    // testing
    await delay(5000);

    try {
      const created = await createMenu(menu);
      if (!created) {
        __DEV__ && console.log(`given menu: ${menu} has not been created`);
        set(() => ({ status: "failure" }));
        return null;
      }
      const menus = get().menus;
      const newMenus = menus.concat(created);
      set(() => ({ menus: newMenus, status: "success" }));
    } catch (error) {
      set(() => ({ status: "failure", error: "Failed to create the menu." }));
    }
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
