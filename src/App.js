import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';

// import { NotFound } from './components/views/NotFound/NotFound';
import './styles/bootstrap.scss';
import './styles/normalize.scss';
import styles from './App.module.scss';

const App = () => {
  const theme = getMuiTheme(darkBaseTheme);
  return (
    <MuiThemeProvider muiTheme={theme}>
      <CssBaseline />
      <div className={styles.root}>
        <BrowserRouter>
          <MainLayout>
            <Route exact path="/" component={() => <HomePage />} />
          </MainLayout>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
};
export default App;
