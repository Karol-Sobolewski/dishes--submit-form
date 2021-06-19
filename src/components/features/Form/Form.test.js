import { React } from 'react';
import { shallow } from 'enzyme';
import Form from './Form';

describe(`Component Form`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<Form />);
    expect(component).toBeTruthy();
  });
});
