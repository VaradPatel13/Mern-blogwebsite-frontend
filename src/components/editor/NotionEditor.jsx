import React, { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import 'highlight.js/styles/github.css';

// Extensions
import { StarterKit } from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { Typography } from '@tiptap/extension-typography';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

import { SlashCommand, getSuggestionItems, renderItems } from './SlashCommandMenu';
import { NotionBubbleMenu } from './NotionBubbleMenu';
import { NotionDragHandle } from './NotionDragHandle';

const lowlight = createLowlight(all);

const NotionEditor = forwardRef(({ content }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
        // Enable dropcursor so users see where the block will land
        dropcursor: {
          color: '#37352f',
          width: 2,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading';
          return "Type '/' for commands";
        },
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
      }),
      SlashCommand.configure({
        suggestion: {
          items: ({ query }) =>
            getSuggestionItems()
              .filter(item =>
                item.title.toLowerCase().startsWith(query.toLowerCase())
              )
              .slice(0, 8),
          render: renderItems,
        },
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
        spellCheck: 'true',
      },
      // Allow drops inside the editor
      handleDrop: (view, event, slice, moved) => {
        // Let ProseMirror handle the default drop behaviour
        return false;
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getEditorJson: () => editor?.getJSON(),
    getEditorHtml: () => editor?.getHTML(),
    focus: () => editor?.chain().focus().run(),
  }));

  if (!editor) return null;

  return (
    <div className="relative w-full" style={{ paddingLeft: '48px' }}>
      {/* Drag handle sits in the left gutter */}
      <NotionDragHandle editor={editor} />

      {/* Text selection bubble menu */}
      <NotionBubbleMenu editor={editor} />

      {/* Main editable area */}
      <EditorContent
        editor={editor}
        className="w-full min-h-[60vh] cursor-text"
        onClick={() => {
          if (!editor.isFocused) {
            editor.chain().focus('end').run();
          }
        }}
      />
    </div>
  );
});

export default NotionEditor;
