import Image from "next/image";

export const Heroes = () => {
    return (
        <div className="flex flex-row items-center justify-center max-w-5xl">
            <div className="relative w-[300px] h-[300px]
            sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]
            ">
            <Image 
                src="/documents.png"
                fill
                className="object-contain"
                alt="Documents"
            />
            </div>
            <div className="relative w-[400px] h-[400px] hidden md:block">
                <Image 
                    src="/reading.png"
                    fill
                    className="object-contain"
                    alt="Reading"
                />
            </div>
        </div>
    )
}