"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

export const Navbar = () => {
    const scrolled = useScrollTop()

    return (
        <div className={cn(
            "fixed top-0 flex items-center w-full p-6 z-50 bg-background",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
        </div>
    )
}