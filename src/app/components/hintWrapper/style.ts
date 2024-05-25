import styled from "styled-components";
import { motion } from "framer-motion";

export const HintWrapperDiv = styled.div``;

export const HintBlockDiv = styled(motion.div)`
  position: absolute;
  background-color: ${(props) => props.theme.colors.black100};
  border: 1px solid ${(props) => props.theme.colors.gray100};
  border-radius: 6px;
  padding: 4px 8px;
  transform: translateX(-40);
  z-index: 1;

  & > svg {
    position: absolute;
  }
`;
