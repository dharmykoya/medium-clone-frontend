import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount } from 'enzyme';

import ReportArticle from './index.jsx';

describe('Report article form ', () => {
  const handleClose = jest.fn();
  const reportArticleRequest = jest.fn();
  const renderReportArticle = () => {
    const props = {
      lightTheme: false,
      slug: 'somerandomslug',
      token: 'somerandomtoken',
      handleClose,
      reportArticleRequest
    };
    return mount(
      <BrowserRouter>
        <ReportArticle {...props} />
      </BrowserRouter>
    );
  };

  it('should render report article successfully', () => {
    const event = { target: { name: 'report', value: 'spam' } };

    const wrapper = renderReportArticle();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('textarea').simulate('change', event)).toBeTruthy();
  });

  it('should trigger handle close function', () => {
    const event = { target: { name: 'report', value: 'spam' } };

    const wrapper = renderReportArticle();

    expect(wrapper.find('Link').simulate('click', event)).toBeTruthy();
    expect(handleClose).toHaveBeenCalled();
  });

  it('should trigger handle close function', () => {
    const event = { target: { name: 'report', value: 'spam' } };

    const wrapper = renderReportArticle();

    expect(wrapper.find('button').simulate('click', event)).toBeTruthy();
  });

  it('should trigger onsubmit function', () => {
    const wrapper = renderReportArticle();

    expect(wrapper.find('button').simulate('submit')).toBeTruthy();
  });
});
