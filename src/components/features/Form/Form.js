import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { TextField } from '@material-ui/core';
import { TimePicker } from '@material-ui/lab';

import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import styles from './Form.module.scss';

// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Form = ({ children }) => {
  console.log(`Form`);
  // const dispatch = useDispatch();
  const preparationMask = createTextMask({
    pattern: `[a-z]{1,15}`,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`handleSubmit`, e);
  };
  /* eslint-disable react/jsx-props-no-spreading */

  const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      variant="filled"
      placeholder={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  const renderTimePicker = ({
    input,
    placeholder,
    step,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      openTo="seconds"
      type="time"
      views={[`hours`, `minutes`, `seconds`]}
      inputFormat="HH:mm:ss"
      label={label}
      renderInput={(params) => <TextField {...params} />}
    />
  );

  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
  }, []);
  return (
    <form className={styles.root} onSubmit={(e) => handleSubmit(e)}>
      <h2>Form</h2>
      {/* <Field
        name="name"
        component="input"
        type="text"
        placeholder="Dish Name"
      /> */}
      <Field name="name" component={renderTextField} label="Dish Name" />
      <Field
        name="preparation_time"
        component={renderTimePicker}
        label="Preparation Time"
        placeholder="00:00:00"
        step="2"
      />
      {/*
      <Field
        name="preparation_time"
        component="input"
        type="time"
        step="2"
        placeholder="00:00:00"
      /> */}
      <main>{children}</main>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
};

export default reduxForm({
  form: `dish`, // a unique identifier for this form
})(Form);
