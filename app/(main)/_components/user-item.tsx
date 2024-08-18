"use client"

import { ChevronsLeftRight } from "lucide-react"

import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SignOutButton, useUser } from "@clerk/clerk-react"


export const UserItem = () => {
    const { user } = useUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center w-full p-3 text-sm hover:bg-primary/5">
                    <div className="flex items-center gap-x-2 max-w-[150px]">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <span className="text-start font-medium line-clamp-1">
                            {user?.fullName}&apos;s Yotion
                        </span>
                    </div>
                    <ChevronsLeftRight className=" rotate-90 ml-2 text-muted-foreground h-5 w-5" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-sm line-clamp-1">
                                {user?.fullName}&apos;s Yotion
                            </p>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
                    <SignOutButton>Log out</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}