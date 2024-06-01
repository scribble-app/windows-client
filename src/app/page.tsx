"use client";

import createDocument from "@/functions/createDocument";
import { TitleText } from "./styles/globalStyles";
import {
  MainInfoBlockDiv,
  MainPageButton,
  MainPageButtonsContainerDiv,
  MainPageDiv,
} from "./styles/style";
import createDirectory from "@/functions/createDirectory";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import FontScaleContext from "@/contexts/fontScaleContext";

const Home = () => {
  const router = useRouter();

  const { fontScale } = useContext(FontScaleContext);

  return (
    <MainPageDiv>
      <MainInfoBlockDiv>
        <TitleText>How to start work</TitleText>
        <MainPageButtonsContainerDiv>
          <MainPageButton
            onClick={() => createDocument(router)}
            $fontScale={fontScale}
          >
            Create file Ctrl+N
          </MainPageButton>
          <MainPageButton
            onClick={() => createDirectory(router)}
            $fontScale={fontScale}
          >
            Create directory Ctrl+Shift+N
          </MainPageButton>
        </MainPageButtonsContainerDiv>
      </MainInfoBlockDiv>
    </MainPageDiv>
  );
};

export default Home;
