import FontScaleContext from "@/contexts/fontScaleContext";
import { TitleButtonDiv } from "../style";
import { MenuItemType } from "../type";
import DropDownMenu from "./dropDownMenu";
import { Dispatch, SetStateAction, useContext } from "react";

interface Props {
  item: MenuItemType;
  index: number;
  isActive: boolean;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onMenuClick: (index: number) => void;
}

const MenuItem = ({
  item,
  index,
  isActive,
  activeIndex,
  setActiveIndex,
  onMenuClick,
}: Props) => {
  const { fontScale } = useContext(FontScaleContext);

  return (
    <TitleButtonDiv
      key={index}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onMenuClick(index);
          event.stopPropagation();
        }
      }}
      onClick={(event) => {
        onMenuClick(index);
        event.stopPropagation();
      }}
      onMouseEnter={() => activeIndex !== -1 && onMenuClick(index)}
      {...(isActive && { $active: true })}
      $fontScale={fontScale}
    >
      {item.name}
      <DropDownMenu
        list={item.list}
        isActive={isActive}
        setActiveIndex={setActiveIndex}
      />
    </TitleButtonDiv>
  );
};

export default MenuItem;
