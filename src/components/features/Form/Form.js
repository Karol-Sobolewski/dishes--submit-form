import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';
import { Button, Radio, FormControlLabel, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import {
  Field,
  reduxForm,
  formValueSelector,
  destroy,
  reset,
} from 'redux-form';

import styles from './Form.module.scss';
import DishType from './DishType';
import { addDishRequest } from '../../../redux/dishRedux';

const uniqid = require(`uniqid`);

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
  const [dish, setDish] = useState(``);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dishType === `pizza`) {
      setDish({
        name: dishName,
        no_of_slices: slicesOfPizza,
        diameter: pizzaDiameter,
        preparation_time: preparationTime,
        type: dishType,
        id: uniqid(),
      });
      const formData = new FormData();
      for (const key of [
        `name`,
        `no_of_slices`,
        `diameter`,
        `preparation_time`,
        `type`,
        `id`,
      ]) {
        formData.append(key, dish[key]);
      }
      await dispatch(addDishRequest(formData));
      dispatch(reset(`dish`));
      dispatch(destroy(`dish`));
      setDishValues(``);
    }
    if (dishType === `soup`) {
      setDish({
        name: dishName,
        spiciness_scale: soupSpiciness,
        preparation_time: preparationTime,
        type: dishType,
        id: uniqid(),
      });
      const formData = new FormData();
      for (const key of [
        `name`,
        `spiciness_scale`,
        `preparation_time`,
        `type`,
        `id`,
      ]) {
        formData.append(key, dish[key]);
      }
      await dispatch(addDishRequest(formData));
      dispatch(reset(`dish`));
      dispatch(destroy(`dish`));
      setDishValues(``);
    }
    if (dishType === `sandwich`) {
      setDish({
        name: dishName,
        slices_of_bread: slicesOfBread,
        preparation_time: preparationTime,
        type: dishType,
        id: uniqid(),
      });
      const formData = new FormData();
      for (const key of [
        `name`,
        `spiciness_scale`,
        `slices_of_bread`,
        `type`,
        `id`,
      ]) {
        formData.append(key, dish[key]);
      }
      await dispatch(addDishRequest(formData));
      dispatch(reset(`dish`));
      dispatch(destroy(`dish`));
      setDishValues(``);
    }
  };

  const handleChange = (type) => {
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
        onChange={() => handleChange(dishType)}
      />
      <Button type="submit" variant="outlined" color="primary">
        Submit
      </Button>
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
  return {
    dishType,
    dishName,
    preparationTime,
    pizzaDiameter,
    slicesOfBread,
    slicesOfPizza,
    soupSpiciness,
  };
})(Form);

export default reduxForm({
  form: `dish`,
  initialValues: {
    pizzaDiameter: 30,
    slicesOfBread: 1,
    slicesOfPizza: 1,
    soupSpiciness: 1,
  },
  enableReinitialize: true,
})(Form);
