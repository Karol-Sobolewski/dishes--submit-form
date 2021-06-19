import { React } from 'react';
import { shallow } from 'enzyme';
import { HomePageComponent } from './HomePage';

describe(`Component HomePage`, () => {
  it(`should render without crashing`, () => {
    const component = shallow(<HomePageComponent />);
    expect(component).toBeTruthy();
  });
});
