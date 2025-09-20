import { useEffect } from "react"
import React, { useState } from "react";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import VALID_WIKI_PAGES from "../../types/WikiPageIdentifier";

export const WikiIndex = () => {
    
    return (
        <BlankPage>
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