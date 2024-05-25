import { isRegistered, register } from "@tauri-apps/api/globalShortcut";
import { MenuItemType } from "./type";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

const shortcuts = async (
  navigation: MenuItemType[],
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
) => {
  for (const menu of navigation) {
    for (const item of menu.list) {
      if (item.shortcut.value !== "") {
        if (!(await isRegistered(item.shortcut.value))) {
          await register(item.shortcut.value, () => {
            if (document.hasFocus()) {
              item.function(router, searchParams);
            }
          });
        }
      }
    }
  }
};

export default shortcuts;
