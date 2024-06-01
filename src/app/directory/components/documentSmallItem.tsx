import { DocumentIcon } from "@/app/styles/icons";
import { SmallItemButton, SmallItemTitleText } from "../style";
import { useRouter } from "next/navigation";
import FontScaleContext from "@/contexts/fontScaleContext";
import { useContext } from "react";

interface Props {
  doc: Doc;
}

const DocumentSmallItem = (props: Props) => {
  const { doc } = props;

  const { fontScale } = useContext(FontScaleContext);

  const router = useRouter();

  return (
    <SmallItemButton
      draggable={true}
      onClick={() => router.push(`/document?id=${doc.id}`)}
    >
      <DocumentIcon />
      <SmallItemTitleText $fontScale={fontScale}>
        {doc.title === "" ? "unnamed" : doc.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DocumentSmallItem;
