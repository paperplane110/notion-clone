import { useEffect, useState } from "react";

export const useOrigin = () => {
    const [mounted, setMounted] = useState(false)
    let origin
    if (typeof window !== "undefined") {
        origin = window.location.origin
    } else {
        origin = ""
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return ""
    return origin
}