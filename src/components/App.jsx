/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getDesignTokens } from '../configs/theme';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { loginStatusHandler } from '../store/reducers/user';

// Assets
import '../assets/styles/general.css';

// MUI
import { ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';

// Tools
import PERMISSION from '../utils/permission.ts';

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
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.User);

    if (localStorage.getItem('AutoPlaningToken') !== null) {
        dispatch(loginStatusHandler(true));
    }

    if (userInfo.isLoggedIn) {
        if (location.pathname !== '/addAdmin' && userInfo.info.role === 'SuperAdmin') {
            return <Navigate to='/addAdmin' replace state={{ path: location.pathname }} />;
        }

        if (userInfo.info.role === 'Worker') {
            const userPermissions = JSON.parse(localStorage.getItem('AutoPlanUserInfo')).permissions;
            const matchingObjects = [];

            for (const key in PERMISSION) {
                if (typeof PERMISSION[key] === 'object') {
                    for (const subKey in PERMISSION[key]) {
                        if (typeof PERMISSION[key][subKey] === 'number' && userPermissions.includes(PERMISSION[key][subKey])) {
                            matchingObjects.push(PERMISSION[key].URL);
                            break;
                        }
                    }
                }
            }

            if (!matchingObjects.includes(location.pathname)) {
                return <Navigate to={matchingObjects[0]} replace state={{ path: location.pathname }} />;
            }
        }
    }
    return <LayoutProvider>{children}</LayoutProvider>;
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
