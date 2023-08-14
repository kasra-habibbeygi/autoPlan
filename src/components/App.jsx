/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';
import { getDesignTokens } from '../configs/theme';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { infoHandler, loginStatusHandler } from '../store/reducers/user';
import Axios from '../configs/axios';

// Assets
import '../assets/styles/general.css';

//components
import LayoutProvider from './layouts/layout-provider';
import Qualification from '../pages/qualification/qualification';
import Deficiency from '../pages/deficiency/deficiency';
import Planning from '../pages/planning/planning';
import Deviation from '../pages/deviation/deviation';
import Corrective from '../pages/corrective/corrective';
import Accessibility from '../pages/accessibility/accessibility';
import Reporting from '../pages/reporting/reporting';
import Dashboard from '../pages/dashboard/dashboard';
import Setting from '../pages/setting/setting';
import Landing from '../pages/landing/landing';
import store from '../store/store';
import Modal from './template/modal';
import MobileAlertModal from './template/mobile-alert-modal';
import Station from '../pages/station/station';
import AddAdmin from '../pages/add-admin/add-admin';
import Equipment from '../pages/equipment/equipment';

const AuthenticationGuard = ({ children }) => {
    var template = [];
    const location = useLocation();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.User);

    if (localStorage.getItem('AutoPlaningToken') !== null) {
        dispatch(loginStatusHandler(true));
    }

    if (userInfo.isLoggedIn) {
        if (location.pathname !== '/dashboard' && userInfo.info.role === 'Admin') {
            template.push(<Navigate to='/dashboard' replace state={{ path: location.pathname }} />);
        } else if (location.pathname !== '/addAdmin' && userInfo.info.role === 'SuperAdmin') {
            template.push(<Navigate to='/addAdmin' replace state={{ path: location.pathname }} />);
        } else if (location.pathname !== '/dashboard' && userInfo.info.role === 'Worker') {
            template.push(<Navigate to='/addAdmin' replace state={{ path: location.pathname }} />);
        } else {
            template.push(<LayoutProvider>{children}</LayoutProvider>);
        }
    }
    return template;
};

function App() {
    const themeConfig = createTheme(getDesignTokens('light'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(450));

    return (
        <Provider store={store}>
            <Toaster
                position='bottom-left'
                containerStyle={{
                    zIndex: 9999,
                    fontWeight: '400',
                    fontSize: '1rem'
                }}
            />
            <ThemeProvider theme={themeConfig}>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/' element={<AuthenticationGuard />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='qualification' element={<Qualification />} />
                        <Route path='station' element={<Station />} />
                        <Route path='deficiency' element={<Deficiency />} />
                        <Route path='planning' element={<Planning />} />
                        <Route path='deviation' element={<Deviation />} />
                        <Route path='equipment' element={<Equipment />} />
                        <Route path='corrective' element={<Corrective />} />
                        <Route path='accessibility' element={<Accessibility />} />
                        <Route path='reporting' element={<Reporting />} />
                        <Route path='setting' element={<Setting />} />
                        <Route path='addAdmin' element={<AddAdmin />} />
                    </Route>
                </Routes>
            </ThemeProvider>

            <Modal state={isMobile} fullScreen={true}>
                <MobileAlertModal />
            </Modal>
        </Provider>
    );
}

export default App;
// Admin
// Worker
// SuperAdmin
