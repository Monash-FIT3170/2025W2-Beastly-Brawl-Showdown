import React, { ReactNode } from "react"
import { BlackText } from "../../components/texts/BlackText";
import { OutlineTextBP } from "../../components/texts/OutlineTextBP";
import { ActionIdentifier } from "../../../../types/single/actionState";

interface AbilityProps {
    image: ActionIdentifier,
    name: string,
    body: string, 
    uses: string,
}

export const AbilityCard = ({image, name, body, uses}: AbilityProps) => {
    const imagePath =
        "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/action/" +
        image +
        ".webp";


    return (
        <div className="flex flex-row h-[10rem] w-[100rem] bg-alto justify-start items-center whitespace-pre-line p-[1rem] space-x-[1rem] border-[0.4rem] border-blackCurrant rounded-xl">
            <img
                src={imagePath}
                className="w-[8rem] h-[8rem]"
            />
            
            <div className="w-[16rem]">
                <OutlineTextBP size="medium">
                    {name}
                </OutlineTextBP>
            </div>

            <div>
                <BlackText size="medium">
                    {`${body} \nUses: ${uses}`} 
                </BlackText>
            </div>
        </div>
    );
}