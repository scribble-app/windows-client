import { invoke } from "@tauri-apps/api/tauri";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const removeCurrent = (router: AppRouterInstance) => {
  invoke("remove_current")
    .then(() => router.push("/"))
    .catch((error) => console.error(error));
};

export default removeCurrent;
