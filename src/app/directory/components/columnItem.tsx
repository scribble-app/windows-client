import { TrashIcon } from "@/app/styles/icons";
import {
  ColumnDiv,
  ColumnItemsDiv,
  ColumnTitleDiv,
  ColumnTitleText,
} from "../style";
import { Dispatch, SetStateAction } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import ColumnDropIndicator from "./columnDropIndicator";
import DocumentSmallItem from "./documentSmallItem";
import DirectorySmallItem from "./directorySmallItem";

interface Props {
  column: Column;
  childrens: Item[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

const ColumnItem = (props: Props) => {
  const { column, childrens, setColumns } = props;

  const clikcRemove = () => {
    invoke<Column[]>("remove_column", { columnId: column.id })
      .then(setColumns)
      .catch(console.error);
  };

  return (
    <ColumnDiv $color={column.color}>
      <ColumnTitleDiv $color={column.color}>
        <ColumnTitleText $color={column.color}>{column.title}</ColumnTitleText>
        <button onClick={() => clikcRemove()}>
          <TrashIcon />
        </button>
      </ColumnTitleDiv>
      <ColumnItemsDiv>
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
