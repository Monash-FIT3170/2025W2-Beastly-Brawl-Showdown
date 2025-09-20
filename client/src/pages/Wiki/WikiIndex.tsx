import { useEffect } from "react"
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";

export const WikiIndex = () => {
    
    return (
        <BlankPage>
            <BaseCard color="peach" width={50} height={8}>
                <OutlineText size="extraLarge">Rules</OutlineText>
            </BaseCard>
            {VALID_WIKI_PAGES.map((page) => (
                <li key={page}>
                    <a className="text-blue-600 underline" href={`/wiki/${page}`}>
                        {page}
                    </a>
                </li>
            ))}
        </BlankPage>
    );
};