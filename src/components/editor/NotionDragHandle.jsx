import React, { useEffect, useRef, useState } from 'react';
import { GripVertical, Plus } from 'lucide-react';

/**
 * NotionDragHandle
 * 
 * Renders the ⋮⋮ drag handle and + button that appear to the LEFT of
 * the hovered block in a Notion-style editor. 
 *
 * Approach: We listen on the ProseMirror DOM for mousemove, find the
 * closest top-level block element under the mouse, and position our
 * floating handle alongside it.
 */
export const NotionDragHandle = ({ editor }) => {
  const [pos, setPos] = useState(null); // { top: number }
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!editor) return;
    const editorEl = editor.view.dom;

    const onMouseMove = (e) => {
      const editorRect = editorEl.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      // Must be within horizontal bounds of editor
      if (x < editorRect.left - 80 || x > editorRect.right + 20) {
        setPos(null);
        setHoveredNode(null);
        return;
      }

      // Walk through top-level children to find the one under the mouse
      const children = Array.from(editorEl.children);
      let found = null;
      for (const child of children) {
        const rect = child.getBoundingClientRect();
        if (y >= rect.top - 4 && y <= rect.bottom + 4) {
          found = { top: rect.top - editorRect.top, el: child };
          break;
        }
      }

      if (found) {
        setPos({ top: found.top });
        setHoveredNode(found.el);
      } else {
        setPos(null);
        setHoveredNode(null);
      }
    };

    const onMouseLeave = () => {
      setPos(null);
      setHoveredNode(null);
    };

    // Listen on document so handle also appears as user moves into left gutter
    document.addEventListener('mousemove', onMouseMove);
    editorEl.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      editorEl.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [editor]);

  const handleAddBlock = (e) => {
    e.preventDefault();
    if (!editor) return;
    editor.chain().focus('end').insertContent('\n').run();
    // Simulate slash to open command menu
    editor.commands.insertContent('/');
  };

  if (!pos) return null;

  return (
    <div
      ref={containerRef}
      className="absolute flex items-center gap-0.5 opacity-0 hover:opacity-100 transition-opacity duration-100 group"
      style={{
        top: pos.top,
        left: '-46px',
        height: '1.75rem',
        opacity: 1, // handled by parent hover state
      }}
    >
      {/* + button */}
      <button
        onMouseDown={handleAddBlock}
        className="w-6 h-6 flex items-center justify-center rounded text-[#b5b3ad] hover:bg-[#efeeea] hover:text-[#37352f] transition-colors"
        title="Add block below"
      >
        <Plus size={16} />
      </button>

      {/* ⋮⋮ Drag handle */}
      <button
        className="w-6 h-6 flex items-center justify-center rounded text-[#b5b3ad] hover:bg-[#efeeea] hover:text-[#37352f] transition-colors cursor-grab active:cursor-grabbing"
        title="Drag to move block"
        draggable
        onDragStart={(e) => {
          if (!hoveredNode || !editor) return;
          // Select the hovered block in ProseMirror
          const pos = editor.view.posAtDOM(hoveredNode, 0);
          editor.commands.setNodeSelection(pos);
        }}
      >
        <GripVertical size={16} />
      </button>
    </div>
  );
};
