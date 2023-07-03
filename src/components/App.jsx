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

function App() {
    const themeConfig = createTheme(getDesignTokens('light'));

    return (
        <ThemeProvider theme={themeConfig}>
            <Routes>
                <Route path='/' element={<LayoutProvider />}>
                    <Route path='qualification' element={<Qualification />} />
                    <Route path='deficiency' element={<Deficiency />} />
                    <Route path='planning' element={<Planning />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
