import React, { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';

// Highlight.js Styling
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
import { SlashCommand, getSuggestionItems, renderItems } from './editor/SlashMenu';

// Icons
import { 
  Bold, Italic, Strikethrough, Link as LinkIcon, Plus
} from 'lucide-react';

const lowlight = createLowlight(all);

const TiptapEditor = forwardRef(({ content, onChange }, ref) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false, 
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading...';
          return "Type '/' for commands...";
        },
      }),
      SlashCommand.configure({
        suggestion: {
          items: ({ query }) => {
            return getSuggestionItems().filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 5);
          },
          render: renderItems,
        },
      }),
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: content,
  });

  useImperativeHandle(ref, () => ({
    getEditorJson: () => {
      return editor?.getJSON();
    },
  }));

  if (!editor) return null;

  return (
    <div 
      className="relative w-full max-w-[800px] mx-auto min-h-[60vh] cursor-text"
      // NOTION UI: Clicking the empty area focuses the editor at the end
      onClick={() => {
        if (!editor.isFocused) {
          editor.chain().focus().run();
        }
      }}
    >
      
      {/* Bubble Menu */}
      <BubbleMenu 
        editor={editor} 
        tippyOptions={{ duration: 150, animation: 'shift-away' }} 
        className="flex items-center gap-1 bg-white border border-[#eae8e4] text-[#00261b] p-1.5 rounded-xl shadow-lg font-sans transition-all duration-200 ease-in-out z-[9999]"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg hover:bg-[#f5f3ef] transition-colors ${editor.isActive('bold') ? 'bg-[#f5f3ef] text-[#00261b]' : 'text-[#414944]'}`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg hover:bg-[#f5f3ef] transition-colors ${editor.isActive('italic') ? 'bg-[#f5f3ef] text-[#00261b]' : 'text-[#414944]'}`}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg hover:bg-[#f5f3ef] transition-colors ${editor.isActive('strike') ? 'bg-[#f5f3ef] text-[#00261b]' : 'text-[#414944]'}`}
        >
          <Strikethrough size={16} />
        </button>
        <div className="w-px h-5 bg-[#eae8e4] mx-1" />
        <button
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL', previousUrl);
            if (url === null) return;
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
          className={`p-1.5 rounded-lg hover:bg-[#f5f3ef] transition-colors ${editor.isActive('link') ? 'bg-[#f5f3ef] text-[#00261b]' : 'text-[#414944]'}`}
        >
          <LinkIcon size={16} />
        </button>
      </BubbleMenu>

      {/* Main Writable Canvas */}
      <div className="tiptap-editor-container prose prose-lg prose-slate max-w-none">
        <EditorContent editor={editor} />
      </div>
      
      {/* Floating Plus Menu: Appears only when the line is empty */}
      <FloatingMenu 
        editor={editor} 
        tippyOptions={{ duration: 150 }} 
        className="flex -translate-x-12 opacity-0 hover:opacity-100 focus-within:opacity-100 group-hover:opacity-100 transition-opacity"
      >
         <button 
           onClick={() => editor.commands.insertContent('/')}
           className="w-10 h-10 flex items-center justify-center text-[#c0c8c3] hover:text-[#00261b] hover:bg-[#f5f3ef] rounded-full transition-all border border-transparent hover:border-[#efeeea] shadow-sm active:scale-90"
           title="Click or '/' to add block"
         >
           <Plus size={24}/>
         </button>
      </FloatingMenu>
    </div>
  );
});

export default TiptapEditor;
