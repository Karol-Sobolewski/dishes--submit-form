import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { Slider, TextField, RadioButtonGroup } from 'redux-form-material-ui';
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { TimePicker } from '@material-ui/lab';

import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
  formValueSelector,
  destroy,
  reset,
  formValues,
  getFormValues,
} from 'redux-form';

import formatDistanceStrictWithOptions from 'date-fns/fp/formatDistanceStrictWithOptions';
import styles from './Form.module.scss';
import DishType from './DishType';

const uniqid = require(`uniqid`);

const validate = (values) => {
  // console.log(`values`, values);
  const errors = {};
  if (
    !values.dishName ||
    !values.dishType ||
    !values.preparationTime ||
    !values.dishType
  ) {
    errors.name = `Requied`;
    // console.log(`errors`);
  }
  return errors;
};

let Form = ({
  children,
  dishType,
  pizzaDiameter,
  slicesOfBread,
  slicesOfPizza,
  soupSpiciness,
  dishName,
  preparationTime,
}) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const [dishValues, setDishValues] = useState(``);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formValues(`dish`)(Form);
    console.log(
      `dishType`,
      dishType,
      pizzaDiameter,
      slicesOfBread,
      slicesOfPizza,
      soupSpiciness,
      dishName,
      preparationTime
    );
  };

  const handleChange = (type) => {
    console.log(`type`, type);
    if (type === `pizza`) {
      setDishValues({
        data: [
          {
            defaultValue: 30,
            label: `Diameter of pizza (in cm):`,
            max: 60,
            min: 10,
            name: `pizzaDiameter`,
            step: 0.1,
            type: `pizza`,
            value: pizzaDiameter,
          },
          {
            defaultValue: 1,
            label: `Slices of pizza:`,
            max: 10,
            min: 0,
            name: `slicesOfPizza`,
            step: 1,
            type: `pizza`,
            value: slicesOfPizza,
          },
        ],
      });
    }
    if (type === `soup`) {
      setDishValues({
        data: [
          {
            defaultValue: 1,
            label: `Spiciness:`,
            max: 10,
            min: 0,
            name: `soupSpiciness`,
            step: 1,
            type: `soup`,
            value: soupSpiciness,
          },
        ],
      });
    }
    if (type === `sandwich`) {
      setDishValues({
        data: [
          {
            defaultValue: 1,
            label: `Slices of bread:`,
            max: 10,
            min: 0,
            name: `slicesOfBread`,
            step: 1,
            type: `sandwich`,
            value: slicesOfBread,
          },
        ],
      });
    }
  };
  return (
    <form className={styles.root} onSubmit={(e) => handleSubmit(e)}>
      <h2>Form</h2>
      <Field
        name="dishName"
        component={TextField}
        hintText="Dish Name"
        floatingLabelText="Dish Name"
        className={styles.formInput}
        required
      />
      <Typography>Preparation Time:</Typography>
      <Field
        name="preparationTime"
        component="input"
        type="time"
        value="01:00:00"
        floatingLabelText="Dish Name"
        step="2"
        className={styles.formInput}
        required
      />
      <Field
        name="dishType"
        component={RadioButtonGroup}
        onChange={(e) => handleChange(e.target.value)}
        required
      >
        <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
        <FormControlLabel value="soup" control={<Radio />} label="Soup" />
        <FormControlLabel
          value="sandwich"
          control={<Radio />}
          label="Sandwich"
        />
      </Field>
      <DishType
        dishValues={dishValues}
        dishType={dishType}
        // onChange={() => handleChange(dishType)}
      />
      <Button type="submit">Submit</Button>
      <main>{children}</main>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  dishType: PropTypes.string,
  pizzaDiameter: PropTypes.number,
  slicesOfBread: PropTypes.number,
  slicesOfPizza: PropTypes.number,
  soupSpiciness: PropTypes.number,
  dishName: PropTypes.string,
  preparationTime: PropTypes.string,
};

const selector = formValueSelector(`dish`);

Form = connect((state) => {
  const {
    dishType,
    dishName,
    pizzaDiameter,
    slicesOfBread,
    slicesOfPizza,
    soupSpiciness,
    preparationTime,
  } = selector(
    state,
    `dishType`,
    `dishName`,
    `pizzaDiameter`,
    `slicesOfBread`,
    `slicesOfPizza`,
    `soupSpiciness`,
    `preparationTime`
  );
  // const pizzaDiameter = selector(state, `pizzaDiameter`);
  // const slicesOfBread = selector(state, `slicesOfBread`);
  // const slicesOfPizza = selector(state, `slicesOfPizza`);
  // const soupSpiciness = selector(state, `soupSpiciness`);
  return {
    dishType,
    dishName,
    preparationTime,
    pizzaDiameter,
    slicesOfBread,
    slicesOfPizza,
    soupSpiciness,
  };
  // initialValues: state.dishes.data[0],
})(Form);

export default reduxForm({
  form: `dish`,
  validate,
  initialValues: {
    pizzaDiameter: 30,
    slicesOfBread: 1,
    slicesOfPizza: 1,
    soupSpiciness: 1,
  },
  enableReinitialize: true,
})(Form);
