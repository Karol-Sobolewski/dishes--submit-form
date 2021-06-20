import React from 'react';
import { connect } from 'react-redux';

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
import { Field, reduxForm, formValueSelector } from 'redux-form';

import styles from './Form.module.scss';

let Form = ({
  children,
  dishType,
  pizzaDiameter,
  slicesOfBread,
  slicesOfPizza,
  soupSpiciness,
}) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSubmit`, e);
  };
  // useEffect(() => {
  //   dispatch(actionName(`whatToDispatch`));
  // }, []);

  // const renderTimePicker = ({
  //   input,
  //   label,
  //   meta: { touched, error },
  //   ...custom
  // }) => (
  //   <LocalizationProvider dateAdapter={AdapterDateFns}>
  //     <TimePicker
  //       ampm={false}
  //       openTo="hours"
  //       views={[`hours`, `minutes`, `seconds`]}
  //       inputFormat="HH:mm:ss"
  //       mask="__:__:__"
  //       defaultValue="01:00:00"
  //       renderInput={(params) => <TextField {...params} />}
  //       {...input}
  //       {...custom}
  //     />
  //   </LocalizationProvider>
  // );

  const handleDishType = () => {
    if (dishType === `pizza`) {
      return (
        <div>
          <Typography>Slices: {slicesOfPizza}</Typography>
          <Field
            name="slicesOfPizza"
            component={Slider}
            className={styles.formSlider}
            defaultValue={0}
            format={null}
            min={1}
            max={10}
            step="1"
          />
          <Typography>Diameter: {pizzaDiameter} cm</Typography>
          <Field
            name="pizzaDiameter"
            component={Slider}
            className={styles.formSlider}
            defaultValue={pizzaDiameter}
            format={null}
            min={10}
            max={60}
            step="0.1"
          />
        </div>
      );
    }
    if (dishType === `soup`) {
      return (
        <div>
          <Typography>Spiciness: {soupSpiciness}</Typography>
          <Field
            name="soupSpiciness"
            component={Slider}
            className={styles.formSlider}
            defaultValue={soupSpiciness}
            format={null}
            min={1}
            max={10}
            step="1"
          />
        </div>
      );
    }
    if (dishType === `sandwich`) {
      return (
        <div>
          <Typography>Slices: {slicesOfBread}</Typography>
          <Field
            name="slicesOfBread"
            component={Slider}
            className={styles.formSlider}
            defaultValue={slicesOfBread}
            format={null}
            min={1}
            max={10}
            step="1"
          />
        </div>
      );
    }
  };

  return (
    <form className={styles.root} onSubmit={(e) => handleSubmit(e)}>
      <h2>Form</h2>
      <Field
        name="name"
        component={TextField}
        hintText="Dish Name"
        floatingLabelText="Dish Name"
        className={styles.formInput}
        required
      />
      <Typography>Preparation Time:</Typography>
      <Field
        name="preparation_time"
        component="input"
        type="time"
        value="01:00:00"
        floatingLabelText="Dish Name"
        step="2"
        className={styles.formInput}
      />
      <Field name="dishType" component={RadioButtonGroup}>
        <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
        <FormControlLabel value="soup" control={<Radio />} label="Soup" />
        <FormControlLabel
          value="sandwich"
          control={<Radio />}
          label="Sandwich"
        />
      </Field>
      {handleDishType()}
      <Button>Submit</Button>
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
};

const selector = formValueSelector(`dish`);

Form = connect((state) => {
  const dishType = selector(state, `dishType`);
  const pizzaDiameter = selector(state, `pizzaDiameter`);
  const slicesOfBread = selector(state, `slicesOfBread`);
  const slicesOfPizza = selector(state, `slicesOfPizza`);
  const soupSpiciness = selector(state, `soupSpiciness`);

  return {
    dishType,
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
})(Form);
