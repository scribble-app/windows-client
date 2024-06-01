import { Dispatch, SetStateAction, useContext } from "react";
import { DropDownItemType } from "../type";
import { TitleDropDownItemButton, TitleDropDownMenuDiv } from "../style";
import { useRouter, useSearchParams } from "next/navigation";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  list: DropDownItemType[];
  isActive: boolean;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const DropDownMenu = ({ list, isActive, setActiveIndex }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fontScale } = useContext(FontScaleContext);

  if (isActive) {
    return (
      <TitleDropDownMenuDiv>
        {list.map((item: DropDownItemType, index: number) => (
          <TitleDropDownItemButton
            key={index}
            onClick={(event) => {
              item.function(router, searchParams);
              event.stopPropagation();
              setActiveIndex(-1);
            }}
            $fontScale={fontScale}
          >
            <span>{item.name}</span>
            {item.shortcut.text !== "" && <span>{item.shortcut.text}</span>}
          </TitleDropDownItemButton>
        ))}
      </TitleDropDownMenuDiv>
    );
  }
};

export default DropDownMenu;
