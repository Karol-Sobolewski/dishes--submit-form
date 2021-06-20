import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
// import { NotFound } from './components/views/NotFound/NotFound';
import './styles/bootstrap.scss';
import './styles/normalize.scss';
import styles from './App.module.scss';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: `#fff`,
      },
      secondary: {
        main: `rgba(255, 255, 255, 0.7)`,
      },
      type: `dark`,
    },
  });
  return (
    <div className={styles.root}>
      <MuiThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <BrowserRouter>
          <MainLayout>
            <Route exact path="/" component={() => <HomePage />} />
          </MainLayout>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
};
export default App;
