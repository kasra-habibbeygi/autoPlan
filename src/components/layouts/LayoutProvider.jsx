import React from 'react';

//assets
import { LayoutProdiverStyle } from './LayoutProdiver.style';

//components
import { Outlet } from 'react-router-dom';
import Header from './Header';

const LayoutProvider = () => {
    return (
        <>
            <Header/>
            <LayoutProdiverStyle>
                <div className='content'>
                    hi
                    <Outlet />
                </div>
            </LayoutProdiverStyle>
        </>
    );
};

export default LayoutProvider;
