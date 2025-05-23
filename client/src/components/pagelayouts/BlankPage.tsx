import React, { ReactNode } from "react"

interface PageProps {
    children?: ReactNode
}

export const BlankPage = ({children}: PageProps) => {

    return (
        <div className="bg-peach lg:p-[1.25rem] sm:p-[3rem] h-screen w-screen flex flex-col justify-around">
            <div className="bg-goldenRod h-full outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center">
                {children}
            </div>
        </div>
    );
}