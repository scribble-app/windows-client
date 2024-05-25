"use client";

import { useSearchParams } from "next/navigation";
import { MainBlockDiv } from "../styles/globalStyles";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { DirectoryInfoDiv, DirectoryTitleInput } from "./style";
import useDirectoryTitleState from "@/hooks/useDitectoryTitleState";

const Page = () => {
  const searchParams = useSearchParams();

  const [title, setTitle] = useDirectoryTitleState(searchParams);

  useEffect(() => {
    invoke<Dir>("get_directory", { id: searchParams.get("id") })
      .then((result) => {
        setTitle(result.title);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  return (
    <MainBlockDiv>
      <DirectoryInfoDiv>
        <DirectoryTitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DirectoryInfoDiv>
    </MainBlockDiv>
  );
};

export default Page;
