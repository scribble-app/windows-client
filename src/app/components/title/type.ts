import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export interface ShortcutType {
  text: string;
  value: string;
}

export interface DropDownItemType {
  name: string;
  shortcut: ShortcutType;
  function: (
    router: AppRouterInstance,
    searchParams: ReadonlyURLSearchParams,
  ) => void;
}

export interface MenuItemType {
  name: string;
  list: DropDownItemType[];
}
