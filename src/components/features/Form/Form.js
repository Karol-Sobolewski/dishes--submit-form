import React from 'react';
import { connect } from 'react-redux';

import { Slider } from 'redux-form-material-ui';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import styles from './Form.module.scss';

let Form = ({ children, diameter }) => {
  /* eslint-disable react/jsx-props-no-spreading */

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSubmit`, e);
  };
  // useEffect(() => {
  //   dispatch(actionName(`whatToDispatch`));
  // }, []);

  const renderTextField = ({ input, label, meta: { touched, error } }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      label={label}
      errorText={touched && error}
      variant="filled"
      value={input.value}
      {...input}
    />
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

  return (
    <form className={styles.root} onSubmit={(e) => handleSubmit(e)}>
      <h2>Form</h2>
      <Field
        name="name"
        component={renderTextField}
        label="Dish Name"
        className={styles.formInput}
      />
      <Field
        name="preparation_time"
        component="input"
        type="time"
        label="Time of preparation"
        placeholder="00:00:00"
        step="2"
        className={styles.formInput}
      />
      <Field name="type" component={renderRadioGroup}>
        <FormControlLabel value="pizza" control={<Radio />} label="Pizza" />
        <FormControlLabel value="soup" control={<Radio />} label="Soup" />
        <FormControlLabel
          value="sandwich"
          control={<Radio />}
          label="Sandwich"
        />
      </Field>
      <Typography id="discrete-slider" gutterBottom>
        Diameter
        {diameter}
      </Typography>
      <Field
        name="diameter"
        component={Slider}
        label="Diameter"
        className={styles.formSlider}
        defaultValue={30}
        format={null}
        min={10}
        max={60}
        step={1}
      />
      <Button variant="contained">Submit</Button>
      <main>{children}</main>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  diameter: PropTypes.number,
};

const selector = formValueSelector(`dish`);

Form = connect((state) => {
  const diameter = selector(state, `diameter`);
  return {
    diameter,
  };
})(Form);

export default reduxForm({
  form: `dish`,
})(Form);
