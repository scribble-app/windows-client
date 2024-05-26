import styled from "styled-components";
import { MainText, TitleText } from "../styles/globalStyles";
import { color } from "framer-motion";

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

export const ColumnsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ColumnSubmitButton = styled.button`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.black90};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.black70};
  }
`;

export const ColumnInuput = styled.input`
  display: flex;
  width: 120px;
  padding: 4px 6px;
  align-items: center;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.black70};
  color: ${(props) => props.theme.colors.white};

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
    user-select: none;
  }

  &:focus {
    outline: none;
  }
`;

export const ColorPickerInput = styled.input`
  padding: 0px;
  border: none;
  background: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 8px;
  }
`;

export const ColumnSubmitForm = styled.form`
  width: fit-content;
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray100};
  background: ${(props) => props.theme.colors.black50};
`;

export const ColumnsContainerDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export const ColumnDiv = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 10px;
  height: fit-content;
  border-radius: 8px;
  background-color: ${(props) => props.$color}33;
`;

export const ColumnTitleDiv = styled.div<{ $color: string }>`
  display: flex;
  width: 160px;
  justify-content: space-between;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    border: none;
    cursor: pointer;
    background-color: transparent;

    path {
      fill: ${(props) => props.$color};
    }
  }
`;

export const ColumnTitleText = styled(MainText)<{ $color: string }>`
  font-size: 16px;
  color: ${(props) => props.$color};
`;

export const ColumnItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UntaggedItemsDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SmallItemButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 160px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.black90};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.black70};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const SmallItemTitleText = styled(MainText)`
  font-size: 16px;
`;

export const ColumnDropIndicatorDiv = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
  height: 3px;
  margin: 4px 8px;
`;
