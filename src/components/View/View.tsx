'use client';
import { FC, useState } from "react";

import { Preview } from '@/components/Preview';
import { Editor } from '@/components/Editor';
export const View: FC = () => {
  /** Test Sample String */
  const testSample: string = "# Neodown\n\n ## _The markdown editor you did not know you needed._\n\n- Type some Markdown on the left\n\n- See HTML in the right\n\n- ✨ Magic ✨\n\n## Features\n\n- Vim command support out of the box.\n\n- Rose Pine theme. (Honestly if you prefer light theme do not touch your keyboard ever again.)\n\n## Tech\n\nNeodown uses a number of open source projects to work properly:\n\n## Contribute\n\nYou can start contributing by cloning the [repo](https://github.com/AlviDervishaj/Neodown) from github\n\n## License\n\nMIT\n\n"
  const [markdown, setMarkdown] = useState<string>(testSample);

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
  }


  return (
    <section className="view-page">
      <Editor markdown={markdown} handleMarkdownChange={handleMarkdownChange} />
      <Preview markdown={markdown} />
    </section>
  )
}
