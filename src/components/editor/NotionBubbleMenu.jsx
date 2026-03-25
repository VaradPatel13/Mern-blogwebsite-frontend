import React from 'react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  Bold, Italic, Underline, Strikethrough, Code,
  Link as LinkIcon, Highlighter,
} from 'lucide-react';

const BtnSep = () => <div className="w-px h-4 bg-white/20 mx-0.5 shrink-0" />;

const ToolBtn = ({ active, onClick, title, children }) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={`p-1.5 rounded transition-colors text-xs leading-none ${
      active
        ? 'bg-white/20 text-white'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`}
  >
    {children}
  </button>
);

export const NotionBubbleMenu = ({ editor }) => {
  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('URL', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: [150, 75],
        animation: 'shift-away',
        zIndex: 9998,
        moveTransition: 'transform 0.15s ease-out',
      }}
      className="flex items-center bg-[#2f3437] rounded-md px-1 py-0.5 shadow-xl gap-0"
    >
      {/* Block type shortcuts */}
      {[
        {
          label: 'Text',
          active: editor.isActive('paragraph'),
          action: () => editor.chain().focus().setParagraph().run(),
        },
        {
          label: 'H1',
          active: editor.isActive('heading', { level: 1 }),
          action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          label: 'H2',
          active: editor.isActive('heading', { level: 2 }),
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          label: 'H3',
          active: editor.isActive('heading', { level: 3 }),
          action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        },
      ].map(({ label, active, action }) => (
        <ToolBtn key={label} active={active} onClick={action} title={label}>
          <span className="font-semibold">{label}</span>
        </ToolBtn>
      ))}

      <BtnSep />

      {/* Inline marks */}
      <ToolBtn
        active={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Bold (Ctrl+B)"
      >
        <Bold size={14} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Italic (Ctrl+I)"
      >
        <Italic size={14} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        title="Strikethrough"
      >
        <Strikethrough size={14} />
      </ToolBtn>
      <ToolBtn
        active={editor.isActive('code')}
        onClick={() => editor.chain().focus().toggleCode().run()}
        title="Inline code"
      >
        <Code size={14} />
      </ToolBtn>

      <BtnSep />

      {/* Link */}
      <ToolBtn
        active={editor.isActive('link')}
        onClick={setLink}
        title="Add link"
      >
        <LinkIcon size={14} />
      </ToolBtn>
    </BubbleMenu>
  );
};
