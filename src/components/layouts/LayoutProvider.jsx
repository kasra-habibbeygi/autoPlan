import React from 'react';

//styles
import { LayoutProdiverStyle } from './LayoutProdiver.style';

//components
import { Outlet } from 'react-router-dom';

const LayoutProvider = () => {
    return (
        <LayoutProdiverStyle>
            <div className='content'>
                <Outlet />
            </div>
        </LayoutProdiverStyle>
    );
};

export default LayoutProvider;
