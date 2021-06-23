import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'react-bootstrap';
import { Header } from '../Header/Header';

import styles from './MainLayout.module.scss';

const Component = ({ children }) => (
  <div className={styles.root}>
    <Container className={styles.pageContainer}>
      <Header />
      {children}
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
};

export { Component as MainLayout, Component as MainLayoutComponent };
