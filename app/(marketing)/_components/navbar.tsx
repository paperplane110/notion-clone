"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"
import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
    const scrolled = useScrollTop()

    return (
        <div className={cn(
            "fixed top-0 flex items-center w-full p-6 z-50 bg-background dark:bg-[#1F1F1F]",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="w-full flex justify-between md:justify-end md:ml-auto items-center gap-x-2">
                <ModeToggle />
            </div>
        </div>
    )
}