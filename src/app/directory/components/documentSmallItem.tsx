import { DocumentIcon } from "@/app/styles/icons";
import { SmallItemButton, SmallItemTitleText } from "../style";
import { useRouter } from "next/navigation";

interface Props {
  doc: Doc;
}

const DocumentSmallItem = (props: Props) => {
  const { doc } = props;

  const router = useRouter();

  return (
    <SmallItemButton
      draggable={true}
      onClick={() => router.push(`/document?id=${doc.id}`)}
    >
      <DocumentIcon />
      <SmallItemTitleText>
        {doc.title === "" ? "unnamed" : doc.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DocumentSmallItem;
