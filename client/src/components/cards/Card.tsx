import React from "react";
import { DescriptionTextDemo } from "../texts/DescriptionText";
import { InfoTextDemo } from "../texts/InfoText";


export const CardDemo = () => {
    return(
        <>
		{/* Might be a better idea to use static asset and set is as background... */}
		<div className="backgroundCardBeige">
			<InfoTextDemo />
			<DescriptionTextDemo />
		</div>
		<div className="backgroundCardLightBeige">
			<InfoTextDemo />
			<DescriptionTextDemo />
		</div>
		<div className="backgroundCardPurple">
			<InfoTextDemo />
			<DescriptionTextDemo />
		</div>
		<div className="backgroundCardBlue">
			<InfoTextDemo />
			<DescriptionTextDemo />
		</div>
        </>
    );
};