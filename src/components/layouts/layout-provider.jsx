import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';

//assets
import { LayoutProviderStyle } from './layout-provider.style';
import bg from '../../assets/images/global/bg.svg';

//components
import Navbar from './navbar';
import SideBar from './sidebar';

const LayoutProvider = () => {
    const [showSideBar, setShowSideBar] = useState(false);

    const theme = useTheme();
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <>
            <Navbar />
            <LayoutProviderStyle bg={bg}>
                {isLaptop && <SideBar />}
                <div className='content'>
                    <Outlet />
                </div>
                <Drawer anchor='right' open={showSideBar} onClose={() => setShowSideBar(false)}>
                    <SideBar />
                </Drawer>
            </LayoutProviderStyle>
        </>
    );
};

export default LayoutProvider;
