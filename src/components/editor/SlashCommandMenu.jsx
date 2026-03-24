import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import {
  Heading1, Heading2, Heading3, List, ListOrdered,
  CheckSquare, Code, Quote, Image as ImageIcon, Minus,
} from 'lucide-react';

// ─── Command List UI ────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: 'Basic Blocks',
    items: [
      {
        title: 'Text', description: 'Start writing with plain text.', icon: <span className="font-serif font-semibold text-base leading-none">T</span>,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setParagraph().run(),
      },
      {
        title: 'Heading 1', description: 'Big section heading.', icon: <Heading1 size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run(),
      },
      {
        title: 'Heading 2', description: 'Medium section heading.', icon: <Heading2 size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run(),
      },
      {
        title: 'Heading 3', description: 'Small section heading.', icon: <Heading3 size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run(),
      },
      {
        title: 'Bullet List', description: 'Create a simple bulleted list.', icon: <List size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBulletList().run(),
      },
      {
        title: 'Numbered List', description: 'Create an ordered list.', icon: <ListOrdered size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
      },
      {
        title: 'To-do List', description: 'Track tasks with a to-do list.', icon: <CheckSquare size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleTaskList().run(),
      },
      {
        title: 'Quote', description: 'Capture a quote.', icon: <Quote size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
      },
      {
        title: 'Divider', description: 'Visually divide blocks.', icon: <Minus size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
      },
      {
        title: 'Code Block', description: 'Capture a code snippet.', icon: <Code size={16} />,
        command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
      },
    ],
  },
  {
    label: 'Media',
    items: [
      {
        title: 'Image', description: 'Upload or embed an image.', icon: <ImageIcon size={16} />,
        command: ({ editor, range }) => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = () => {
            if (input.files?.length) {
              const url = URL.createObjectURL(input.files[0]);
              editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
            }
          };
          input.click();
        },
      },
    ],
  },
];

export const getSuggestionItems = () => CATEGORIES.flatMap(c => c.items);

const CommandList = forwardRef(({ items, command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => setSelectedIndex(0), [items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') { setSelectedIndex(i => (i + items.length - 1) % items.length); return true; }
      if (event.key === 'ArrowDown') { setSelectedIndex(i => (i + 1) % items.length); return true; }
      if (event.key === 'Enter') { command(items[selectedIndex]); return true; }
      return false;
    },
  }));

  let renderedCount = 0;

  return (
    <div className="bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#e9e9e7] w-72 max-h-80 overflow-y-auto text-[#37352f]" style={{ zIndex: 9999 }}>
      {items.length === 0 ? (
        <div className="px-4 py-3 text-sm text-[#9b9b97]">No results</div>
      ) : (
        CATEGORIES.map(cat => {
          const catItems = cat.items.filter(ci => items.some(i => i.title === ci.title));
          if (!catItems.length) return null;
          return (
            <div key={cat.label}>
              <p className="px-3 pt-3 pb-1 text-[10px] font-semibold text-[#9b9b97] uppercase tracking-wider">{cat.label}</p>
              {catItems.map(item => {
                const globalIdx = renderedCount++;
                const isSelected = globalIdx === selectedIndex;
                return (
                  <button
                    key={item.title}
                    onClick={() => command(item)}
                    className={`flex items-center gap-3 w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      isSelected ? 'bg-[#f1f1ef]' : 'hover:bg-[#f9f9f8]'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#e9e9e7] rounded-sm shadow-sm shrink-0 text-[#37352f]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm leading-none">{item.title}</p>
                      <p className="text-xs text-[#9b9b97] mt-0.5">{item.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
});

// ─── TipTap Extension Wiring ─────────────────────────────────────────────────

export const SlashCommand = Extension.create({
  name: 'slashCommand',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => props.command({ editor, range }),
      },
    };
  },
  addProseMirrorPlugins() {
    return [Suggestion({ editor: this.editor, ...this.options.suggestion })];
  },
});

export const renderItems = () => {
  let component;
  let popup;

  return {
    onStart(props) {
      component = new ReactRenderer(CommandList, { props, editor: props.editor });
      if (!props.clientRect) return;
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
        zIndex: 9999,
        animation: 'shift-away',
        duration: 150,
      });
    },
    onUpdate(props) {
      component.updateProps(props);
      if (!props.clientRect) return;
      popup[0].setProps({ getReferenceClientRect: props.clientRect });
    },
    onKeyDown(props) {
      if (props.event.key === 'Escape') { popup[0].hide(); return true; }
      return component.ref?.onKeyDown(props);
    },
    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};
