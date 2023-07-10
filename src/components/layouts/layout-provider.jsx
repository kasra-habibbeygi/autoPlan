import React from 'react';
import { Outlet } from 'react-router-dom';

//assets
import { LayoutProviderStyle } from './layout-provider.style';
import bg from '../../assets/images/global/bg.svg';

//components
import Navbar from './navbar';
import SideBar from './Sidebar';

const LayoutProvider = () => {
    return (
        <>
            <Navbar />
            <LayoutProviderStyle bg={bg}>
                <SideBar />
                <div className='content'>
                    <Outlet />
                </div>
            </LayoutProviderStyle>
        </>
    );
};

export default LayoutProvider;
