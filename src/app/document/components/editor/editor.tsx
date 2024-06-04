import { EditorState } from "@codemirror/state";
import { useCallback, useContext } from "react";
import useCodeMirror from "@/hooks/useCodeMirror";
import { EditorWindowDiv } from "../../style";
import { ViewMode } from "@/type";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  initialDoc: string;
  mode: ViewMode;
  width: number;
  onChange: (doc: string) => void;
}

const Editor = (props: Props) => {
  const { onChange, initialDoc, mode, width } = props;

  const { fontScale } = useContext(FontScaleContext);

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

    return (
      <EditorWindowDiv
        ref={refContainer}
        $mode={mode}
        $width={width}
        $fontScale={fontScale}
      />
    );
  }
};

export default Editor;
