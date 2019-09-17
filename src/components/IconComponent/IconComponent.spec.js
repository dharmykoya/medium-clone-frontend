import React from 'react';
import { shallow } from 'enzyme';
import IconComponent from './index.jsx';

describe('Render component', () => {
  it('renders Icon component', () => {
    shallow(
      <IconComponent
        src={'./../src/assets/images/twitter-normal.svg'}
        alt={'image asset'}
        className={'icon-small'}
      />
    );
  });
});
