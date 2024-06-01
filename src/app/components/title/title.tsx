"use client";

import { WebviewWindow } from "@tauri-apps/api/window";
import { useContext, useEffect, useRef, useState } from "react";
import {
  EventButtonsDiv,
  LeftSideDiv,
  TitleBarHeader,
  TitleBarText,
  TitleEventButtonDiv,
  TitleEventButtonCloseDiv,
} from "./style";
import { Close, Maximize, Minimize } from "@/app/styles/icons";
import { navigation } from "./navigation";
import { MenuItemType } from "./type";
import MenuItem from "./components/menuItem";
import { useRouter, useSearchParams } from "next/navigation";
import shortcuts from "./shortcuts";
import FontScaleContext from "@/contexts/fontScaleContext";

const Title = () => {
  const { fontScale } = useContext(FontScaleContext);
  const [appWindow, setAppWindow] = useState<WebviewWindow>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleMenuClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async function () {
      setAppWindow((await import("@tauri-apps/api/window")).appWindow);
      shortcuts(navigation, router, searchParams);
    })();
  }, []);

  return (
    <TitleBarHeader data-tauri-drag-region>
      <LeftSideDiv>
        <TitleBarText data-tauri-drag-region $fontScale={fontScale}>
          Scribble
        </TitleBarText>
        <div ref={menuRef}>
          {navigation.map((item: MenuItemType, index: number) => (
            <MenuItem
              key={index}
              item={item}
              index={index}
              isActive={index === activeIndex}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              onMenuClick={handleMenuClick}
            />
          ))}
        </div>
      </LeftSideDiv>
      <EventButtonsDiv>
        <TitleEventButtonDiv onClick={() => appWindow?.minimize()}>
          <Minimize />
        </TitleEventButtonDiv>
        <TitleEventButtonDiv onClick={() => appWindow?.toggleMaximize()}>
          <Maximize />
        </TitleEventButtonDiv>
        <TitleEventButtonCloseDiv onClick={() => appWindow?.close()}>
          <Close />
        </TitleEventButtonCloseDiv>
      </EventButtonsDiv>
    </TitleBarHeader>
  );
};

export default Title;
