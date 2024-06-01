import { DragEvent, useContext } from "react";
import {
  DocumentButton,
  DocumentDescriptionText,
  DocumentLeftDiv,
  DocumentTimeText,
  DocumentTitleText,
  ProgressBlockDiv,
  ProgressLineDiv,
  RowDiv,
  TimeBlockDiv,
} from "../style";
import { ClockIcon, DocumentIcon } from "@/app/styles/icons";
import getTime from "@/utils/getTime";
import DropIndicator from "./dropIndicator";
import { useRouter } from "next/navigation";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  doc: Doc;
  currentId: string | null;
  handleDragStart: (
    e: DragEvent<HTMLButtonElement | HTMLDivElement>,
    item: Dir | Doc,
  ) => void;
}

const DocumentItem = (props: Props) => {
  const { doc, currentId, handleDragStart } = props;
  const { fontScale } = useContext(FontScaleContext);
  const router = useRouter();

  return (
    <>
      <DropIndicator beforId={doc.id} />
      <DocumentButton
        onClick={() => router.push(`/document?id=${doc.id}`)}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, doc)}
        $isActive={currentId === doc.id}
      >
        <RowDiv>
          <DocumentLeftDiv>
            <DocumentIcon />
            <DocumentTitleText $fontScale={fontScale}>
              {doc.title === "" ? "unnamed" : doc.title}
            </DocumentTitleText>
          </DocumentLeftDiv>
          {doc.progress.maximum > 0 && (
            <ProgressBlockDiv $fontScale={fontScale}>
              <ProgressLineDiv
                $width={(100 / doc.progress.maximum) * doc.progress.current}
                $fontScale={fontScale}
              />
            </ProgressBlockDiv>
          )}
        </RowDiv>
        <RowDiv>
          <TimeBlockDiv>
            <ClockIcon />
            <DocumentTimeText $fontScale={fontScale}>
              {getTime(doc.updated_at)}
            </DocumentTimeText>
          </TimeBlockDiv>
        </RowDiv>
        <div></div>
        <RowDiv>
          <DocumentDescriptionText $fontScale={fontScale}>
            {doc.description === "" ? "undefined" : doc.description}
          </DocumentDescriptionText>
        </RowDiv>
      </DocumentButton>
    </>
  );
};

export default DocumentItem;
