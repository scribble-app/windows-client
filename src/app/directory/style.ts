import styled from "styled-components";
import { TitleText } from "../styles/globalStyles";

export const DirectoryInfoDiv = styled.div`
  height: 120px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.gray100};
`;

export const DirectoryTitleText = styled(TitleText)`
  width: fit-content;
  transform: translate(32px, 100px);
  user-select: none;
`;

export const DirectoryTitleInput = styled.input`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  transform: translate(32px, 102px);
  background-color: transparent;
  border: none;
  width: fit-content;
  padding: 0px;

  &:focus {
    outline: none;
  }
`;
