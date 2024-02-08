import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  markdown: string,
}

export const Preview: FC<Props> = ({ markdown }) => {
  return (
    <section className="preview">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={tomorrow}
                language={match[1]}
                PreTag="div"
              >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }} remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </section>
  )
}
