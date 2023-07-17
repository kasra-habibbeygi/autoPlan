import React from 'react';
import { Link } from 'react-router-dom';

//Assets
import { HeaderWrapper } from './detail-box-header.style';

//Components
import FormButton from '../form-groups/form-button';

const DetailBoxHeader = ({ title, buttonText, onClick, link }) => {
    return (
        <HeaderWrapper>
            <p>{title}</p>

            {link ? (
                <Link to={link}>
                    <FormButton onClick={onClick} text={buttonText} width={'fit-content'} fontSize={12} />
                </Link>
            ) : (
                <FormButton onClick={onClick} text={buttonText} width={'fit-content'} fontSize={12} />
            )}
        </HeaderWrapper>
    );
};

export default DetailBoxHeader;
