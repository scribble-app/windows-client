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

const Home = () => {
  const router = useRouter();

  return (
    <MainPageDiv>
      <MainInfoBlockDiv>
        <TitleText>How to start work</TitleText>
        <MainPageButtonsContainerDiv>
          <MainPageButton onClick={() => createDocument(router)}>
            Create file Ctrl+N
          </MainPageButton>
          <MainPageButton onClick={() => createDirectory(router)}>
            Create directory Ctrl+Shift+N
          </MainPageButton>
        </MainPageButtonsContainerDiv>
      </MainInfoBlockDiv>
    </MainPageDiv>
  );
};

export default Home;
