import React from 'react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Strikethrough, Code, Link as LinkIcon } from 'lucide-react';

export const NotionBubbleMenu = ({ editor }) => {
  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes('link').href;
    const url = window.prompt('URL', prev);
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, animation: 'shift-away', zIndex: 9998 }}
      className="flex items-center gap-0.5 bg-[#2f3437] rounded-md px-1 py-1 shadow-xl"
    >
      {/* Heading shortcuts */}
      {[
        { label: 'H1', active: editor.isActive('heading', { level: 1 }), action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
        { label: 'H2', active: editor.isActive('heading', { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
      ].map(({ label, active, action }) => (
        <button
          key={label}
          onClick={action}
          className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
            active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}

      <div className="w-px h-4 bg-white/20 mx-1" />

      {/* Text formatting */}
      {[
        { icon: <Bold size={14} />, active: editor.isActive('bold'), action: () => editor.chain().focus().toggleBold().run(), title: 'Bold' },
        { icon: <Italic size={14} />, active: editor.isActive('italic'), action: () => editor.chain().focus().toggleItalic().run(), title: 'Italic' },
        { icon: <Strikethrough size={14} />, active: editor.isActive('strike'), action: () => editor.chain().focus().toggleStrike().run(), title: 'Strike' },
        { icon: <Code size={14} />, active: editor.isActive('code'), action: () => editor.chain().focus().toggleCode().run(), title: 'Inline Code' },
        { icon: <LinkIcon size={14} />, active: editor.isActive('link'), action: setLink, title: 'Link' },
      ].map(({ icon, active, action, title }) => (
        <button
          key={title}
          onClick={action}
          title={title}
          className={`p-1.5 rounded transition-colors ${
            active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          {icon}
        </button>
      ))}
    </BubbleMenu>
  );
};
