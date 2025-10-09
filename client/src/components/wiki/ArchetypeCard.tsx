import React, { ReactNode } from "react"
import { BlackText } from "../../components/texts/BlackText";
import { OutlineTextBP } from "../../components/texts/OutlineTextBP";
import { ActionIdentifier } from "../../../../types/single/actionState";

interface ArchetypeProps {
    image: ActionIdentifier,
    name: string,
    body: string,
    action: string,
}

export const ArchetypeCard = ({image, name, body, action}: ArchetypeProps) => {
    const imagePath =
        "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/action/" +
        image +
        ".webp";

    const colour = name.toLowerCase();

    return (
        <div className={`flex flex-col h-[20rem] w-[100rem] bg-${colour} justify-start items-center whitespace-pre-line p-[1rem] space-y-[1rem] border-[0.4rem] border-blackCurrant rounded-xl`}>
            
            
            <div>
                <OutlineTextBP size="large">
                    {name}
                </OutlineTextBP>
            </div>

            <div>
                <BlackText size="medium">
                    {`${body}`} 
                </BlackText>
            </div>

            <div className="flex flex-row w-full justify-start items-center space-x-[1rem]">

                <div>
                    <OutlineTextBP size="medium">
                        {"Archetype Ability:"}
                    </OutlineTextBP>
                </div>

                <div>
                    <img
                    src={imagePath}
                    className="w-[4rem] h-[4rem]"
                    />
                </div>

                <div >
                    <OutlineTextBP size="medium">
                        <a href={`/wiki/abilities`}>
                            {action}
                        </a>
                    </OutlineTextBP>
                </div>

            </div>

        </div>
    );
}