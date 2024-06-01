import { SmallItemButton, SmallItemTitleText } from "../style";
import { DirectoryIcon } from "@/app/styles/icons";
import FontScaleContext from "@/contexts/fontScaleContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface Props {
  dir: Dir;
}

const DirectorySmallItem = (props: Props) => {
  const { dir } = props;

  const { fontScale } = useContext(FontScaleContext);

  const router = useRouter();

  return (
    <SmallItemButton
      draggable={true}
      onClick={() => router.push(`/directory?id=${dir.id}`)}
    >
      <DirectoryIcon />
      <SmallItemTitleText $fontScale={fontScale}>
        {dir.title === "" ? "unnamed" : dir.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DirectorySmallItem;
