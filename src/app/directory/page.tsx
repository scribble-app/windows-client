"use client";

import { useSearchParams } from "next/navigation";
import { MainBlockDiv } from "../styles/globalStyles";
import { invoke } from "@tauri-apps/api/tauri";
import { DragEvent, useContext, useEffect, useState } from "react";
import {
  ColumnsContainerDiv,
  ColumnsDiv,
  DirectoryInfoDiv,
  DirectoryTitleInput,
  UntaggedItemsDiv,
} from "./style";
import useDirectoryTitleState from "@/hooks/useDitectoryTitleState";
import DocumentSmallItem from "./components/documentSmallItem";
import DirectorySmallItem from "./components/directorySmallItem";
import CreateColumnItem from "./components/createColumnItem";
import ColumnItem from "./components/columnItem";
import FontScaleContext from "@/contexts/fontScaleContext";

const Page = () => {
  const searchParams = useSearchParams();

  const { fontScale } = useContext(FontScaleContext);

  const [title, setTitle] = useDirectoryTitleState(searchParams);
  const [childrens, setChildrens] = useState<Item[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    invoke<Dir>("get_directory", { id: searchParams.get("id") })
      .then((result) => {
        setTitle(result.title === "" ? "unnamed" : result.title);
        setColumns(result.columns);
        setChildrens(result.childrens);
      })
      .catch((error) => console.error(error));
  }, [searchParams]);

  const handleDragStart = (e: DragEvent<HTMLButtonElement>, item: Item) => {
    e.dataTransfer?.setData("itemId", item.id);
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    highlightIndicator(e);
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const handleDragEnd = (e: DragEvent<HTMLButtonElement>, column: Column) => {
    const cardId = e.dataTransfer.getData("itemId");
    clearHighlights();
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before === cardId) return;

    invoke<Item[]>("nasral", {
      itemId: cardId,
      tagId: column.id,
      color: column.color,
      title: column.title,
      targetId: before,
    })
      .then((result) => {
        setChildrens(result);
      })
      .catch(console.error);
  };

  const highlightIndicator = (e: DragEvent<HTMLButtonElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const removeHandleDragEnd = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearHighlights();
    e.currentTarget.style.border = "none";
    const cardId = e.dataTransfer.getData("itemId");

    invoke<Item[]>("nasral", {
      itemId: cardId,
      tagId: "",
      color: "",
      title: "",
      targetId: "",
    })
      .then((result) => {
        setChildrens(result);
      })
      .catch(console.error);
  };

  const removeHandleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearHighlights();
    e.currentTarget.style.border = "1px solid white";
  };

  const removeHandleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.border = "none";
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLButtonElement>,
    indicators: HTMLElement[]
  ) => {
    const dragEventX = e.clientX;
    const dragEventY = e.clientY;

    let nearestIndicator = indicators[0];
    let nearestDistance = Infinity;

    indicators.forEach((indicator) => {
      const rect = indicator.getBoundingClientRect();
      const indicatorX = rect.left + rect.width / 2;
      const indicatorY = rect.top + rect.height / 2;
      const distance = Math.hypot(
        dragEventX - indicatorX,
        dragEventY - indicatorY
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndicator = indicator;
      }
    });

    return { element: nearestIndicator };
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        "#item-drop-indicator"
      ) as unknown as HTMLElement[]
    );
  };

  return (
    <MainBlockDiv>
      <DirectoryInfoDiv>
        <DirectoryTitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          $fontScale={fontScale}
        />
      </DirectoryInfoDiv>
      <ColumnsDiv>
        <CreateColumnItem searchParams={searchParams} setColumns={setColumns} />
        <ColumnsContainerDiv>
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              childrens={childrens}
              setColumns={setColumns}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDragEnd={handleDragEnd}
            />
          ))}
        </ColumnsContainerDiv>
      </ColumnsDiv>
      <UntaggedItemsDiv
        onDragOver={removeHandleDragOver}
        onDrop={(e) => removeHandleDragEnd(e as any)}
        onDragLeave={removeHandleDragLeave}
        draggable={false}
      >
        {childrens.map((child) => {
          if ("Document" in child) {
            const documentItem = child as { Document: Doc };
            if (
              !documentItem.Document.tags.some(
                (tag) => tag.is_belong_column === true
              )
            ) {
              return (
                <DocumentSmallItem
                  key={documentItem.Document.id}
                  doc={documentItem.Document}
                  handleDragStart={handleDragStart}
                />
              );
            }
          } else if ("Directory" in child) {
            const directoryItem = child as { Directory: Dir };
            if (
              !directoryItem.Directory.tags.some(
                (tags) => tags.is_belong_column === true
              )
            ) {
              return (
                <DirectorySmallItem
                  key={directoryItem.Directory.id}
                  dir={directoryItem.Directory}
                  handleDragStart={handleDragStart}
                />
              );
            }
          }
        })}
      </UntaggedItemsDiv>
    </MainBlockDiv>
  );
};

export default Page;
