"use client"

import { useQuery } from "convex/react";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">
  }
}

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, { id: params.documentId })

  if (document === undefined) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (document === null) {
    return (
      <div>Not Found</div>
    )
  }

  return (
    <div className="pb-40">
      <div className="h-[35vh]" />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  )
}

export default DocumentIdPage;