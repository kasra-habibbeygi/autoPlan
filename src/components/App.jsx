import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from '../configs/theme';

// Assets
import '../assets/styles/general.css';
import { Route, Routes } from 'react-router-dom';

//components
import LayoutProvider from './layouts/layout-provider';

function App() {
    const themeConfig = createTheme(getDesignTokens('light'));

    return (
        <ThemeProvider theme={themeConfig}>
            <Routes>
                <Route path='/' element={<LayoutProvider />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
