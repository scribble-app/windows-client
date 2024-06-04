import { EditorState } from "@codemirror/state";
import {
  Decoration,
  EditorView,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { invoke } from "@tauri-apps/api/tauri";

const spellCheckPlugin = ViewPlugin.fromClass(
  class {
    constructor(view: EditorView) {
      this.checkSpelling(view.state);
    }

    decorations = Decoration.none;

    update(update: ViewUpdate) {
      if (update.docChanged) {
        this.checkSpelling(update.state);
      }
    }

    checkSpelling(state: EditorState) {
      const text = state.doc.toString();
      let badSpellingPromises: any[] = [];

      const words = text
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 0 && /^[a-zA-Z]+$/i.test(word));

      console.log(words);

      words.forEach((word) => {
        const matchIndex = text.lastIndexOf(word);
        if (matchIndex !== -1) {
          const from = matchIndex;
          const to = from + word.length;

          badSpellingPromises.push(
            invoke("check_word", { word }).then((res) => {
              if (res) {
                return { from, to };
              } else {
                return {
                  from,
                  to,
                  decoration: Decoration.mark({ class: "misspelled" }),
                };
              }
            })
          );
        }
      });

      Promise.all(badSpellingPromises).then((resolvedValues) => {
        const badSpelling = resolvedValues.filter((item) => item.decoration);

        badSpelling.sort((a, b) => a.from - b.from);

        this.decorations = Decoration.set(
          badSpelling.map(({ from, to, decoration }) =>
            decoration.range(from, to)
          )
        );
      });
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

export default spellCheckPlugin;
