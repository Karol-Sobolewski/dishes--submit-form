import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
// import { NotFound } from './components/views/NotFound/NotFound';
import './styles/bootstrap.scss';
import './styles/normalize.scss';
// import styles from './App.module.scss';

const App = () => {
  console.log(`hey`);
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <Route exact path="/" component={() => <HomePage />} />
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
