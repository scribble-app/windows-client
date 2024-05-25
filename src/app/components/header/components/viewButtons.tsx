import { EyeIcon, PencilIcon } from "@/app/styles/icons";
import { HeaderViewButton } from "../style";
import { ViewMode } from "@/type";

interface Props {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewButtons = (props: Props) => {
  const { viewMode, setViewMode } = props;

  if (viewMode === ViewMode.Edit || viewMode === ViewMode.Middle) {
    return (
      <HeaderViewButton onClick={() => setViewMode(ViewMode.Preview)}>
        <EyeIcon />
      </HeaderViewButton>
    );
  } else if (viewMode === ViewMode.Preview) {
    return (
      <HeaderViewButton onClick={() => setViewMode(ViewMode.Edit)}>
        <PencilIcon />
      </HeaderViewButton>
    );
  }
};

export default ViewButtons;
