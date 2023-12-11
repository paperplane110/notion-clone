"use client"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { PlusCircle } from "lucide-react"
import Image from "next/image"

import { toast } from "sonner"

import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const DocumentsPage = () => {
    const { user } = useUser()

    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title: "Untitled" })

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="empty"
                className="dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="empty-dark"
                className="hidden dark:block"
            />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Yotion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
    )
}

export default DocumentsPage