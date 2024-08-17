"use client"

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import { useTheme } from "next-themes"
import "@blocknote/mantine/style.css"

interface EditroProps {
  onChange: (value: string) => void
  initialContent?: string
  editable?: boolean
}

export const Editor = ({
  onChange,
  initialContent,
  editable
}: EditroProps) => {
  const { resolvedTheme } = useTheme()

  const editor = useCreateBlockNote({
    initialContent:
      initialContent
        ? JSON.parse(initialContent) as PartialBlock[]
        : undefined,
  })

  const onContentChange = () => {
    onChange(JSON.stringify(editor.document, null, 2))
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={onContentChange}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  )
}