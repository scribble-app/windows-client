import { MainText } from "@/app/styles/globalStyles";
import { ReactNode, useState } from "react";
import { HintBlockDiv, HintWrapperDiv } from "./style";
import { HintArrowIcon } from "@/app/styles/icons";

interface Props {
  children: ReactNode;
  hint: string;
}

const HintWrapper = (props: Props) => {
  const { children, hint } = props;

  const [hintIsActive, setHintIsActive] = useState(false);

  return (
    <HintWrapperDiv
      onMouseOver={() => setHintIsActive(true)}
      onMouseLeave={() => setHintIsActive(false)}
    >
      {children}
      {hintIsActive && (
        <HintBlockDiv
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{ type: "spring", delay: 1, duration: 0.15 }}
        >
          <HintArrowIcon />
          <MainText>{hint}</MainText>
        </HintBlockDiv>
      )}
    </HintWrapperDiv>
  );
};

export default HintWrapper;
