import { DragEvent, KeyboardEvent, MouseEvent } from "react";
import DropIndicator from "./dropIndicator";
import {
  DirectoryArrowButton,
  DirectoryButton,
  DirectoryContainerDiv,
  DirectoryLeftDiv,
  DirectoryListDiv,
  DirectoryTitleText,
} from "../style";
import { ArrowIcon, DirectoryIcon } from "@/app/styles/icons";
import DocumentItem from "./documentItem";
import { useRouter } from "next/navigation";

interface Props {
  dir: Dir;
  currentId: string | null;
  handleDragStart: (
    e: DragEvent<HTMLButtonElement | HTMLDivElement>,
    item: Dir | Doc,
  ) => void;
  setIsOpen: (targetId: string, isOpen: boolean) => void;
}

const DirectoryItem = (props: Props) => {
  const { dir, currentId, handleDragStart, setIsOpen } = props;

  const router = useRouter();

  const click = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (event.ctrlKey) {
      setIsOpen(dir.id, !dir.is_open);
    } else {
      router.push(`/directory?id=${dir.id}`);
    }
  };

  const enter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      router.push(`/directory?id=${dir.id}`);
    }
  };

  return (
    <>
      <DropIndicator beforId={dir.id} />
      <DirectoryContainerDiv>
        <DirectoryButton
          id="file-drop-indicator"
          data-type="dir"
          data-before={dir.id}
          draggable={true}
          tabIndex={0}
          onDragStart={(e) => handleDragStart(e, dir)}
          onClick={(e) => click(e)}
          onKeyDown={(e) => enter(e)}
          $isClosed={!dir.is_open}
          $isActive={currentId === dir.id}
        >
          <DirectoryLeftDiv>
            <DirectoryIcon />
            <DirectoryTitleText>
              {dir.title === "" ? "unnamed" : dir.title}
            </DirectoryTitleText>
          </DirectoryLeftDiv>
          {dir.childrens.length > 0 && (
            <DirectoryArrowButton
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(dir.id, !dir.is_open);
              }}
            >
              <ArrowIcon />
            </DirectoryArrowButton>
          )}
        </DirectoryButton>
        {dir.is_open && (
          <DirectoryListDiv>
            {dir.childrens.map((item) => {
              if ("Document" in item) {
                const documentItem = item as { Document: Doc };
                return (
                  <DocumentItem
                    key={documentItem.Document.id}
                    doc={documentItem.Document}
                    currentId={currentId}
                    handleDragStart={handleDragStart}
                  />
                );
              } else if ("Directory" in item) {
                const directoryItem = item as { Directory: Dir };
                return (
                  <DirectoryItem
                    key={directoryItem.Directory.id}
                    dir={directoryItem.Directory}
                    currentId={currentId}
                    handleDragStart={handleDragStart}
                    setIsOpen={setIsOpen}
                  />
                );
              }
            })}
          </DirectoryListDiv>
        )}
      </DirectoryContainerDiv>
    </>
  );
};

export default DirectoryItem;
