import { invoke } from "@tauri-apps/api/tauri";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const createDocument = (router: AppRouterInstance) => {
  invoke<string>("create_document")
    .then((result) => router.push(`/document?id=${result}`))
    .catch((error) => console.error(error));
};

export default createDocument;
