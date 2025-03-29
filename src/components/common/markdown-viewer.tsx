import remarkGfm from "remark-gfm";

import Markdown from "react-markdown";

export const MarkdownViewer = ({
  markdown,
  littlePreview = true,
}: {
  markdown: string;
  littlePreview?: boolean;
}) => {
  if (littlePreview) {
    return <Markdown remarkPlugins={[remarkGfm]}>{`${markdown}`}</Markdown>;
  }

  return (
    <Markdown
      components={{
        p: ({ children, ...props }) => (
          <p
            className="text-gray-700 leading-relaxed py-3 text-base"
            {...props}
          >
            {children}
          </p>
        ),
        // Unordered lists
        ul: ({ children, ...props }) => (
          <ul className="list-disc pl-6 py-2  text-gray-700" {...props}>
            {children}
          </ul>
        ),
        // Ordered lists
        ol: ({ children, ...props }) => (
          <ol className="list-decimal pl-6 py-2  text-gray-700" {...props}>
            {children}
          </ol>
        ),
        // List items
        li: ({ children, ...props }) => (
          <li className="mb-1" {...props}>
            {children}
          </li>
        ),
        // Headings
        h1: ({ children, ...props }) => (
          <h1 className="text-2xl font-bold text-gray-900 my-4" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="text-xl font-bold text-gray-900 my-3" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="text-lg font-semibold text-gray-900 my-2" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4 className="text-lg font-semibold text-gray-900 my-2" {...props}>
            {children}
          </h4>
        ),
        // Blockquotes
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="pl-4 border-l-4 border-gray-300 italic my-2 text-gray-600"
            {...props}
          >
            {children}
          </blockquote>
        ),
        // Links
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        ),
        // Images
        img: ({ alt, src, ...props }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            className="max-w-full h-auto rounded-md my-4"
            {...props}
          />
        ),
        // Horizontal rule
        hr: ({ ...props }) => (
          <hr className="my-8 border-t border-gray-300" {...props} />
        ),
        // Tables
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-gray-100" {...props}>
            {children}
          </thead>
        ),
        tbody: ({ children, ...props }) => (
          <tbody className="divide-y divide-gray-200" {...props}>
            {children}
          </tbody>
        ),
        tr: ({ children, ...props }) => (
          <tr className="hover:bg-gray-50" {...props}>
            {children}
          </tr>
        ),
        th: ({ children, ...props }) => (
          <th
            className="px-4 py-3 text-left text-sm font-medium text-gray-700"
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="px-4 py-3 text-sm text-gray-700" {...props}>
            {children}
          </td>
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {markdown}
    </Markdown>
  );
};
