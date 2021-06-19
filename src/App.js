import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
// import { NotFound } from './components/views/NotFound/NotFound';
import './styles/bootstrap.scss';
import './styles/normalize.scss';
import styles from './App.module.scss';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      type: `dark`,
    },
  });
  return (
    <div className={styles.root}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainLayout>
            <Route exact path="/" component={() => <HomePage />} />
          </MainLayout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
