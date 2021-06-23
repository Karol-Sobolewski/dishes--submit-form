import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../features/Form/Form';
import styles from './HomePage.module.scss';

const Component = ({ children }) => (
  <div className={styles.root}>
    <Form />
    <main>{children}</main>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
};

export { Component as HomePage, Component as HomePageComponent };
