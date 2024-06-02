import { ColumnDropIndicatorDiv } from "../style";

interface Props {
  beforeId: string | null;
  column: string;
}

const ColumnDropIndicator = (props: Props) => {
  const { beforeId, column } = props;

  return (
    <ColumnDropIndicatorDiv
      id="item-drop-indicator"
      data-before={beforeId || "-1"}
      data-column={column}
      style={{ opacity: 0 }}
    />
  );
};

export default ColumnDropIndicator;
