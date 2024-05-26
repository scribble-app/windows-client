import styled from "styled-components";
import { MainText, TitleText } from "../styles/globalStyles";

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
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.gray100};
  background: ${(props) => props.theme.colors.black50};
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
  width: 120px;
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
