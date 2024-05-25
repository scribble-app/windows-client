import { EditorState } from "@codemirror/state";
import { useCallback } from "react";
import useCodeMirror from "@/hooks/useCodeMirror";
import { EditorWindowDiv } from "../../style";
import { ViewMode } from "@/type";

interface Props {
  initialDoc: string;
  mode: ViewMode;
  width: number;
  onChange: (doc: string) => void;
}

const Editor = (props: Props) => {
  const { onChange, initialDoc, mode, width } = props;

  if (mode !== ViewMode.Preview) {
    const handleChange = useCallback(
      (state: EditorState) => onChange(state.doc.toString()),
      [onChange],
    );
    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
      initialDoc,
      onChange: handleChange,
    });

    editorView?.focus();

    return <EditorWindowDiv $mode={mode} $width={width} ref={refContainer} />;
  }
};

export default Editor;
