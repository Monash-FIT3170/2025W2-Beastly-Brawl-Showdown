import React from "react";

interface FooterProps{
    text: string;
    children: React.ReactNode;
}

export const Footer = ({ text, children }: FooterProps) => {

    return(
    <div className = "footerLayout">
        <div className="footer">
            <div className="flex-col">{text}</div>
            <div className="flex flex-row justify-evenly w-full">{children}</div>
        </div>
    </div>
    );
}
