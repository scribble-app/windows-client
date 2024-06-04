import { createElement, useContext } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkReact from "remark-react/lib";
import { PreviewWindow } from "../../style";
import RemarkCode from "./remarkCode";
import { defaultSchema } from "hast-util-sanitize";
import "github-markdown-css/github-markdown.css";
import { ViewMode } from "@/type";
import FontScaleContext from "@/contexts/fontScaleContext";

interface Props {
  doc: string;
  mode: ViewMode;
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
  },
};

const Preview = (props: Props) => {
  const { doc, mode } = props;

  const { fontScale } = useContext(FontScaleContext);

  if (mode !== ViewMode.Edit) {
    const md = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkReact, {
        createElement: createElement,
        sanitize: schema,
        remarkReactComponents: {
          code: RemarkCode,
        },
      } as any)
      .processSync(doc).result;

    return (
      <PreviewWindow className="markdown-body editor" $fontScale={fontScale}>
        {" "}
        {md as string}
      </PreviewWindow>
    );
  }
};

export default Preview;
