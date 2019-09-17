import React from 'react';
import { shallow } from 'enzyme';
import FollowersTablist from './index.jsx';

describe('Render light component TablistContainer', () => {
  it('should render light theme container', () => {
    const props = {
      lightTheme: false,
      isFollowing: true,
      email: 'damilola.adekoya@andela.com',
      name: 'Damilola Adekoya'
    };

    shallow(<FollowersTablist {...props} />);
  });

  it('should render dark theme container', () => {
    const props = {
      lightTheme: true,
      isFollowing: false,
      email: 'damilola.adekoya@andela.com',
      name: 'Damilola Adekoya'
    };
    shallow(<FollowersTablist {...props} />);
  });
});
