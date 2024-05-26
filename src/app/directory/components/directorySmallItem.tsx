import { SmallItemButton, SmallItemTitleText } from "../style";
import { DirectoryIcon } from "@/app/styles/icons";
import { useRouter } from "next/navigation";

interface Props {
  dir: Dir;
}

const DirectorySmallItem = (props: Props) => {
  const { dir } = props;

  const router = useRouter();

  return (
    <SmallItemButton onClick={() => router.push(`/directory?id=${dir.id}`)}>
      <DirectoryIcon />
      <SmallItemTitleText>
        {dir.title === "" ? "unnamed" : dir.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DirectorySmallItem;
