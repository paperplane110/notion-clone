import { Button } from "@/components/ui/button"
import { Logo } from "./logo"

export const Footer = () => {
    return (
        <div className=" w-full flex items-center p-6 bg-background dark:bg-[#1F1F1F] z-50">
            <Logo />
            <div className="flex items-center justify-between md:ml-auto md:justify-end w-full gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">Privacy Policy</Button>
                <Button variant="ghost" size="sm">Terms & Conditions</Button>
            </div>
        </div>
    )
}