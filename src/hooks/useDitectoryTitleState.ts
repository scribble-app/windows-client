import { invoke } from "@tauri-apps/api/tauri";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useDirectoryTitleState = (
  searchParams: ReadonlyURLSearchParams,
): [string, Dispatch<SetStateAction<string>>] => {
  const [title, setTitle] = useState<string>("");

  const saveTitle = () => {
    invoke<string>("set_title", {
      title,
    })
      .then((result) => setTitle(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      console.log("saved");
      saveTitle();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [title]);

  return [title, setTitle];
};

export default useDirectoryTitleState;
