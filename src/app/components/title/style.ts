import styled from "styled-components";

export const TitleBarHeader = styled.header`
  height: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.black90};
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.black100};
  align-items: center;
  z-index: 1;
`;

export const LeftSideDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const TitleBarText = styled.h1<{ $fontScale: number }>`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => 13 + props.$fontScale}px;
  font-weight: 400;
  margin: 0px;
  padding-left: 10px;
  user-select: none;
`;

export const TitleButtonDiv = styled.div<{
  $active?: boolean;
  $fontScale: number;
}>`
  position: relative;
  display: inline-block;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => 13 + props.$fontScale}px;
  font-weight: 400;
  padding: 3px 6px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  background-color: ${(props) =>
    props.$active ? props.theme.colors.black70 : "transparent"};

  &:hover {
    background-color: ${(props) => props.theme.colors.black70};
  }
`;

export const TitleDropDownMenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px -6px;
  position: absolute;
  background-color: ${(props) => props.theme.colors.black70};
  border: 1px solid ${(props) => props.theme.colors.gray100};
  border-radius: 6px;
  padding: 8px 12px;
  z-index: 1;
`;

export const TitleDropDownItemButton = styled.button<{ $fontScale: number }>`
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 4px 8px;
  font-size: ${(props) => 13 + props.$fontScale}px;
  font-weight: 400;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  gap: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.black90};
  }
`;

export const EventButtonsDiv = styled.div`
  display: flex;
`;

export const TitleEventButtonDiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  path {
    fill: ${(props) => props.theme.colors.gray50};
  }

  &:hover {
    path {
      fill: ${(props) => props.theme.colors.white};
    }

    background-color: ${(props) => props.theme.colors.black70};
  }
`;

export const TitleEventButtonCloseDiv = styled(TitleEventButtonDiv)`
  &:hover {
    background-color: ${(props) => props.theme.colors.red};
  }
`;
