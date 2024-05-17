"use client";
// Components
import { Editor } from "@/components/Code";
import { debounce } from "@/utils/utils";
import { useState } from "react";
export default function Home() {
  const [text, setText] = useState<string>("");
  // handle shortcuts
  const updateText = debounce((newText: string) => setText(newText), 250);

  return (
    <main className="home code">
      <Editor updateText={updateText} />
    </main>
  )
}
