import { TrashIcon } from "@/app/styles/icons";
import { ColumnDiv, ColumnTitleDiv, ColumnTitleText } from "../style";
import { Dispatch, SetStateAction } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface Props {
  column: Column;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

const ColumnItem = (props: Props) => {
  const { column, setColumns } = props;

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
    </ColumnDiv>
  );
};

export default ColumnItem;
