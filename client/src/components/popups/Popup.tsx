import React, { useState } from 'react';

interface PopupProp{
    text: string;
}

export const Popup = ({text}:PopupProp) => {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;

    return(
    <div className = "popupLayout">
        <div className = "popup"> 
            {/*<IconXPopup onClick={() => setVisible(false)} /> */}
            <div className = "popupText">
                <p>{text}</p>
            </div>
        </div>
    </div>
    )
}