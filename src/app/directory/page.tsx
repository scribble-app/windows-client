"use client";

import { useSearchParams } from "next/navigation";
import { MainBlockDiv, MainText } from "../styles/globalStyles";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useRef, useState } from "react";
import {
  DirectoryInfoDiv,
  DirectoryTitleInput,
  DirectoryTitleText,
} from "./style";

const Page = () => {
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const [directory, setDirectory] = useState<Dir | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    invoke<Dir>("get_directory", { id: searchParams.get("id") })
      .then((result) => {
        setDirectory(result);
        setTitle(result.title === "" ? "unnamed" : result.title);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!inputRef.current?.contains(event.target as Node)) {
        setIsEditing(false);
        console.log(title);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [inputRef]);

  return (
    <MainBlockDiv>
      <DirectoryInfoDiv>
        {isEditing ? (
          <DirectoryTitleInput
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <DirectoryTitleText onDoubleClick={() => setIsEditing(true)}>
            {title}
          </DirectoryTitleText>
        )}
      </DirectoryInfoDiv>
    </MainBlockDiv>
  );
};

export default Page;
