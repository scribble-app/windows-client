"use client";

import styled, { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    black100: "#0A0A0A",
    black90: "#0D0D0D",
    black80: "#0F0F0F",
    black70: "#121212",
    black60: "#141414",
    black50: "#161616",
    black40: "#1A1A1A",
    gray100: "#222222",
    gray50: "#676767",
    white: "#FFFFFF",
    red: "#FF5E5E",
  },
};

export default createGlobalStyle`
  body {
    margin: 0px 100px 0px 0px;
    background-color: ${theme.colors.black60};
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .dragged {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: fit-content;
    background-color: ${theme.colors.black50};
    padding: 4px 8px;
    border: 1px solid ${theme.colors.gray50};
    border-radius: 4px;

    .title {
      display: flex;
      gap: 4px;

      p {
        color: ${theme.colors.white};
        font-size: 13px;
        font-weight: 400;
        margin: 0px;
      }
    }


  }

  .dragged-in-folder {

  }
`;

export const ResizerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: -6px;
  width: 6px;
  height: 100%;
  cursor: ew-resize;
  flex-shrink: 0;
  transform: translateX(-50%);
`;

export const MainBlockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export const TitleText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0px;
  color: ${theme.colors.white};
`;

export const SubtitleText = styled.h2`
  font-size: 13px;
  font-weight: 700;
  margin: 0px;
  color: ${theme.colors.white};
`;

export const MainText = styled.p`
  font-size: 13px;
  font-weight: 400;
  margin: 0px;
  color: ${theme.colors.white};
`;
