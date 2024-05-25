import { DragEvent, useEffect, useState } from "react";
import {
  ListContainerDiv,
  MenuContainerDiv,
  MenuSectionDiv,
  SearchBoxDiv,
  SearchInput,
} from "./style";
import { invoke } from "@tauri-apps/api/tauri";
import DocumentItem from "./components/documentItem";
import DirectoryItem from "./components/directoryItem";
import { theme } from "@/app/styles/globalStyles";
import { SearchIcon } from "@/app/styles/icons";
import { useSearchParams } from "next/navigation";
import { listen } from "@tauri-apps/api/event";

interface Props {
  width: number;
}

interface DocEvent {
  status: string;
}

const Menu = (props: Props) => {
  const { width } = props;

  const searchParams = useSearchParams();

  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [currentId, setCurrentId] = useState<string | null>("");

  const handleDragStart = (
    e: DragEvent<HTMLButtonElement | HTMLDivElement>,
    item: Dir | Doc,
  ) => {
    setIsOpen(item.id, false);

    let ghostDiv = document.createElement("div");
    let ghostTitleDiv = document.createElement("div");
    let ghostTitle = document.createElement("p");
    let icon = e.currentTarget.querySelector("#icon")!.cloneNode(true);

    ghostDiv.classList.add("dragged");
    ghostTitleDiv.classList.add("title");
    ghostTitle.textContent = item.title === "" ? "unnamed" : `${item.title}`;

    ghostTitleDiv.appendChild(icon);
    ghostTitleDiv.appendChild(ghostTitle);
    ghostDiv.appendChild(ghostTitleDiv);

    document.body.appendChild(ghostDiv);

    e.dataTransfer.setDragImage(ghostDiv, 0, 0);
    e.dataTransfer.setData("itemId", item.id);
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const handleDragEnd = (e: DragEvent<HTMLButtonElement | HTMLDivElement>) => {
    clearHighlights();

    const indicators = getIdicators();
    const { element } = getNearestIndicator(e, indicators);

    const itemId = e.dataTransfer.getData("itemId");
    const before = element.dataset.before;

    if (itemId === before) return;

    invoke<Item[]>("item_move", {
      itemId,
      targetId: before,
      isDirectory: element.dataset.type == "dir",
    })
      .then((result) => setItems(result))
      .catch(console.error);
  };

  const highlightIndicator = (
    e: DragEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const indicators = getIdicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);

    if (el.element.dataset.type === "dir") {
      el.element.style.border = `2px dashed ${theme.colors.white}`;
    } else {
      el.element.style.opacity = "1";
    }
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIdicators();

    indicators.forEach((i) => {
      if (i.dataset.type === "dir") {
        i.style.border = "2px solid transparent";
      } else {
        i.style.opacity = "0";
      }
    });
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLButtonElement | HTMLDivElement>,
    indicators: HTMLElement[],
  ) => {
    const DISTANCE_OFFSET = 10;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else if (
          child.dataset.type === "dir" &&
          offset < 20 &&
          offset > closest.offset
        ) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return el;
  };

  const getIdicators = () => {
    return Array.from(
      document.querySelectorAll(
        "#file-drop-indicator",
      ) as unknown as HTMLElement[],
    );
  };

  const setIsOpen = (targetId: string, isOpen: boolean) => {
    invoke<Item[]>("toggle_open_directory", { targetId, isOpen })
      .then((result) => setItems(result))
      .catch(console.error);
  };

  useEffect(() => {
    const unlisten = listen<DocEvent>("doc", (event) => {
      if (event.payload.status === "updated") {
        invoke<Item[]>("get_items")
          .then((result) => {
            setItems(result);
          })
          .catch(console.error);
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  useEffect(() => {
    invoke<Item[]>("get_items")
      .then((result) => {
        setItems(result);
        setCurrentId(searchParams.get("id"));
      })
      .catch(console.error);
  }, [searchParams]);

  return (
    <MenuSectionDiv $width={width}>
      <MenuContainerDiv>
        <SearchBoxDiv>
          <SearchIcon />
          <SearchInput
            placeholder="Type to search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBoxDiv>
        <ListContainerDiv
          onDrop={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {search.length == 0 &&
            items.map((item) => {
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
        </ListContainerDiv>
      </MenuContainerDiv>
    </MenuSectionDiv>
  );
};

export default Menu;
