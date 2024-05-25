import { DropIndicatorDiv } from "../style";

interface Props {
  beforId: string;
}

const DropIndicator = (props: Props) => {
  const { beforId } = props;

  return (
    <DropIndicatorDiv
      id="file-drop-indicator"
      data-before={beforId}
      style={{ opacity: 0 }}
    />
  );
};

export default DropIndicator;
