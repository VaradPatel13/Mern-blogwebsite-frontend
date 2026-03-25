import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  GripVertical, Plus, Trash2, Copy, ArrowUp, ArrowDown,
  Type, Heading1, Heading2, Heading3, List, ListOrdered,
  CheckSquare, Quote, Code, Minus, Image as ImageIcon,
  MessageSquare, Table, ToggleRight,
} from 'lucide-react';
import { NodeSelection } from '@tiptap/pm/state';

// ─── Add Block Menu (appears on + click) ──────────────────────────────────────

const ADD_BLOCK_CATEGORIES = [
  {
    label: 'Basic Blocks',
    items: [
      { title: 'Text', desc: 'Start writing with plain text.', icon: <Type size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, { type: 'paragraph' }).focus(pos + 1).run();
        }},
      { title: 'Heading 1', desc: 'Big section heading.', icon: <Heading1 size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, { type: 'heading', attrs: { level: 1 } }).focus(pos + 1).run();
        }},
      { title: 'Heading 2', desc: 'Medium section heading.', icon: <Heading2 size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, { type: 'heading', attrs: { level: 2 } }).focus(pos + 1).run();
        }},
      { title: 'Heading 3', desc: 'Small section heading.', icon: <Heading3 size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, { type: 'heading', attrs: { level: 3 } }).focus(pos + 1).run();
        }},
    ]
  },
  {
    label: 'Lists',
    items: [
      { title: 'Bullet List', desc: 'Create a simple bulleted list.', icon: <List size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, {
            type: 'bulletList',
            content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }]
          }).focus(pos + 2).run();
        }},
      { title: 'Numbered List', desc: 'Create a numbered list.', icon: <ListOrdered size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, {
            type: 'orderedList',
            content: [{ type: 'listItem', content: [{ type: 'paragraph' }] }]
          }).focus(pos + 2).run();
        }},
      { title: 'To-do List', desc: 'Track tasks with checkboxes.', icon: <CheckSquare size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, {
            type: 'taskList',
            content: [{ type: 'taskItem', attrs: { checked: false }, content: [{ type: 'paragraph' }] }]
          }).focus(pos + 2).run();
        }},
    ]
  },
  {
    label: 'Media',
    items: [
      { title: 'Image', desc: 'Upload or embed an image.', icon: <ImageIcon size={16} />,
        action: (editor, pos) => {
          const input = document.createElement('input');
          input.type = 'file'; input.accept = 'image/*';
          input.onchange = () => {
            if (input.files?.length) {
              const url = URL.createObjectURL(input.files[0]);
              editor.chain().focus().insertContentAt(pos, { type: 'image', attrs: { src: url } }).run();
            }
          };
          input.click();
        }},
    ]
  },
  {
    label: 'Advanced',
    items: [
      { title: 'Code Block', desc: 'Write a code snippet.', icon: <Code size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, {
            type: 'codeBlock', attrs: { language: 'javascript' }, content: [{ type: 'text', text: ' ' }]
          }).focus(pos + 1).run();
        }},
      { title: 'Quote', desc: 'Capture a quote.', icon: <Quote size={16} />,
        action: (editor, pos) => {
          editor.chain().insertContentAt(pos, {
            type: 'blockquote', content: [{ type: 'paragraph' }]
          }).focus(pos + 2).run();
        }},
      { title: 'Divider', desc: 'Visually divide blocks.', icon: <Minus size={16} />,
        action: (editor, pos) => {
          editor.chain().focus().insertContentAt(pos, { type: 'horizontalRule' }).run();
        }},
    ]
  },
];

const AddBlockMenu = ({ editor, blockPos, onClose, menuPos }) => {
  const menuRef = useRef(null);
  const [filter, setFilter] = useState('');
  const inputRef = useRef(null);
  const [adjustedPos, setAdjustedPos] = useState({ top: menuPos.top, left: menuPos.left });

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Auto-focus the search input
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Viewport clamping
  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let { top, left } = menuPos;
    if (top + rect.height > vh - 16) top = vh - rect.height - 16;
    if (top < 8) top = 8;
    if (left + rect.width > vw - 16) left = vw - rect.width - 16;
    if (left < 8) left = 8;
    setAdjustedPos({ top, left });
  }, [menuPos]);

  const node = editor.state.doc.nodeAt(blockPos);
  if (!node) return null;
  const insertPos = blockPos + node.nodeSize;

  const filteredCategories = ADD_BLOCK_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.title.toLowerCase().includes(filter.toLowerCase()) ||
      item.desc.toLowerCase().includes(filter.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div
      ref={menuRef}
      data-drag-menu
      className="fixed bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-[#e9e9e7] w-72 max-h-96 text-[#37352f] select-none overflow-hidden flex flex-col"
      style={{ top: adjustedPos.top, left: adjustedPos.left, zIndex: 99999 }}
    >
      {/* Search filter */}
      <div className="px-3 pt-2.5 pb-1.5 border-b border-[#e9e9e7]">
        <input
          ref={inputRef}
          type="text"
          placeholder="Filter blocks..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full text-sm bg-transparent outline-none placeholder:text-[#c1c0bc]"
          style={{ border: 'none', boxShadow: 'none' }}
        />
      </div>

      <div className="overflow-y-auto flex-1 py-1">
        {filteredCategories.length === 0 ? (
          <p className="px-3 py-3 text-sm text-[#9b9b97]">No blocks found</p>
        ) : (
          filteredCategories.map(cat => (
            <div key={cat.label}>
              <p className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-[#9b9b97] uppercase tracking-wider">{cat.label}</p>
              {cat.items.map(item => (
                <button
                  key={item.title}
                  onClick={() => { item.action(editor, insertPos); onClose(); }}
                  className="flex items-center gap-3 w-full text-left px-3 py-1.5 text-sm hover:bg-[#f1f1ef] transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white border border-[#e9e9e7] rounded-sm shadow-sm shrink-0 text-[#37352f]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm leading-tight">{item.title}</p>
                    <p className="text-xs text-[#9b9b97] leading-tight">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ─── Block Context Menu (appears on ⋮⋮ click) ────────────────────────────────

const TURN_INTO_ITEMS = [
  { label: 'Text',         icon: <Type size={14} />,       action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).setParagraph().run();
  }},
  { label: 'Heading 1',    icon: <Heading1 size={14} />,   action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).setNode('heading', { level: 1 }).run();
  }},
  { label: 'Heading 2',    icon: <Heading2 size={14} />,   action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).setNode('heading', { level: 2 }).run();
  }},
  { label: 'Heading 3',    icon: <Heading3 size={14} />,   action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).setNode('heading', { level: 3 }).run();
  }},
  { label: 'Bullet List',  icon: <List size={14} />,       action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).toggleBulletList().run();
  }},
  { label: 'Numbered List',icon: <ListOrdered size={14} />,action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).toggleOrderedList().run();
  }},
  { label: 'To-do List',   icon: <CheckSquare size={14} />,action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).toggleTaskList().run();
  }},
  { label: 'Quote',        icon: <Quote size={14} />,      action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).toggleBlockquote().run();
  }},
  { label: 'Code Block',   icon: <Code size={14} />,       action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).toggleCodeBlock().run();
  }},
  { label: 'Divider',      icon: <Minus size={14} />,      action: (editor, p) => {
    editor.chain().focus().setTextSelection(p + 1).setHorizontalRule().run();
  }},
];

const BlockContextMenu = ({ editor, blockPos, onClose, menuPos }) => {
  const menuRef = useRef(null);
  const [showTurnInto, setShowTurnInto] = useState(false);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const node = editor.state.doc.nodeAt(blockPos);
  if (!node) return null;

  const handleDelete = () => {
    const from = blockPos;
    const to = blockPos + node.nodeSize;
    editor.chain().focus().deleteRange({ from, to }).run();
    onClose();
  };

  const handleDuplicate = () => {
    const insertPos = blockPos + node.nodeSize;
    const json = node.toJSON();
    editor.chain().focus().insertContentAt(insertPos, json).run();
    onClose();
  };

  const handleMoveUp = () => {
    if (blockPos === 0) return;
    const resolved = editor.state.doc.resolve(blockPos);
    const indexInParent = resolved.index(0);
    if (indexInParent === 0) return;
    // Get previous sibling
    const prevNode = editor.state.doc.child(indexInParent - 1);
    const prevPos = blockPos - prevNode.nodeSize;
    // Delete current, insert before previous
    const json = node.toJSON();
    editor.chain()
      .focus()
      .deleteRange({ from: blockPos, to: blockPos + node.nodeSize })
      .insertContentAt(prevPos, json)
      .run();
    onClose();
  };

  const handleMoveDown = () => {
    const resolved = editor.state.doc.resolve(blockPos);
    const indexInParent = resolved.index(0);
    if (indexInParent >= editor.state.doc.childCount - 1) return;
    // Get next sibling
    const nextNode = editor.state.doc.child(indexInParent + 1);
    const nextEnd = blockPos + node.nodeSize + nextNode.nodeSize;
    const json = node.toJSON();
    // Delete current, insert after next
    editor.chain()
      .focus()
      .deleteRange({ from: blockPos, to: blockPos + node.nodeSize })
      .insertContentAt(nextEnd - node.nodeSize, json)
      .run();
    onClose();
  };

  const MenuBtn = ({ icon, label, onClick, danger }) => (
    <button
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex items-center gap-2.5 w-full text-left px-3 py-1.5 text-[13px] rounded transition-colors ${
        danger
          ? 'text-red-500 hover:bg-red-50'
          : 'text-[#37352f] hover:bg-[#f1f1ef]'
      }`}
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0 opacity-60">{icon}</span>
      <span>{label}</span>
    </button>
  );

  // Auto-adjust position to stay inside viewport
  const [adjustedPos, setAdjustedPos] = useState({ top: menuPos.top, left: menuPos.left });

  useEffect(() => {
    if (!menuRef.current) return;
    const rect = menuRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let { top, left } = menuPos;

    // Clamp bottom
    if (top + rect.height > vh - 16) top = vh - rect.height - 16;
    // Clamp top
    if (top < 8) top = 8;
    // Clamp right
    if (left + rect.width > vw - 16) left = vw - rect.width - 16;
    // Clamp left
    if (left < 8) left = 8;

    setAdjustedPos({ top, left });
  }, [menuPos]);

  return (
    <div
      ref={menuRef}
      data-drag-menu
      className="fixed bg-white rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.15)] border border-[#e9e9e7] py-1.5 w-56 text-[#37352f] select-none animate-in fade-in zoom-in-95 duration-100"
      style={{ top: adjustedPos.top, left: adjustedPos.left, zIndex: 99999 }}
    >
      {!showTurnInto ? (
        <>
          <MenuBtn icon={<Trash2 size={14}/>} label="Delete" onClick={handleDelete} danger />
          <MenuBtn icon={<Copy size={14}/>} label="Duplicate" onClick={handleDuplicate} />
          <div className="h-px bg-[#e9e9e7] my-1 mx-2" />
          <button
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); setShowTurnInto(true); }}
            className="flex items-center justify-between w-full text-left px-3 py-1.5 text-[13px] rounded text-[#37352f] hover:bg-[#f1f1ef] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-5 h-5 flex items-center justify-center shrink-0 opacity-60"><Type size={14}/></span>
              <span>Turn into</span>
            </span>
            <span className="text-[#9b9b97] text-xs">→</span>
          </button>
          <div className="h-px bg-[#e9e9e7] my-1 mx-2" />
          <MenuBtn icon={<ArrowUp size={14}/>} label="Move up" onClick={handleMoveUp} />
          <MenuBtn icon={<ArrowDown size={14}/>} label="Move down" onClick={handleMoveDown} />
        </>
      ) : (
        <>
          <button
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); setShowTurnInto(false); }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#9b9b97] hover:text-[#37352f] transition-colors w-full"
          >
            ← Back
          </button>
          <div className="h-px bg-[#e9e9e7] my-0.5 mx-2" />
          {TURN_INTO_ITEMS.map((item) => (
            <MenuBtn
              key={item.label}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                try { item.action(editor, blockPos); } catch {}
                onClose();
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

// ─── Main Drag Handle Component ───────────────────────────────────────────────

export const NotionDragHandle = ({ editor }) => {
  const [handleState, setHandleState] = useState(null);
  const [menuState, setMenuState] = useState(null); // { blockPos, top, left } — for ⋮⋮ context menu
  const [addMenuState, setAddMenuState] = useState(null); // { blockPos, top, left } — for + block menu
  const wrapperRef = useRef(null);
  const plusRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // ── Find hovered block ──────────────────────────────────────────────
  const resolveBlock = useCallback((e) => {
    if (!editor?.view) return null;
    const editorDom = editor.view.dom;
    const editorRect = editorDom.getBoundingClientRect();
    const y = e.clientY;

    if (e.clientX < editorRect.left - 60 || e.clientX > editorRect.right + 20) return null;
    if (y < editorRect.top - 10 || y > editorRect.bottom + 10) return null;

    const children = editorDom.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const rect = child.getBoundingClientRect();
      if (y >= rect.top - 2 && y <= rect.bottom + 2) {
        try {
          const pos = editor.view.posAtDOM(child, 0);
          const resolved = editor.state.doc.resolve(pos);
          const blockPos = resolved.before(1);
          return { top: rect.top - editorRect.top, blockPos, domNode: child };
        } catch { return null; }
      }
    }
    return null;
  }, [editor]);

  useEffect(() => {
    if (!editor?.view) return;

    const onMouseMove = (e) => {
      // Don't reposition if context menu is open
      if (menuState) return;

      const wrapper = wrapperRef.current;
      if (wrapper && wrapper.contains(e.target)) return;

      const block = resolveBlock(e);

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }

      if (block) {
        setHandleState(block);
      } else {
        hideTimeoutRef.current = setTimeout(() => setHandleState(null), 200);
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // Hide handles and close menus on PAGE scroll only (not menu internal scroll)
    const onScroll = (e) => {
      // If the scroll is happening inside a menu popup, ignore it
      const target = e.target;
      if (target?.closest?.('[data-drag-menu]')) return;

      setHandleState(null);
      setMenuState(null);
      setAddMenuState(null);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };

    // Use capture phase so we catch scroll on the <main> element too
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('scroll', onScroll, { capture: true });
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [editor, resolveBlock, menuState, addMenuState]);

  // ── + button → open Add Block Menu ──────────────────────────────────
  const handleAddBlock = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!handleState) return;

    const btn = plusRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setAddMenuState({
        blockPos: handleState.blockPos,
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
  }, [handleState]);

  // ── ⋮⋮ click → open context menu ───────────────────────────────────
  const gripRef = useRef(null);

  const handleGripClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!handleState) return;

    // Position menu anchored to the grip button, not raw click coords
    const btn = gripRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setMenuState({
        blockPos: handleState.blockPos,
        top: rect.bottom + 4,
        left: rect.left,
      });
    } else {
      setMenuState({
        blockPos: handleState.blockPos,
        top: e.clientY + 4,
        left: e.clientX,
      });
    }
  }, [handleState]);

  // ── ⋮⋮ drag ────────────────────────────────────────────────────────
  const handleDragStart = useCallback((e) => {
    if (!editor?.view || !handleState) return;

    // Close menu if open
    setMenuState(null);

    const { blockPos } = handleState;
    const { view } = editor;
    const { state } = view;

    try {
      const nodeSelection = NodeSelection.create(state.doc, blockPos);
      view.dispatch(state.tr.setSelection(nodeSelection));

      const slice = nodeSelection.content();
      const { dom, text } = view.serializeForClipboard(slice);

      e.dataTransfer.clearData();
      e.dataTransfer.setData('text/html', dom.innerHTML);
      e.dataTransfer.setData('text/plain', text);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setDragImage(handleState.domNode, 0, 0);

      view.dragging = { slice, move: true };
    } catch (err) {
      console.warn('Drag start failed:', err);
    }
  }, [editor, handleState]);

  if (!handleState && !menuState) return null;

  return (
    <>
      {/* Handle buttons */}
      {handleState && (
        <div
          ref={wrapperRef}
          className="absolute flex items-center gap-0.5"
          style={{
            top: handleState.top,
            left: 0,
            transform: 'translateX(-100%)',
            paddingRight: '4px',
            zIndex: 10,
          }}
          onMouseEnter={() => {
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
              hideTimeoutRef.current = null;
            }
          }}
        >
          {/* + Add block */}
          <button
            ref={plusRef}
            onMouseDown={handleAddBlock}
            className="w-6 h-6 flex items-center justify-center rounded text-[#b5b3ad] hover:bg-[#ebebea] hover:text-[#37352f] transition-colors"
            title="Click to add a block below"
          >
            <Plus size={18} strokeWidth={2} />
          </button>

          {/* ⋮⋮ Grip — click for menu, drag to reorder */}
          <div
            ref={gripRef}
            role="button"
            tabIndex={0}
            className="w-6 h-6 flex items-center justify-center rounded text-[#b5b3ad] hover:bg-[#ebebea] hover:text-[#37352f] transition-colors cursor-grab active:cursor-grabbing"
            title="Click for options, drag to move"
            draggable="true"
            onClick={handleGripClick}
            onDragStart={handleDragStart}
          >
            <GripVertical size={18} strokeWidth={2} />
          </div>
        </div>
      )}

      {/* Block Context Menu (⋮⋮ click) */}
      {menuState && (
        <BlockContextMenu
          editor={editor}
          blockPos={menuState.blockPos}
          menuPos={{ top: menuState.top, left: menuState.left }}
          onClose={() => setMenuState(null)}
        />
      )}

      {/* Add Block Menu (+ click) */}
      {addMenuState && (
        <AddBlockMenu
          editor={editor}
          blockPos={addMenuState.blockPos}
          menuPos={{ top: addMenuState.top, left: addMenuState.left }}
          onClose={() => setAddMenuState(null)}
        />
      )}
    </>
  );
};
