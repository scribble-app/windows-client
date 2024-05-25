"use client";

import { MouseEvent, useState } from "react";
import Menu from "./components/menu/menu";
import { ResizerDiv } from "./styles/globalStyles";
import { AppDiv, MainContainerDiv } from "./styles/style";
import Header from "./components/header/header";
import ViewModeContext from "@/contexts/viewModeContext";
import { ViewMode } from "@/type";

const AppWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cursorStyle, setCursorStyle] = useState("auto");
  const [mouseDown, setMouseDown] = useState(false);
  const [width, setWidth] = useState(200);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Preview);

  const menuSizeLimit = {
    min: 150,
    max: 400,
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(true);
    setCursorStyle("ew-resize");
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (mouseDown) {
      const newWidth = Math.min(event.pageX, menuSizeLimit.max);
      if (newWidth > menuSizeLimit.min) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setCursorStyle("auto");
  };

  return (
    <AppDiv
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      $cursorStyle={cursorStyle}
    >
      <Menu width={width} />
      <ResizerDiv onMouseDown={handleMouseDown} />
      <MainContainerDiv>
        <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
          <Header />
          {children}
        </ViewModeContext.Provider>
      </MainContainerDiv>
    </AppDiv>
  );
};

export default AppWrapper;
