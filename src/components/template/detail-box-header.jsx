import React from 'react';

//Assets

//Components
import Button from '../form-groups/button';
import { HeaderWrapper } from './detail-box-header.style';

const DetailBoxHeader = ({ title, buttonText, onClick }) => {
    return (
        <HeaderWrapper>
            <p>{title}</p>
            <Button onClick={onClick}>{buttonText}</Button>
        </HeaderWrapper>
    );
};

export default DetailBoxHeader;
