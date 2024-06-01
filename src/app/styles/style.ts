"use client";

import styled from "styled-components";
import { MainBlockDiv } from "./globalStyles";

export const AppDiv = styled.main<{ $cursorStyle: string }>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: ${(props) => props.$cursorStyle};
`;

export const MainContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  overflow: hiden;
`;

export const MainPageDiv = styled(MainBlockDiv)`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MainInfoBlockDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  background-color: ${(props) => props.theme.colors.black80};
  border-radius: 10px;
  flex-shrink: 0;

  h1 {
    margin: 0px;
    user-select: none;
  }
`;

export const MainPageButtonsContainerDiv = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: start;

  &:after {
    content: "ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧";
    position: absolute;
    transform: translate(210%, -410%) rotate(20deg);
    color: ${(props) => props.theme.colors.white};
  }
`;

export const MainPageButton = styled.button<{ $fontScale: number }>`
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: ${(props) => 13 + props.$fontScale}px;
  font-weight: 400;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
  background-color: transparent;
  user-select: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.black60};
  }
`;
