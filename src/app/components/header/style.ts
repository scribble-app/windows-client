import styled from "styled-components";

export const HeaderSectionDiv = styled.div`
  background-color: ${(props) => props.theme.colors.black70};
  border-bottom: 1px solid ${(props) => props.theme.colors.black90};
`;

export const HeaderContainerDiv = styled.div`
  padding: 0px 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  height: 25px;
  text-align: center;
`;

export const HeaderTitleText = styled.h2`
  margin: 0;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.white};
`;

export const HeaderButtonsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.white};

  &:first-child {
    justify-self: flex-start;
  }

  &:last-child {
    justify-self: flex-end;
  }

  & > :first-child .arrow {
    transform: rotate(180deg);
  }
`;

export const HeaderArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0px;
  background-color: transparent;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

export const HeaderViewButton = styled.button`
  padding: 4px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray100};
  }
`;

export const HeaderViewMiddleButton = styled(HeaderViewButton) <{
  $active?: boolean;
}>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  path {
    fill: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.gray50};
  }
`;
