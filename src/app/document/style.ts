import { ViewMode } from "@/type";
import styled from "styled-components";

export const ContainerDiv = styled.div<{ $cursorStyle: string }>`
  display: flex;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  cursor: ${(props) => props.$cursorStyle};
`;

export const NoteResizerConteinerDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0px;
  justify-content: center;
  width: 7px;
  cursor: col-resize;
  flex-shrink: 0;
`;

export const ResizerColumnDiv = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

export const EditorWindowDiv = styled.div.attrs<{
  $mode: ViewMode;
  $width: number;
}>((props) => ({
  style: {
    width: `${props.$mode == ViewMode.Edit ? "100" : props.$width}%`,
  },
}))`
  height: 100%;

  .cm-editor {
    outline: none;

    .cm-gutters {
      background-color: transparent;
      border-right: 1px solid ${(props) => props.theme.colors.black70};
      user-select: none;
    }

    .cm-activeLineGutter {
      background-color: ${(props) => props.theme.colors.black70};
    }

    .cm-scroller {
      scrollbar-color: ${(props) => props.theme.colors.black80} transparent;
    }
  }
`;

export const PreviewWindow = styled.div`
  color: ${(props) => props.theme.colors.white};
  padding: 12px;
  background-color: transparent;
  flex-grow: 1;
  inline-size: min-content;
  line-break: anywhere;
  word-wrap: break-word;
  word-break: normal;
  overflow-y: auto;
  scrollbar-color: ${(props) => props.theme.colors.black80} transparent;

  :first-child {
    margin-top: 0px;
  }

  h1,
  h2 {
    border-color: ${(props) => props.theme.colors.white};
  }

  pre {
    background-color: ${(props) => props.theme.colors.black70};
  }
`;
