import { FC, FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  handleMarkdownChange: (value: string) => void;
  markdown: string,
}

export const Editor: FC<Props> = ({ handleMarkdownChange, markdown }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"command" | "insert" | "visual" | "normal">("normal");
  const [command, setCommand] = useState<string>("");
  useEffect(() => {
    let mode: "command" | "insert" | "visual" | "normal" = "normal";
    function listenForKeydownShortcuts(event: KeyboardEvent) {
      // ignore tab switching
      const { keyCode }: { key: string, keyCode: number } = event;
      // Shift + :
      if (keyCode === 186 && mode === "normal") {
        // Reset command prompt
        setCommand("");
        setMode("command");
        mode = "command";
        return;
      }
      // Slash Command /, to search
      else if (keyCode === 191 && mode === "normal") {
        setCommand("");
        setMode("command");
        mode = "command";
        return;
      }
      // Esc
      else if (keyCode === 27) {
        setMode("normal");
        mode = "normal";
        editorRef.current?.focus();
        return;
      }
      // Enter 
      else if (keyCode === 13 && mode === "command") {
        // Check if command is a quit without saving command
        console.log("Enter is pressed");
      }
    }
    function listenForKeyupShortcuts(event: KeyboardEvent) {
      // ignore tab switching
      const { keyCode }: { key: string, keyCode: number } = event;
      // i for insert
      if (keyCode === 73 && mode === "normal") {
        // check if is in command mode;
        setMode("insert");
        mode = "insert";
        console.log("Mode switched to insert");
        editorRef.current?.focus();
        return;
      }
      // h j k l
      else if ((keyCode === 72 || keyCode === 74 || keyCode === 75 || keyCode === 76) && mode === "normal") {
        console.log("Trying to navigate ?");
        return;
      }
      console.log(event);
    }
    // Add event listeners
    window.addEventListener("keyup", listenForKeyupShortcuts);
    window.addEventListener("keydown", listenForKeydownShortcuts);
    return () => {
      // Remove event listeners
      window.removeEventListener("keyup", listenForKeyupShortcuts);
      window.removeEventListener("keydown", listenForKeydownShortcuts);
    }
  }, []);

  function handleCommandSubmit(event: FormEvent<HTMLInputElement>, command: string) {
    event.preventDefault();
    // Check if command is empty
    if (command === "") {
      setMode("normal");
      editorRef.current?.focus();
      return;
    }
    // Check if command is a search command
    else if (command[0] === "/") {
      // Search for the command
      const searchQuery = command.slice(1);
      const editorText = editorRef.current?.value;
      if (editorText) {
        const searchIndex = editorText.indexOf(searchQuery);
        console.log({ searchIndex });
        if (searchIndex !== -1) {
          editorRef.current?.focus();
          editorRef.current?.setSelectionRange(searchIndex, searchIndex + searchQuery.length);
        }
      }
      setMode("normal");
      editorRef.current?.focus();
      return;
    }
    // Check if command is a vim command
    else if (command[0] === ":") {
      // Check if command is a save command
      if (command === ":w") {
        // Save the file
        console.log("Saving the file");
        setMode("normal");
        editorRef.current?.focus();
        return;
      }
      // Check if command is a save and quit command
      else if (command === ":wq") {
        // Save the file
        console.log("Saving the file");
        // Quit the editor
        console.log("Quitting the editor");
        return;
      }
      // Check if command is a quit command
      else if (command === ":q") {
        // Quit the editor
        console.log("Quitting the editor");
        return;
      }
      // Check if command is a quit without saving command
      else if (command === ":q!") {
        // Quit the editor
        console.log("Quitting the editor");
        return;
      }
      // Check if command is a quit without saving command
      else if (command === ":wq!") {
        // Save the file
        console.log("Saving the file");
        // Quit the editor
        console.log("Quitting the editor");
        return;
      }
      // Check if command is a quit without saving command
      else if (command === ":w!") {
        // Save the file
        console.log("Saving the file");
        return;
      }
    }
  }

  return (
    <div className="editor">
      <textarea
        onChange={(event) => handleMarkdownChange(event.target.value)}
        value={markdown}
        /*readOnly={isCommandMode || mode !== "insert"}*/
        data-mode={mode}
        ref={editorRef}
        placeholder="Write markdown ..."
        className="editor-input" />
      {/* Command Input */}
      {
        mode === "command" ?
          <input value={command} onSubmit={(event: FormEvent<HTMLInputElement>) => {
            handleCommandSubmit(event, command);
          }} onChange={(event) => setCommand(event.target.value as string)} autoFocus className="command-input" type="text" autoComplete="false" autoCorrect="off" />
          : null
      }
    </div>
  )
}
