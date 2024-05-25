import { invoke } from "@tauri-apps/api/tauri";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useDocumentState = (
  searchParams: ReadonlyURLSearchParams,
): [string, Dispatch<SetStateAction<string>>] => {
  const [doc, setDoc] = useState<string>("");

  const saveDoc = () => {
    invoke<string>("write_document", {
      content: doc,
    })
      .then((result) => setDoc(result))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (doc !== "") {
      saveDoc();
    }
  }, [searchParams]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      console.log("saved");
      saveDoc();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [doc]);

  return [doc, setDoc];
};

export default useDocumentState;
