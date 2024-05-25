import { ReactNode, useEffect, useRef, useState } from "react";
import { HintBlockDiv, HintText, HintWrapperDiv } from "./style";
import { HintArrowIcon } from "@/app/styles/icons";

interface Props {
  children: ReactNode;
  hint: string;
}

const HintWrapper = (props: Props) => {
  const { children, hint } = props;

  const hintContainerRef = useRef<HTMLDivElement>(null);
  const hintTextRef = useRef<HTMLDivElement>(null);
  const [hintIsActive, setHintIsActive] = useState(false);
  const [divPosition, setDivPosition] = useState(0);
  const [arrowPosition, setArrowPosition] = useState(0);

  useEffect(() => {
    if (hintIsActive && hintTextRef.current && hintContainerRef.current) {
      let btn = hintContainerRef.current;
      let el = hintTextRef.current;
      let newPadding = Math.min(
        btn.getBoundingClientRect().x - btn.clientWidth,
        window.innerWidth - el.clientWidth - 10,
      );

      setDivPosition(newPadding);
      setArrowPosition(btn.getBoundingClientRect().x - newPadding + 2);
    }
  }, [hintIsActive]);

  return (
    <HintWrapperDiv
      ref={hintContainerRef}
      onMouseOver={() => setHintIsActive(true)}
      onMouseLeave={() => setHintIsActive(false)}
    >
      {children}
      {hintIsActive && (
        <HintBlockDiv
          ref={hintTextRef}
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{ type: "spring", delay: 1, duration: 0.15 }}
          $divPosition={divPosition}
          $arrowPosition={arrowPosition}
        >
          <HintArrowIcon />
          <HintText dangerouslySetInnerHTML={{ __html: hint }} />
        </HintBlockDiv>
      )}
    </HintWrapperDiv>
  );
};

export default HintWrapper;
