"use client";

import { useSearchParams } from "next/navigation";
import { MainBlockDiv } from "../styles/globalStyles";
import { invoke } from "@tauri-apps/api/tauri";
import { useContext, useEffect, useState } from "react";
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
            />
          ))}
        </ColumnsContainerDiv>
      </ColumnsDiv>
      <UntaggedItemsDiv>
        {childrens.map((child) => {
          if ("Document" in child) {
            const documentItem = child as { Document: Doc };
            if (
              !documentItem.Document.tags.some(
                (tag) => tag.is_belong_column === true,
              )
            ) {
              return (
                <DocumentSmallItem
                  key={documentItem.Document.id}
                  doc={documentItem.Document}
                />
              );
            }
          } else if ("Directory" in child) {
            const directoryItem = child as { Directory: Dir };
            if (
              !directoryItem.Directory.tags.some(
                (tags) => tags.is_belong_column === true,
              )
            ) {
              return (
                <DirectorySmallItem
                  key={directoryItem.Directory.id}
                  dir={directoryItem.Directory}
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
