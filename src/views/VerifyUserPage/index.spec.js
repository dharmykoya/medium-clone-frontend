import React from 'react';
import { shallow, mount } from 'enzyme';
import { VerifyUser } from './index.jsx';
import axios from 'axios';

// arrange
const renderedComponent = args => {
  const defaultProps = {
    location: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<VerifyUser {...props} />);
};

describe('Render component and passes', () => {
  it('should render component successfully', () => {
    renderedComponent();
  });

  it('should render component successfully if Icon-component is rendered', () => {
    const component = renderedComponent();
    expect(component.find('img').hasClass('img-fluid')).toBeTruthy();
  });

  it('calls `fetchArticles` when mounted', () => {
    const state = {
      successResponse: '',
      failureResponse: '',
      location: {}
    };
    const wrapper = shallow(<VerifyUser {...state} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'verifyUser');
    instance.componentDidMount();
    expect(instance.verifyUser).toHaveBeenCalled();
  });

  it('fetches response for user verification', done => {
    const state = {
      successResponse: '',
      failureResponse: '',
      location: {}
    };
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      response: () => mockJsonPromise({ data: {} })
    });
    jest.spyOn(axios, 'get').mockImplementation(() => mockFetchPromise);
    const wrapper = shallow(<VerifyUser {...state} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'verifyUser');
    instance.verifyUser('2342342jk34nj23kh32jk4j42342jnjkbj');

    expect(axios.get).toHaveBeenCalledTimes(2);

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        successResponse: '',
        failureResponse: ''
      });

      wrapper.instance().setState({ successResponse: mockFetchPromise });
      expect(wrapper.state()).toEqual({
        successResponse: mockFetchPromise,
        failureResponse: ''
      });

      axios.get.mockClear();
      done();
    });
  });
});
