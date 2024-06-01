"use client";

import FontScaleContext from "@/contexts/fontScaleContext";
import { MainBlockDiv, TitleText } from "../styles/globalStyles";
import { useContext } from "react";

const Page = () => {
  const { fontScale, setFontScale } = useContext(FontScaleContext);

  return (
    <MainBlockDiv>
      <TitleText>Settings</TitleText>
      <input
        type="range"
        min="1"
        max="10"
        value={fontScale}
        onChange={(e) => setFontScale(parseInt(e.target.value))}
      />
    </MainBlockDiv>
  );
};

export default Page;
