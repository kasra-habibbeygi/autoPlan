import { ThemeProvider, createTheme } from '@mui/material';
import { getDesignTokens } from '../configs/theme';

// Assets
import '../assets/styles/general.css';


function App() {
  const themeConfig = createTheme(getDesignTokens('light'));

  return (
    <ThemeProvider theme={themeConfig}>

    </ThemeProvider>
  );
}

export default App;
