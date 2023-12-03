"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="test-3xl sm:text-5xl md:text-6xl font-bold">
                Write Down Ideas, Documents, & Plans in One Place. 
                Welcome to <span className="underline">Yotion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Yotion is the connected workspace where <br />
                better, faster, work happends.
            </h3>
            <Button>
                Enter Yotion
                <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
}