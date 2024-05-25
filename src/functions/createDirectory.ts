import { invoke } from "@tauri-apps/api/tauri";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const createDirectory = (router: AppRouterInstance) => {
  invoke<string>("create_directory")
    .then((result) => router.push(`/directory?id=${result}`))
    .catch((error) => console.error(error));
};

export default createDirectory;
