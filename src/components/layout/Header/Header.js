import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row } from 'react-bootstrap';
import styles from './Header.module.scss';

const Component = ({ children }) => (
  <div className={styles.root}>
    <Container>
      <Row>
        <h1>Dishes Form</h1>
      </Row>
      <main>{children}</main>
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
};

export { Component as Header, Component as HeaderComponent };
