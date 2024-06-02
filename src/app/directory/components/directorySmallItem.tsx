import { SmallItemButton, SmallItemTitleText } from "../style";
import { DirectoryIcon } from "@/app/styles/icons";
import FontScaleContext from "@/contexts/fontScaleContext";
import { useRouter } from "next/navigation";
import { DragEvent, useContext } from "react";

interface Props {
  dir: Dir;
  handleDragStart: (e: DragEvent<HTMLButtonElement>, item: Item) => void;
}

const DirectorySmallItem = (props: Props) => {
  const { dir, handleDragStart } = props;

  const { fontScale } = useContext(FontScaleContext);

  const router = useRouter();

  return (
    <SmallItemButton
      draggable={true}
      onClick={() => router.push(`/directory?id=${dir.id}`)}
      onDragStart={(e) => handleDragStart(e, dir)}
    >
      <DirectoryIcon />
      <SmallItemTitleText $fontScale={fontScale}>
        {dir.title === "" ? "unnamed" : dir.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DirectorySmallItem;
