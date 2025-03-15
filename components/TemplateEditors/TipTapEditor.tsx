"use client";
import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TipTapEditor = ({ content, onChange, className }) => {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Link.configure({
        openOnClick: false, // Don't open links on click in the editor
        linkOnPaste: true, // Automatically convert pasted URLs to links
      }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // Make sure editor is properly initialized before using it
  useEffect(() => {
    if (editor && content && editor.isEmpty) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    // Check if a URL has been entered and that it's reasonably valid
    if (
      linkUrl &&
      (linkUrl.startsWith("http://") ||
        linkUrl.startsWith("https://") ||
        linkUrl.startsWith("/"))
    ) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else if (linkUrl) {
      // Add https if missing and not a relative link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `https://${linkUrl}` })
        .run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const createHeadingButton = (level, Icon) => (
    <Button
      variant="ghost"
      size="sm"
      className={`p-1 ${editor.isActive("heading", { level }) ? "bg-muted" : ""}`}
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      title={`Heading ${level}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <div className={`${className || ""} border-0`}>
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/20">
        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("bold") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("italic") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("strike") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1"></div>

        {createHeadingButton(1, Heading1)}
        {createHeadingButton(2, Heading2)}
        {createHeadingButton(3, Heading3)}

        <div className="w-px h-6 bg-border mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("bulletList") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("orderedList") ? "bg-muted" : ""}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          className={`p-1 ${editor.isActive("link") ? "bg-muted" : ""}`}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
            } else {
              setShowLinkInput(true);
              // Check if there's a selection before showing the link input
              const { from, to } = editor.state.selection;
              if (from === to) {
                // No selection, prompt user
                console.log("Select some text first to create a link");
              }
            }
          }}
          title="Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1"></div>

        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="p-1"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {showLinkInput && (
        <div className="p-2 bg-muted/10 flex items-center gap-2">
          <form
            onSubmit={handleLinkSubmit}
            className="flex items-center gap-2 w-full"
          >
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter URL"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              autoFocus
            />
            <Button type="submit" size="sm" className="h-9">
              Add
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowLinkInput(false)}
              className="h-9 px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 focus:outline-none min-h-64"
      />
    </div>
  );
};

export default TipTapEditor;
