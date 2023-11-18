import { createTheme, ThemeProvider } from '@mui/material/styles';
import { JobsListScreen } from './components/screens/JobsListScreen';
import themeConfig from './theme';

const theme = createTheme(themeConfig);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <JobsListScreen />
    </ThemeProvider>
  )
}

export default App
