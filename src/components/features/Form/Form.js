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
  type,
  diameter,
  slicesOfPizza,
  spiciness,
  slicesOfBread,
}) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSubmit`, e);
  };
  // useEffect(() => {
  //   dispatch(actionName(`whatToDispatch`));
  // }, []);
  const renderTimePicker = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        ampm={false}
        openTo="hours"
        views={[`hours`, `minutes`, `seconds`]}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
        // label={value}
        // value={value}
        defaultValue="01:00:00"
        // onChange={(newValue) => {
        //   setValue(newValue);
        // }}
        renderInput={(params) => <TextField {...params} />} //eslint-disable-line
        {...input} //eslint-disable-line
      {...custom} //eslint-disable-line
      />
    </LocalizationProvider>
  );

  const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup
      row
      {...input}
      {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}
    />
  );

  const handleDishType = () => {
    if (type === `pizza`) {
      console.log(`noOfSlices`, slicesOfPizza);
      return (
        <div>
          <Typography>Slices: {slicesOfPizza}</Typography>
          <Field
            name="slicesOfPizza"
            component={Slider}
            className={styles.formSlider}
            defaultValue={slicesOfPizza}
            format={null}
            min={1}
            max={10}
            step="1"
          />
          <Typography>Diameter: {diameter} cm</Typography>
          <Field
            name="diameter"
            component={Slider}
            className={styles.formSlider}
            defaultValue={diameter}
            format={null}
            min={10}
            max={60}
            step="0.1"
          />
        </div>
      );
    }
    if (type === `soup`) {
      return (
        <div>
          <Typography>Spiciness: {spiciness}</Typography>
          <Field
            name="spiciness"
            component={Slider}
            className={styles.formSlider}
            defaultValue={spiciness}
            format={null}
            min={1}
            max={10}
            step="1"
          />
        </div>
      );
    }
    if (type === `sandwich`) {
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
      <Field name="type" component={RadioButtonGroup}>
        <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
        <FormControlLabel value="soup" control={<Radio />} label="Soup" />
        <FormControlLabel
          value="sandwich"
          control={<Radio />}
          label="Sandwich"
        />
      </Field>
      {handleDishType()}
      <Button variant="contained">Submit</Button>
      <main>{children}</main>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  diameter: PropTypes.number,
  slicesOfPizza: PropTypes.number,
  spiciness: PropTypes.number,
  slicesOfBread: PropTypes.number,
};

const selector = formValueSelector(`dish`);

Form = connect((state) => {
  const diameter = selector(state, `diameter`);
  const slicesOfPizza = selector(state, `slicesOfPizza`);
  const spiciness = selector(state, `spiciness`);
  const type = selector(state, `type`);
  const slicesOfBread = selector(state, `slicesOfBread`);

  return {
    type,
    slicesOfPizza,
    diameter,
    spiciness,
    slicesOfBread,
  };
})(Form);

export default reduxForm({
  form: `dish`,
})(Form);
