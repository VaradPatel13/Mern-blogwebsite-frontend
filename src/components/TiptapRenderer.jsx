import React from 'react';


const renderMarks = (marks, text) => {
  if (!marks || marks.length === 0) return text;
  return marks.reduce((acc, mark) => {
    switch (mark.type) {
      case 'bold':
        return <strong key="bold">{acc}</strong>;
      case 'italic':
        return <em key="italic">{acc}</em>;
      case 'strike':
        return <s key="strike">{acc}</s>;
      case 'code':
        return <code key="code">{acc}</code>;
      case 'link':
        return <a key="link" href={mark.attrs?.href} target="_blank" rel="noopener noreferrer">{acc}</a>;
      case 'underline':
        return <u key="underline">{acc}</u>;
      default:
        return acc;
    }
  }, text);
};

const renderNode = (node, index, context) => {
  if (!node) return null;

  switch (node.type) {
    case 'doc':
      return <>{node.content?.map((child, i) => renderNode(child, i, context))}</>;

    case 'paragraph':
      return (
        <p key={index} className="mb-8 font-medium leading-loose text-[#1b1c1a]/90">
          {node.content?.map((child, i) => renderNode(child, i, context)) || <br />}
        </p>
      );

    case 'heading': {
      const level = node.attrs?.level || 1;
      const Tag = `h${level}`;
      const classes = {
        1: 'text-3xl lg:text-4xl font-bold mt-16 mb-6',
        2: 'text-2xl lg:text-3xl font-bold mt-12 mb-4 scroll-mt-24',
        3: 'text-xl lg:text-2xl font-semibold mt-10 mb-3 scroll-mt-24',
      };
      
      let id = undefined;
      if (level >= 2 && level <= 3) {
        id = `section-${context.hIndex++}`;
      }

      return (
        <Tag key={index} id={id} className={`font-newsreader text-[#00261b] tracking-tight ${classes[level] || classes[1]}`}>
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </Tag>
      );
    }

    case 'text':
      return <React.Fragment key={index}>{renderMarks(node.marks, node.text)}</React.Fragment>;

    case 'bulletList':
      return (
        <ul key={index} className="list-disc pl-6 mb-6 space-y-2 text-[#1b1c1a]/90">
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </ul>
      );

    case 'orderedList':
      return (
        <ol key={index} className="list-decimal pl-6 mb-6 space-y-2 text-[#1b1c1a]/90">
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </ol>
      );

    case 'listItem':
      return (
        <li key={index} className="leading-relaxed font-medium">
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </li>
      );

    case 'taskList':
      return (
        <ul key={index} className="mb-6 space-y-2">
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </ul>
      );

    case 'taskItem': {
      const checked = node.attrs?.checked || false;
      return (
        <li key={index} className="flex items-start gap-3 leading-relaxed">
          <input type="checkbox" checked={checked} readOnly className="mt-1.5 w-4 h-4 rounded border-2 border-[#37352f] accent-[#2383e2]" />
          <span className={checked ? 'line-through text-[#9b9b97]' : 'text-[#1b1c1a]/90'}>
            {node.content?.map((child, i) => renderNode(child, i, context))}
          </span>
        </li>
      );
    }

    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-[#37352f] bg-[#f1f0ed] rounded-r-md pl-6 pr-4 py-4 my-8 text-[#37352f] font-newsreader text-xl lg:text-2xl leading-snug">
          {node.content?.map((child, i) => renderNode(child, i, context))}
        </blockquote>
      );

    case 'codeBlock':
      return (
        <pre key={index} className="bg-[#1e1e1e] text-[#d4d4d4] rounded-lg p-6 my-6 overflow-x-auto text-sm leading-relaxed font-mono border border-[#2d2d2d]">
          <code>
            {node.content?.map((child, i) => renderNode(child, i, context))}
          </code>
        </pre>
      );

    case 'horizontalRule':
      return <hr key={index} className="border-none border-t border-[#e9e9e7] my-12" />;

    case 'image':
      return (
        <figure key={index} className="my-10">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ''}
            className="w-full rounded-2xl shadow-lg"
          />
          {node.attrs?.title && (
            <figcaption className="text-center text-sm text-[#414944] mt-3 font-medium">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      );

    case 'hardBreak':
      return <br key={index} />;

    default:
      // Fallback: render children if any
      if (node.content) {
        return <>{node.content.map((child, i) => renderNode(child, i, context))}</>;
      }
      return null;
  }
};

const TiptapRenderer = ({ content }) => {
  if (!content) return null;

  // Mutable context object to track heading indexes for Table of Contents
  const context = { hIndex: 0 };

  // If content is a string, it's legacy HTML
  if (typeof content === 'string') {
    // Try parsing as JSON first
    try {
      const parsed = JSON.parse(content);
      return <div className="tiptap-rendered">{renderNode(parsed, 0, context)}</div>;
    } catch {
      // It's HTML — render directly
      return <div className="tiptap-rendered" dangerouslySetInnerHTML={{ __html: content }} />;
    }
  }

  // It's already a JSON object
  return <div className="tiptap-rendered">{renderNode(content, 0, context)}</div>;
};

export default TiptapRenderer;
