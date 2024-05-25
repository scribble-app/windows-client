import styled from "styled-components";
import { motion } from "framer-motion";
import { MainText } from "@/app/styles/globalStyles";

export const HintWrapperDiv = styled.div``;

export const HintBlockDiv = styled(motion.div) <{
  $divPosition: number;
  $arrowPosition: number;
}>`
  display: flex;
  position: absolute;
  background-color: ${(props) => props.theme.colors.black100};
  border: 1px solid ${(props) => props.theme.colors.gray100};
  border-radius: 6px;
  padding: 4px 8px;
  transform: translateX(-40);
  z-index: 1;
  box-sizing: border-box;
  left: ${(props) => props.$divPosition}px;
  & > svg {
    position: absolute;
    top: 0px;
    left: ${(props) => props.$arrowPosition}px;
  }
`;

export const HintText = styled(MainText)`
  flex-shrink: 0;
`;
