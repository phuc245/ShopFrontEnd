import { useEditor, EditorContent } from "@tiptap/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import { Button } from "@/components/ui/button";
import { BoldIcon, Italic as ItalicIcon, UnderlineIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TiptapProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = (props: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      Bold,
      Italic,
      Document,
      Text,
      Paragraph,
      Highlight.configure({ multicolor: true }),
      Link,
      Strike,
      Subscript,
      Underline,
      TextStyle,
      Color,
      Heading.configure({
        HTMLAttributes: {
          class: "text-3xl font-bold",
          levels: [1],
        },
      }),
    ],
    content: props.value,
    editorProps: {
      attributes: {
        class: "h-[500px] border-0 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  useEffect(() => {
    if (editor && editor.getHTML() !== props.value) {
      editor.commands.setContent(props.value);
    }
  }, [props.value]);

  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="control-group">
        <div className="flex gap-2 ">
          <input
            type="color"
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <BoldIcon size={10} />
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <ItalicIcon size={10} />
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <UnderlineIcon size={10} />
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "is-active" : ""}
          >
            Highlight
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={setLink}
            className={editor.isActive("link") ? "is-active" : ""}
          >
            Link
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Toggle strike
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={editor.isActive("subscript") ? "is-active" : ""}
          >
            Script
          </Button>
          <Button
            size={"sm"}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </Button>
          <Button
            disabled
            size={"sm"}
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[500px] border">
        <EditorContent editor={editor} />
      </ScrollArea>
    </>
  );
};

export default Tiptap;
