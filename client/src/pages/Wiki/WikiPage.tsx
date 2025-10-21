import { useEffect } from "react"
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { WikiPageIdentifier, wikitopage } from "../../types/WikiPageIdentifier";
import { BlackText } from "../../components/texts/BlackText";

interface PageProps {
    pageName: WikiPageIdentifier;
}

export const WikiPage = ({ pageName }: PageProps) => {
    
    const [content, setContent] = useState<JSX.Element>(<div>Loading...</div>);

    {/*
        useEffect(() => { 
        fetch(`/wikipages/${pageName.toString()}.md`)
            .then((res) => res.text())
            .then((text) => setContent(text))
            .catch((err) => setContent("Error loading page: " + err));
    }, [pageName]);
    */}

    useEffect(() => { 
        setContent(wikitopage.find(page => page.name === pageName)?.page || <div>Page not found</div>);
    }, [pageName]);

    {/*<BlankPage>
            <div className="flex flex-col h-full w-full overflow-y-scroll">
                <BlackText size="medium">
                    <div className="whitespace-pre-wrap break-normal">{content}</div>
                </BlackText>
            </div>
        </BlankPage>*/}

    return <BlankPage>{content}</BlankPage>

    
};