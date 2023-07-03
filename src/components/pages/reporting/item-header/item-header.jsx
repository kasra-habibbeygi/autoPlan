import React from 'react';

//Assets

//Components
import Button from '../../../form-groups/button';
import { HeaderWrapper } from './item-header.style';

const ItemHeader = ({ title, onClick }) => {
    return (
        <HeaderWrapper>
            <p>{title}</p>
            <Button onClick={onClick}>دریافت گزارش کامل دوره</Button>
        </HeaderWrapper>
    );
};

export default ItemHeader;
