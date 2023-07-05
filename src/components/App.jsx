import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from '../configs/theme';

// Assets
import '../assets/styles/general.css';
import { Route, Routes } from 'react-router-dom';

//components
import LayoutProvider from './layouts/layout-provider';
import Qualification from '../pages/qualification/qualification';
import Deficiency from '../pages/deficiency/deficiency';
import Planning from '../pages/planning/planning';
import Deviation from '../pages/deviation/deviation';
import Corrective from '../pages/corrective/corrective';
import Accessibility from '../pages/accessibility/accessibility';
import Reporting from '../pages/reporting/reporting';
import Home from '../pages/home/home';
import Setting from '../pages/setting/setting';
import Landing from '../pages/landing/landing';

function App() {
    const themeConfig = createTheme(getDesignTokens('light'));

    return (
        <ThemeProvider theme={themeConfig}>
            <Routes>
                <Route path='/' element={<LayoutProvider />}>
                    <Route path='home' element={<Home />} />
                    <Route path='qualification' element={<Qualification />} />
                    <Route path='deficiency' element={<Deficiency />} />
                    <Route path='planning' element={<Planning />} />
                    <Route path='deviation' element={<Deviation />} />
                    <Route path='corrective' element={<Corrective />} />
                    <Route path='accessibility' element={<Accessibility />} />
                    <Route path='reporting' element={<Reporting />} />
                    <Route path='setting' element={<Setting />} />
                </Route>
                <Route path='/' element={<Landing />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
