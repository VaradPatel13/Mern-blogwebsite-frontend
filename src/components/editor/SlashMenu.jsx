import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Heading1, Heading2, List, Code, Image as ImageIcon, CheckSquare } from 'lucide-react';

// The Suggestion List UI Component
const CommandList = forwardRef((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
        return true;
      }
      if (event.key === 'ArrowDown') {
        setSelectedIndex((selectedIndex + 1) % props.items.length);
        return true;
      }
      if (event.key === 'Enter') {
        selectItem(selectedIndex);
        return true;
      }
      return false;
    },
  }));

  const selectItem = (index) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-[#efeeea] overflow-hidden w-64 p-2 animate-in fade-in zoom-in-95 duration-200 z-[9999]">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors ${
              index === selectedIndex ? 'bg-[#f5f3ef] text-[#00261b]' : 'bg-transparent text-[#414944] hover:bg-[#fafafa]'
            }`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className={`p-1.5 rounded-md ${index === selectedIndex ? 'bg-white shadow-sm' : 'bg-[#f5f3ef]'}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-xs">{item.title}</p>
              <p className="text-[10px] opacity-60 mt-0.5">{item.description}</p>
            </div>
          </button>
        ))
      ) : (
        <div className="text-xs text-center p-3 text-gray-500 font-sans">No results found</div>
      )}
    </div>
  );
});

// The Extension Configuration
export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const uploadImageToServer = async (file) => {
  // Placeholder for real backend logic
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      resolve(mockUrl);
    }, 1000);
  });
};

export const getSuggestionItems = () => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: <Heading1 size={14} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: <Heading2 size={14} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bulleted list.',
      icon: <List size={14} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with checkboxes.',
      icon: <CheckSquare size={14} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      title: 'Code Block',
      description: 'Capture a code snippet.',
      icon: <Code size={14} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
    {
      title: 'Image',
      description: 'Upload from device.',
      icon: <ImageIcon size={14} />,
      command: ({ editor, range }) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
          if (input.files?.length) {
            const file = input.files[0];
            const url = await uploadImageToServer(file);
            editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
          }
        };
        input.click();
      },
    },
  ];
};

export const renderItems = () => {
  let component;
  let popup;

  return {
    onStart: (props) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      if (!props.clientRect) {
        return;
      }

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },

    onUpdate(props) {
      component.updateProps(props);

      if (!props.clientRect) {
        return;
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        popup[0].hide();
        return true;
      }

      return component.ref?.onKeyDown(props);
    },

    onExit() {
      popup[0].destroy();
      component.destroy();
    },
  };
};
