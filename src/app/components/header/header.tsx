import {
  HeaderButtonsDiv,
  HeaderSectionDiv,
  HeaderTitleText,
  HeaderContainerDiv,
  HeaderViewMiddleButton,
  HeaderArrowButton,
} from "./style";
import ViewButtons from "./components/viewButtons";
import { SplitIcon } from "@/app/styles/icons";
import { useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ViewModeContext from "@/contexts/viewModeContext";
import { ViewMode } from "@/type";
import HintWrapper from "../hintWrapper/hintWrapper";
import { listen } from "@tauri-apps/api/event";
import { ArrowIconForwardBack } from "@/app/styles/icons";
import FontScaleContext from "@/contexts/fontScaleContext";

interface ItemEvent {
  status: string;
}

const Header = () => {
  const { viewMode, setViewMode } = useContext(ViewModeContext);
  const { fontScale } = useContext(FontScaleContext);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");

  const viewModeTitles = ["preview", "edit", "split"];

  useEffect(() => {
    const unlisten = listen<ItemEvent>("item", (event) => {
      if (event.payload.status === "updated") {
        invoke<string>("get_title", { id: "" })
          .then((result) => setTitle(result))
          .catch((error) => console.error(error));
      }
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      invoke<string>("get_title", { id: searchParams.get("id") })
        .then((result) => setTitle(result))
        .catch((error) => console.error(error));
    } else {
      setTitle(pathname.charAt(1).toUpperCase() + pathname.slice(2));
    }
  }, [searchParams]);

  const click = () => {
    setViewMode(ViewMode.Middle);
  };

  return (
    <HeaderSectionDiv>
      <HeaderContainerDiv>
        <HeaderButtonsDiv>
          <HintWrapper hint="Go back">
            <HeaderArrowButton onClick={() => router.back()}>
              <ArrowIconForwardBack />
            </HeaderArrowButton>
          </HintWrapper>
          <HintWrapper hint="Go forward">
            <HeaderArrowButton onClick={() => router.forward()}>
              <ArrowIconForwardBack />
            </HeaderArrowButton>
          </HintWrapper>
        </HeaderButtonsDiv>
        <HeaderTitleText $fontScale={fontScale}>
          {title && title}
        </HeaderTitleText>
        {pathname === "/document" && (
          <HeaderButtonsDiv>
            <HintWrapper
              hint={`Current view: <b>${viewModeTitles[viewMode]}</b><br />${viewMode !== ViewMode.Middle ? "Click to split screen" : ""}`}
            >
              <HeaderViewMiddleButton
                {...(viewMode === ViewMode.Middle && { $active: true })}
                onClick={() => click()}
              >
                <SplitIcon />
              </HeaderViewMiddleButton>
            </HintWrapper>
            <HintWrapper
              hint={`Current view: <b>${viewModeTitles[viewMode]}</b><br />${viewMode === ViewMode.Preview ? "Click to edit" : "Click to preview"}`}
            >
              <ViewButtons viewMode={viewMode} setViewMode={setViewMode} />
            </HintWrapper>
          </HeaderButtonsDiv>
        )}
      </HeaderContainerDiv>
    </HeaderSectionDiv>
  );
};

export default Header;
