import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import { Container, Row, Col } from 'react-bootstrap';
import { Slider } from 'redux-form-material-ui';
import {
  Field,
  reduxForm,
  formValueSelector,
  reset,
  formValues,
} from 'redux-form';
import styles from './DishType.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// const [initialData, setInitialData] = useState({
//   pizzaDiameter: 30,
//   slicesOfBread: 1,
//   slicesOfPizza: 1,
//   soupSpiciness: 1,
// });

// let initialData = {
//   // pizzaDiameter: 30,
//   // slicesOfBread: 1,
//   // slicesOfPizza: 1,
//   // soupSpiciness: 1,
// };

// const ItemList = formValues(`withVat`)(MyItemizedList);

const DishType = ({ children, dishValues }) =>
  dishValues.data ? (
    <div className={styles.root}>
      <Container>
        <Row>
          {dishValues.data.map((dishValue) => (
            <>
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
            </>
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
