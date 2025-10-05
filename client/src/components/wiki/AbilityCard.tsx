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
        <div className="flex flex-row h-[4rem] w-[40rem] bg-alto">
            <img>
                src={imagePath}
            </img>
            
            <OutlineTextBP size="medium">
                {name}
            </OutlineTextBP>
        </div>
    );
}