import AsyncStorage from "@react-native-async-storage/async-storage";

const MENU_KEY = "@menus";

export const getAllMenus = async (): Promise<Menu[]> => {
  const allKeys = await AsyncStorage.getAllKeys();
  const menuKeys = allKeys.filter((key) => key.startsWith(MENU_KEY));
  const stored = await AsyncStorage.multiGet(menuKeys);
  const menus = stored.map((menu) => {
    if (menu[1]) return JSON.parse(menu[1]) as Menu;
    return JSON.parse(menu[1] || "") as Menu;
  });

  return menus;
};

export const addMenu = async (
  menu: Omit<Menu, "id" | "categories">
): Promise<void> => {
  const id = new Date().getTime();
  return AsyncStorage.setItem(`${MENU_KEY}${id}`, JSON.stringify(menu));
};

export const removeMenu = async (id: string): Promise<void> => {
  return AsyncStorage.removeItem(id);
};

// updateMenu
