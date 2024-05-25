import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MenuItemType } from "./type";
import createDocument from "@/functions/createDocument";
import createDirectory from "@/functions/createDirectory";
import removeCurrent from "@/functions/remove";
// import createDirectory from "@/functions/createDirectory";
// import remove from "@/functions/remove";

export const navigation: MenuItemType[] = [
  {
    name: "File",
    list: [
      {
        name: "New document",
        shortcut: {
          text: "Ctr+N",
          value: "CommandOrControl+N",
        },
        function: createDocument,
      },
      {
        name: "New directory",
        shortcut: {
          text: "Ctr+Shift+N",
          value: "CommandOrControl+Shift+N",
        },
        function: createDirectory,
      },
      {
        name: "Delete",
        shortcut: {
          text: "Del",
          value: "Delete",
        },
        function: removeCurrent,
      },
      {
        name: "Settings",
        shortcut: {
          text: "",
          value: "",
        },
        function: function (router: AppRouterInstance) {
          router.push("/settings");
        },
      },
    ],
  },
  {
    name: "Help",
    list: [
      {
        name: "Welcome",
        shortcut: {
          text: "",
          value: "",
        },
        function: function (router: AppRouterInstance) {
          router.push("/");
        },
      },
      {
        name: "About",
        shortcut: {
          text: "",
          value: "",
        },
        function: function () {},
      },
    ],
  },
];
