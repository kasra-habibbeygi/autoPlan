import React from 'react';
import { ThemeProvider, createTheme, useMediaQuery, useTheme } from '@mui/material';
import { getDesignTokens } from '../configs/theme';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Assets
import '../assets/styles/general.css';
import 'react-toastify/dist/ReactToastify.css';

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

function App() {
    const themeConfig = createTheme(getDesignTokens('light'));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(450));

    return (
        <Provider store={store}>
            <ThemeProvider theme={themeConfig}>
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/' element={<LayoutProvider />}>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='qualification' element={<Qualification />} />
                        <Route path='station' element={<Station />} />
                        <Route path='deficiency' element={<Deficiency />} />
                        <Route path='planning' element={<Planning />} />
                        <Route path='deviation' element={<Deviation />} />
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

            <ToastContainer />
        </Provider>
    );
}

export default App;
