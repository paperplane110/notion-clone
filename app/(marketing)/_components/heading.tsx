"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useConvexAuth } from "convex/react"
import { Spinner } from "@/components/spinner"
import Link from "next/link"
import { SignInButton } from "@clerk/clerk-react"

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="test-3xl sm:text-5xl md:text-6xl font-bold">
                Your Thoughts, Your Space, Seamless Note-taking in <span className="underline">Yotion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Yotion is the connected workspace where <br />
                better, faster, work happends.
            </h3>
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Get Yotion free
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Yotion
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
        </div>
    )
}