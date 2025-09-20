import { useEffect } from "react"
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { WikiPageIdentifier } from "../../types/WikiPageIdentifier";
import { BlackText } from "../../components/texts/BlackText";


interface PageProps {
    pageName: WikiPageIdentifier;
}

export const WikiPage = ({ pageName }: PageProps) => {
    const [content, setContent] = useState<string>("Loading...");

    useEffect(() => { 
        fetch(`/wikipages/${pageName.toString()}.md`)
            .then((res) => res.text())
            .then((text) => setContent(text))
            .catch((err) => setContent("Error loading page: " + err));
    }, [pageName]);

    return (
        <BlankPage>
            <div className="flex flex-col h-full w-full">
                <BlackText size="medium">
                    <div className="whitespace-pre-wrap break-normal">{content}</div>
                </BlackText>
            </div>
        </BlankPage>
    );
};