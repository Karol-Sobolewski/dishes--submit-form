import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
import { Slider } from 'redux-form-material-ui';
import { Field, reduxForm } from 'redux-form';
import styles from './DishType.module.scss';

const DishType = ({ children, dishValues }) =>
  dishValues.data ? (
    <div className={styles.root}>
      <Container>
        <Row>
          {dishValues.data.map((dishValue, i) => (
            <div className={styles.sliderSection} key={i}>
              <Typography>
                {dishValue.label} {dishValue.value}
              </Typography>
              <Field
                name={dishValue.name}
                component={Slider}
                className={styles.formSlider}
                defaultValue={dishValue.defaultValue}
                format={null}
                min={dishValue.min}
                max={dishValue.max}
                step={dishValue.step}
              />
            </div>
          ))}
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  ) : null;

DishType.propTypes = {
  children: PropTypes.node,
  dishValues: PropTypes.object,
};

export default reduxForm({
  form: `dish`,
})(DishType);
