"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useCoverImage } from "@/hooks/use-cover-image"
import { SingleImageDropzone } from "../single-image-dropzone"
import { useState } from "react"
import { useEdgeStore } from "@/lib/edgestore"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

export const CoverImageModal = () => {
  const params = useParams()
  const coverImage = useCoverImage()
  const { edgestore } = useEdgeStore()

  const [file, setFile] = useState<File>()
  const [submitting, setSubmitting] = useState(false)

  const update = useMutation(api.documents.update)

  const onClose = () => {
    setFile(undefined)
    setSubmitting(false)
    coverImage.onClose()
  }

  const onChange = async (file?: File) => {
    if (file) {
      setSubmitting(true)
      setFile(file)


      const  res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url
        }
      })

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url
      })
      onClose()
    }

  }

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          onChange={onChange}
          disabled={submitting}
        />
      </DialogContent>
    </Dialog>
  )
}

