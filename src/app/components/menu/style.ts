import { MainText } from "@/app/styles/globalStyles";
import styled from "styled-components";

export const MenuSectionDiv = styled.div.attrs<{ $width: number }>((props) => ({
  style: {
    width: `${props.$width}px`,
  },
}))`
  height: 100%;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.black80};
`;

export const MenuContainerDiv = styled.div`
  padding: 10px;
`;

export const SearchBoxDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.black100};

  svg {
    flex-shrink: 0;
  }
`;

export const SearchInput = styled.input`
  background-color: transparent;
  font-size: 13px;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  border: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
    user-select: none;
  }

  &:focus {
    outline: none;
  }
`;

export const ListContainerDiv = styled.div`
  padding: 10px 0px;
`;

export const DocumentButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  padding: 4px 8px;
  border: 2px solid transparent;
  border-radius: 4px;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isActive ? props.theme.colors.black40 : "transparent"};

  &:hover {
    background-color: ${(props) =>
      !props.$isActive && props.theme.colors.black60};
  }
`;

export const RowDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DocumentLeftDiv = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  svg {
    flex-shrink: 0;
  }
`;

export const DocumentTitleText = styled(MainText)`
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const DocumentTimeText = styled(MainText)`
  font-size: 12px;
  margin: 0px;
`;

export const DocumentDescriptionText = styled(MainText)`
  font-size: 12px;
  margin: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${(props) => props.theme.colors.gray50};
`;

export const ProgressBlockDiv = styled.div`
  display: flex;
  width: 50px;
  height: 4px;
  padding: 0px 1px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2px;
  background-color: ${(props) => props.theme.colors.black50};
`;

export const ProgressLineDiv = styled.div.attrs<{ $width: number }>(
  (props) => ({
    style: {
      width: `${props.$width}%`,
    },
  }),
)`
  height: 2px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.white};
`;

export const TimeBlockDiv = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
  }

  & > p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const DirectoryContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DirectoryButton = styled.div<{
  $isClosed: boolean;
  $isActive: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background-color: ${(props) =>
    props.$isActive ? props.theme.colors.black40 : "transparent"};
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  padding: 4px 8px;

  &:hover {
    background-color: ${(props) =>
      !props.$isActive && props.theme.colors.black60};
  }

  svg {
    flex-shrink: 0;
  }

  & > button {
    & > svg {
      flex-shrink: 0;
      transform: ${(props) => props.$isClosed && "rotate(180deg)"};
    }
  }
`;

export const DirectoryLeftDiv = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const DirectoryTitleText = styled(MainText)`
  font-size: 16px;
  margin: 0px;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const DirectoryArrowButton = styled.button`
  display: flex;
  padding: 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const DirectoryListDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 15px;
  padding-left: 5px;

  border-left: 1px solid ${(props) => props.theme.colors.white};
`;

export const DropIndicatorDiv = styled.div`
  height: 3px;
  border-radius: 3px;
  margin: 2px 10px;
  background-color: ${(props) => props.theme.colors.white};
`;
