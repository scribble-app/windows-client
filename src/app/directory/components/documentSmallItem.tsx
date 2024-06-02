import { DocumentIcon } from "@/app/styles/icons";
import { SmallItemButton, SmallItemTitleText } from "../style";
import { useRouter } from "next/navigation";
import FontScaleContext from "@/contexts/fontScaleContext";
import { DragEvent, useContext } from "react";

interface Props {
  doc: Doc;
  handleDragStart: (e: DragEvent<HTMLButtonElement>, item: Item) => void;
}

const DocumentSmallItem = (props: Props) => {
  const { doc, handleDragStart } = props;

  const { fontScale } = useContext(FontScaleContext);

  const router = useRouter();

  return (
    <SmallItemButton
      draggable={true}
      onClick={() => router.push(`/document?id=${doc.id}`)}
      onDragStart={(e) => handleDragStart(e, doc)}
    >
      <DocumentIcon />
      <SmallItemTitleText $fontScale={fontScale}>
        {doc.title === "" ? "unnamed" : doc.title}
      </SmallItemTitleText>
    </SmallItemButton>
  );
};

export default DocumentSmallItem;
