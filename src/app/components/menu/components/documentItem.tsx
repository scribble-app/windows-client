import { DragEvent } from "react";
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
import HintWrapper from "../../hintWrapper/hintWrapper";

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
            <DocumentTitleText>
              {doc.title === "" ? "unnamed" : doc.title}
            </DocumentTitleText>
          </DocumentLeftDiv>
          {doc.progress.maximum > 0 && (
            <ProgressBlockDiv>
              <ProgressLineDiv
                $width={(100 / doc.progress.maximum) * doc.progress.current}
              />
            </ProgressBlockDiv>
          )}
        </RowDiv>
        <RowDiv>
          <TimeBlockDiv>
            <ClockIcon />
            <DocumentTimeText>{getTime(doc.updated_at)}</DocumentTimeText>
          </TimeBlockDiv>
        </RowDiv>
        <div></div>
        <RowDiv>
          <DocumentDescriptionText>
            {doc.description === "" ? "undefined" : doc.description}
          </DocumentDescriptionText>
        </RowDiv>
      </DocumentButton>
    </>
  );
};

export default DocumentItem;
