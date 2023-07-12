import React from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar } from '../../store/reducers/sideBar';

//assets
import { LayoutProviderStyle } from './layout-provider.style';
import bg from '../../assets/images/global/bg.svg';

//components
import Navbar from './navbar';
import SideBar from './sidebar';

const LayoutProvider = () => {
    const theme = useTheme();
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'));

    const sideBarStatus = useSelector(state => state.sideBar);
    const dispatch = useDispatch();

    return (
        <>
            <Navbar />
            <LayoutProviderStyle bg={bg}>
                {isLaptop && <SideBar />}
                <div className='content'>
                    <Outlet />
                </div>
                <Drawer anchor='right' open={sideBarStatus} onClose={() => dispatch(closeSideBar())}>
                    <SideBar />
                </Drawer>
            </LayoutProviderStyle>
        </>
    );
};

export default LayoutProvider;
