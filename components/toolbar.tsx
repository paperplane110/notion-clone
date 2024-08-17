"use client"

import { ElementRef, useRef, useState } from "react"
import { ImageIcon, Smile, Trash2Icon, X } from "lucide-react"
import TextareaAutosize from "react-textarea-autosize"

import { Doc } from "@/convex/_generated/dataModel"
import { IconPicker } from "./icon-picker"
import { Button } from "./ui/button"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useCoverImage } from "@/hooks/use-cover-image"

interface ToolbarProps {
  initialData: Doc<"documents">
  preview?: boolean
}

export const Toolbar = ({
  initialData,
  preview
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null)

  const [isEditing, setIsEditing] = useState(true)
  const [value, setValue] = useState(initialData.title)

  const coverImage = useCoverImage()

  const update = useMutation(api.documents.update)
  const removeIcon = useMutation(api.documents.removeIcon)

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true)
    setTimeout(() => {
      setValue(initialData.title)
      inputRef.current?.focus()
    }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
  }

  const onInput = (value: string) => {
    setValue(value)
    update({
      id: initialData._id,
      title: value || "Untitled"
    })
  }

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault()
      disableInput()
    }
  }

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon
    })
  }

  const onIconRemove = () => {
    removeIcon({ id: initialData._id })
  }

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">
          {initialData.icon}
        </p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-2">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="ghost"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!!initialData.icon && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="ghost"
            size="sm"
            onClick={onIconRemove}
          >
            <Trash2Icon className="h-4 w-4 mr-2"/>
            Remove icon
          </Button>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="ghost"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  )
}