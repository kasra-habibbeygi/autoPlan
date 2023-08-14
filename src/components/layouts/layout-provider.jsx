/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar } from '../../store/reducers/sideBar';
import { useEffect } from 'react';
import Axios from '../../configs/axios';
import { infoHandler } from '../../store/reducers/user';

//assets
import { LayoutProviderStyle } from './layout-provider.style';
import bg from '../../assets/images/global/bg.svg';

//components
import Navbar from './navbar';
import SideBar from './sidebar';

const LayoutProvider = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useDispatch();
    const isLaptop = useMediaQuery(theme.breakpoints.up('lg'));
    const sideBarStatus = useSelector(state => state.sideBar);
    const userRole = useSelector(state => state.User.info.role);

    useEffect(() => {
        if (localStorage.getItem('AutoPlaningToken') !== null) {
            Axios.get('user/profile/')
                .then(res => {
                    dispatch(infoHandler(res.data));
                })
                .catch(() => {});
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (userRole === 'SuperAdmin') {
            navigate('/addAdmin');
        }
    }, [userRole, location.pathname]);

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
