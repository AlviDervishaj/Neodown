import { basicSetup } from "codemirror"
import { EditorView, keymap } from "@codemirror/view"
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"
import { useCallback, useEffect, useRef, useState } from "react";
import "./neo.css";

type Props = {
  updateText: (newText: string) => void
}

export function Editor({ updateText }: Props) {
  const [editor, setEditor] = useState<EditorView>(new EditorView());
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const editor: EditorView = new EditorView({
      extensions: [
        history(),
        basicSetup,
        javascript(),
        syntaxHighlighting(defaultHighlightStyle),
        keymap.of([...defaultKeymap, ...historyKeymap]),
      ],
      parent: editorRef.current ? editorRef.current : undefined,
      doc: "# Hello World !",
    });
    setEditor(editor);
    return () => {
      editor.destroy();
    }
  }, []);

  const checkForUpdate = useCallback(() => {
    const value: string = editor.state.doc.toString();
    console.log("hreeererree");
    updateText(value);
  }, [editor.state.doc, updateText])
  return (
    <div ref={editorRef}>
    </div>
  );


}
