import React from 'react';
import FlexBoxLogoIcons from '../../components/flex/FlexBoxLogoIcons';
import FlexBoxUIButtons from '../../components/flex/FlexBoxUIButtons'
import FlexBoxInput from '../../components/flex/FlexBoxInput'
import FlexBoxTheme from '../../components/flex/FlexBoxTheme'
import FlexBoxBars from '../../components/flex/FlexBoxBars';

export const DesignSystem = () => (
    <div className='min-h-screen max-h-screen y-screen bg-darkpurple'>
        <div className='flex'>
            <FlexBoxLogoIcons />
            <FlexBoxBars />
        </div>
        <div className='flex'>
            <FlexBoxTheme />
            <FlexBoxUIButtons />
            <FlexBoxInput />
        </div>
    </div>
)