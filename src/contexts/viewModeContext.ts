import { Dispatch, SetStateAction, createContext } from "react";
import { ViewMode } from "@/type";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: ViewMode.Preview,
  setViewMode: () => {},
});

export default ViewModeContext;
