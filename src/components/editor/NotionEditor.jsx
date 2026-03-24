import React, { forwardRef, useImperativeHandle, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';

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
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading';
          return "Type '/' for commands";
        },
      }),
      SlashCommand.configure({
        suggestion: {
          items: ({ query }) =>
            getSuggestionItems().filter(item =>
              item.title.toLowerCase().startsWith(query.toLowerCase())
            ).slice(0, 8),
          render: renderItems,
        },
      }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'notion-editor-prose',
        spellCheck: 'true',
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getEditorJson: () => editor?.getJSON(),
    focus: () => editor?.chain().focus().run(),
  }));

  if (!editor) return null;

  return (
    // Outer gutter wrapper — Notion leaves ~96px on the left for the drag handle
    <div className="relative w-full" style={{ paddingLeft: '46px' }}>
      <NotionDragHandle editor={editor} />
      <NotionBubbleMenu editor={editor} />
      <EditorContent
        editor={editor}
        className="w-full cursor-text"
        // Click below last block → append new paragraph and focus
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
