"use client"

import { cn } from "@/lib/utils"
import { useConvexAuth } from "convex/react"
import { useScrollTop } from "@/hooks/use-scroll-top"

import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "./logo"
import { SignInButton, UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import Link from "next/link"

export const Navbar = () => {
    const scrolled = useScrollTop()
    const { isLoading, isAuthenticated } = useConvexAuth()

    return (
        <div className={cn(
            "fixed top-0 flex items-center w-full p-6 z-50 bg-background dark:bg-[#1F1F1F]",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="w-full flex justify-between md:justify-end md:ml-auto items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">Login</Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button>Get Yotion Free</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost">
                            <Link href="/documents">
                                Enter Yotion
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}