import React from 'react';

//Assets
import { HeaderWrapper } from './detail-box-header.style';

//Components
import FormButton from '../form-button/form-button';

const DetailBoxHeader = ({ title, buttonText, onClick }) => {
    return (
        <HeaderWrapper>
            <p>{title}</p>
            <FormButton onClick={onClick} text={buttonText} width={'fit-content'} fontSize={12} />
        </HeaderWrapper>
    );
};

export default DetailBoxHeader;
