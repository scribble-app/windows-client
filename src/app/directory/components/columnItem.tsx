import { TrashIcon } from "@/app/styles/icons";
import {
  ColumnDiv,
  ColumnItemsDiv,
  ColumnTitleDiv,
  ColumnTitleText,
} from "../style";
import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { invoke } from "@tauri-apps/api/tauri";
import ColumnDropIndicator from "./columnDropIndicator";
import DocumentSmallItem from "./documentSmallItem";
import DirectorySmallItem from "./directorySmallItem";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  column: Column;
  childrens: Item[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  handleDragStart: (e: DragEvent<HTMLButtonElement>, item: Item) => void;
  handleDragOver: (e: DragEvent<HTMLButtonElement>) => void;
  handleDragLeave: () => void;
  handleDragEnd: (e: DragEvent<HTMLButtonElement>, column: Column) => void;
}

const ColumnItem = (props: Props) => {
  const {
    column,
    childrens,
    setColumns,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragEnd,
  } = props;

  useEffect(() => {
    const indicators = document.querySelectorAll("[data-column]");
    indicators.forEach((indicator) => {
      if (
        indicator.nextElementSibling &&
        indicator.nextElementSibling.id === "item-drop-indicator"
      ) {
        indicator.remove();
      }
    });
  }, [childrens]);

  const { fontScale } = useContext(FontScaleContext);

  const clickRemove = () => {
    invoke<Column[]>("remove_column", { columnId: column.id })
      .then(setColumns)
      .catch(console.error);
  };

  return (
    <ColumnDiv $color={column.color}>
      <ColumnTitleDiv $color={column.color}>
        <ColumnTitleText $color={column.color} $fontScale={fontScale}>
          {column.title}
        </ColumnTitleText>
        <button onClick={() => clickRemove()}>
          <TrashIcon />
        </button>
      </ColumnTitleDiv>
      <ColumnItemsDiv
        onDrop={(e) => handleDragEnd(e as any, column)}
        onDragOver={(e) => handleDragOver(e as any)}
        onDragLeave={handleDragLeave}
      >
        {childrens.map((item) => {
          if ("Document" in item) {
            const documentItem = item as { Document: Doc };
            if (
              documentItem.Document.tags.some((tag) => tag.id === column.id)
            ) {
              return (
                <>
                  <ColumnDropIndicator
                    key={documentItem.Document.id}
                    beforeId={documentItem.Document.id}
                    column={column.id}
                  />
                  <DocumentSmallItem
                    key={documentItem.Document.id}
                    doc={documentItem.Document}
                    handleDragStart={handleDragStart}
                  />
                </>
              );
            }
          } else if ("Directory" in item) {
            const directoryItem = item as { Directory: Dir };
            if (
              directoryItem.Directory.tags.some((tag) => tag.id === column.id)
            ) {
              return (
                <>
                  <ColumnDropIndicator
                    key={directoryItem.Directory.id}
                    beforeId={directoryItem.Directory.id}
                    column={column.id}
                  />
                  <DirectorySmallItem
                    key={directoryItem.Directory.id}
                    dir={directoryItem.Directory}
                    handleDragStart={handleDragStart}
                  />
                </>
              );
            }
          }
        })}
        <ColumnDropIndicator beforeId={null} column={column.id} />
      </ColumnItemsDiv>
    </ColumnDiv>
  );
};

export default ColumnItem;
