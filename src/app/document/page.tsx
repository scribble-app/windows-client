"use client";

import { useSearchParams } from "next/navigation";
import { MainText } from "../styles/globalStyles";
import { useCallback, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import ViewModeContext from "@/contexts/viewModeContext";
import { ViewMode } from "@/type";
import useDocumentState from "@/hooks/useDocumentState";
import {
  ContainerDiv,
  NoteResizerConteinerDiv,
  ResizerColumnDiv,
} from "./style";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/preview";

const Page = () => {
  const { viewMode, setViewMode } = useContext(ViewModeContext);

  const searchParams = useSearchParams();
  const [doc, setDoc] = useDocumentState(searchParams);
  const [width, setWidth] = useState(50);
  const [mouseDown, setMouseDown] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("auto");

  const menuSize = {
    min: 20,
    max: 80,
  };

  useEffect(() => {
    invoke<string>("get_document", { id: searchParams.get("id") })
      .then((result) => {
        setDoc(result);
        setViewMode(ViewMode.Preview);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    setCursorStyle("ew-resize");
    event.preventDefault();
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setCursorStyle("auto");
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDown) {
      const container = event.currentTarget.getBoundingClientRect();
      const newWidth = Math.min(
        ((event.pageX - container.left - 3.5) / container.width) * 100,
        menuSize.max,
      );
      if (newWidth > menuSize.min) {
        setWidth(newWidth);
      }
    }
  };

  const doubleClick = () => {
    setViewMode(ViewMode.Edit);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <ContainerDiv
      onDoubleClick={() => viewMode === ViewMode.Preview && doubleClick()}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      $cursorStyle={cursorStyle}
    >
      <Editor
        onChange={handleDocChange}
        initialDoc={doc}
        mode={viewMode}
        width={width}
      />
      {viewMode == ViewMode.Middle && (
        <NoteResizerConteinerDiv onMouseDown={handleMouseDown}>
          <ResizerColumnDiv />
        </NoteResizerConteinerDiv>
      )}
      <Preview doc={doc} mode={viewMode} />
    </ContainerDiv>
  );
};

export default Page;
