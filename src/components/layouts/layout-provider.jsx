import React from 'react';

//assets
import { LayoutProviderStyle } from './layout-provider.style';

//components
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import SideBar from './Sidebar';

const LayoutProvider = () => {
    return (
        <>
            <Navbar />
            <LayoutProviderStyle>
                <SideBar />
                <div className='content'>
                    <Outlet />
                </div>
            </LayoutProviderStyle>
        </>
    );
};

export default LayoutProvider;
