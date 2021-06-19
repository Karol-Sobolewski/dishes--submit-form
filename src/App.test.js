import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe(`Component APP`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<App />);
    expect(component).toBeTruthy();
  });
});
