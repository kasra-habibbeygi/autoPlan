import React from 'react';
import { Outlet } from 'react-router-dom';

//assets
import { LayoutProviderStyle } from './layout-provider.style';

//components
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
