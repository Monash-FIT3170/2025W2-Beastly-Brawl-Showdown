import React from 'react';
import FlexBoxEmpty from '../../components/flex/FlexBoxEmpty';
import FlexBoxEmptyDouble from '../../components/flex/FlexBoxEmptyDouble';
import FlexBoxUIButtons from '../../components/flex/FlexBoxUIButtons'
import FlexBoxInput from '../../components/flex/FlexBoxInput'
import FlexBoxTheme from '../../components/flex/FlexBoxTheme'

export const DesignSystem = () => (
    <div className='min-h-screen max-h-screen y-screen bg-darkpurple'>
        <div className='flex'>
            <FlexBoxEmptyDouble />
            <FlexBoxEmpty />
        </div>
        <div className='flex'>
            <FlexBoxTheme />
            <FlexBoxUIButtons />
            <FlexBoxInput />
        </div>
    </div>
)