import { useEffect } from "react"
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { wikitopage } from "../../types/WikiPageIdentifier";

export const WikiIndex = () => {
    const getTitle = (name: string): string => {
        return wikitopage.find(p => p.name === name)?.title || name;
    };
    
    return (
        <BlankPage>
            <BaseCard color="peach" width={50} height={8}>
                <OutlineText size="extraLarge">Rules</OutlineText>
            </BaseCard>
            <BaseCard color="peach" width={110} height={48}>
                <div className="flex flex-col h-full w-full justify-start items-start p-[2rem] space-y-[2rem]">
                    {VALID_WIKI_PAGES.map((page) => (
                        <li key={page}>
                            <a className="font-jua text-blue-600 text-[2rem] underline" href={`/wiki/${page}`}>
                                {getTitle(page)}
                            </a>
                        </li>
                    ))}
                </div>
            </BaseCard>
        </BlankPage>
    );
};